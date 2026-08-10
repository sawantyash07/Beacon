/**
 * PhonePe Webhook Receiver + Verification Engine
 * POST /api/webhooks/phonepe
 *
 * Flow: signature check -> idempotency -> 7 deterministic checks -> fraud score
 *       -> state transition -> audit log -> notifications
 */
const {
  Booking, Payment, VerificationLog, FraudFlag,
  AuditLog, PlannerPaymentAccount,
} = require('./models');
const { verifyBasicAuth } = require('./services/security');
const { computeFraudScore } = require('./services/fraudScoring');
const { notify } = require('./services/notifications');

async function handlePhonePeWebhook(req, res) {
  // Always ack fast; PhonePe retries up to 24h if we don't 200 quickly.
  const payload = req.body;

  try {
    // --- Check 1: signature / auth ---------------------------------
    const authHeader = req.headers['authorization'];
    const plannerAccount = await PlannerPaymentAccount.findOne({
      phonepeMerchantId: payload?.payload?.merchantId,
    });
    if (!plannerAccount || !verifyBasicAuth(authHeader, plannerAccount)) {
      await AuditLog.create({
        entityType: 'Payment', entityId: null, actorType: 'WEBHOOK',
        action: 'WEBHOOK_AUTH_FAILED', after: { headers: req.headers },
      });
      return res.status(200).send(); // ack anyway, don't leak info, don't retry-loop them
    }

    if (payload.event !== 'checkout.order.completed') {
      return res.status(200).send(); // ignore failed/refund events here
    }

    const { merchantOrderId, amount, paymentDetails } = payload.payload;
    const transactionId = paymentDetails?.[0]?.transactionId;

    // --- Check 2: booking exists -------------------------------------
    const booking = await Booking.findOne({ bookingCode: merchantOrderId });
    if (!booking) {
      await AuditLog.create({
        entityType: 'Payment', entityId: null, actorType: 'WEBHOOK',
        action: 'ORPHAN_PAYMENT', after: payload,
      });
      // TODO: alert admin — money received for unknown booking
      return res.status(200).send();
    }

    // --- Check 3: idempotency -----------------------------------------
    if (booking.status === 'VERIFIED') {
      return res.status(200).send(); // already handled, PhonePe retry
    }

    booking.status = 'VERIFYING';
    await booking.save();

    const flags = [];
    const log = async (checkName, passed, detail) =>
      VerificationLog.create({ bookingId: booking._id, checkName, passed, detail });

    // --- Check 4: duplicate transactionId -----------------------------
    const existingTxn = await Payment.findOne({ transactionId });
    const duplicateTxn = !!existingTxn;
    await log('DUPLICATE_TXN', !duplicateTxn, duplicateTxn ? `Already used by booking ${existingTxn.bookingId}` : 'unique');
    if (duplicateTxn) flags.push('DUPLICATE_TXN');

    // --- Check 5: amount match ------------------------------------------
    const amountMatches = amount === booking.lockedAmount;
    await log('AMOUNT_MATCH', amountMatches, `expected=${booking.lockedAmount} got=${amount}`);
    if (!amountMatches) flags.push('AMOUNT_MISMATCH');

    // --- Check 6: within payment window ---------------------------------
    const onTime = !booking.expiresAt || new Date() <= booking.expiresAt;
    await log('WITHIN_WINDOW', onTime, `expiresAt=${booking.expiresAt}`);
    if (!onTime) flags.push('LATE_PAYMENT');

    // --- Check 7: planner account active --------------------------------
    const plannerActive = plannerAccount.activationStatus === 'ACTIVE';
    await log('PLANNER_ACTIVE', plannerActive, plannerAccount.activationStatus);
    if (!plannerActive) flags.push('PLANNER_INACTIVE'); // should never happen — hard alert

    // --- Fraud scoring (informational, can force MANUAL_REVIEW) --------
    const { score, contributions } = await computeFraudScore(booking, { amount, transactionId, flags });
    for (const c of contributions) {
      await FraudFlag.create({ bookingId: booking._id, flagType: c.type, scoreContribution: c.points });
    }

    const payment = await Payment.create({
      bookingId: booking._id,
      transactionId,
      amountReceived: amount,
      verificationSource: 'phonepe_webhook',
      status: flags.length === 0 && score < 50 ? 'VERIFIED' : 'FLAGGED',
      fraudScore: score,
      fraudFlags: flags,
      rawWebhookPayload: payload,
    });

    const before = booking.status;
    if (flags.length === 0 && score < 50) {
      booking.status = 'VERIFIED';
      await notify('traveller', booking.travellerId, 'PAYMENT_VERIFIED', { booking });
      await notify('planner', booking.plannerId, 'BOOKING_CONFIRMED', { booking });
    } else {
      booking.status = 'MANUAL_REVIEW';
      await notify('admin', null, 'MANUAL_REVIEW_NEEDED', { booking, flags, score });
    }
    await booking.save();

    await AuditLog.create({
      entityType: 'Booking', entityId: booking._id, actorType: 'WEBHOOK',
      action: 'STATE_TRANSITION', before: { status: before }, after: { status: booking.status },
    });

    return res.status(200).send();
  } catch (err) {
    // Never let PhonePe see a 5xx storm — log and ack, reconcile via background job
    await AuditLog.create({
      entityType: 'Payment', entityId: null, actorType: 'WEBHOOK',
      action: 'WEBHOOK_PROCESSING_ERROR', after: { error: err.message, payload },
    });
    return res.status(200).send();
  }
}

module.exports = { handlePhonePeWebhook };
