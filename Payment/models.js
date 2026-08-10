/**
 * Beacon Payment Verification — Mongoose Schemas
 * All monetary/state collections are append-only where noted.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* ------------------------------------------------------------------ */
/* PlannerPaymentAccount — one per planner, gates booking eligibility  */
/* ------------------------------------------------------------------ */
const PlannerPaymentAccountSchema = new Schema({
  plannerId: { type: Schema.Types.ObjectId, ref: 'Planner', required: true, unique: true },
  phonepeMerchantId: { type: String, required: true },
  phonepeSaltKeyEncrypted: { type: String, required: true }, // AES-256, KMS key ref
  saltIndex: { type: String, required: true },
  kycStatus: { type: String, enum: ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  activationStatus: { type: String, enum: ['INACTIVE', 'ACTIVE', 'SUSPENDED'], default: 'INACTIVE' },
  webhookAuthUsername: { type: String, required: true },
  webhookAuthPasswordEncrypted: { type: String, required: true },
  activatedAt: Date,
  suspendedReason: String,
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */
const BookingSchema = new Schema({
  bookingCode: { type: String, required: true, unique: true, index: true }, // human-readable, used as merchantOrderId
  travellerId: { type: Schema.Types.ObjectId, ref: 'Traveller', required: true },
  plannerId: { type: Schema.Types.ObjectId, ref: 'Planner', required: true },
  packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  lockedAmount: { type: Number, required: true }, // in paise, avoid float
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['DRAFT', 'AWAITING_PAYMENT', 'VERIFYING', 'VERIFIED', 'FAILED', 'EXPIRED', 'MANUAL_REVIEW', 'REJECTED'],
    default: 'DRAFT',
    index: true,
  },
  paymentWindowMinutes: { type: Number, default: 30 },
  expiresAt: Date,
  phonepeOrderId: String, // returned from Create-Order call
  deviceFingerprint: String,
  ipAddress: String,
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/* Payment — one row per webhook/attempt, immutable once VERIFIED      */
/* ------------------------------------------------------------------ */
const PaymentSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  transactionId: { type: String, required: true, unique: true, index: true }, // PhonePe txn id / UTR
  amountReceived: { type: Number, required: true },
  verificationSource: {
    type: String,
    enum: ['phonepe_webhook', 'manual_utr', 'sms_auto', 'email_forward', 'aa_feed'],
    required: true,
  },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED', 'FLAGGED'], default: 'PENDING' },
  fraudScore: { type: Number, default: 0 },
  fraudFlags: [{ type: String }],
  rawWebhookPayload: Schema.Types.Mixed, // store full payload for audit/debug
  receivedAt: { type: Date, default: Date.now },
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/* VerificationLog — append-only, one row per check run                */
/* ------------------------------------------------------------------ */
const VerificationLogSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
  checkName: { type: String, required: true }, // e.g. 'AMOUNT_MATCH', 'DUPLICATE_TXN'
  passed: { type: Boolean, required: true },
  detail: String,
  runAt: { type: Date, default: Date.now },
});

/* ------------------------------------------------------------------ */
/* FraudFlag                                                           */
/* ------------------------------------------------------------------ */
const FraudFlagSchema = new Schema({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  flagType: { type: String, required: true },
  scoreContribution: { type: Number, required: true },
  resolved: { type: Boolean, default: false },
  resolvedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  resolvedAt: Date,
}, { timestamps: true });

/* ------------------------------------------------------------------ */
/* AuditLog — append-only, every state transition                     */
/* ------------------------------------------------------------------ */
const AuditLogSchema = new Schema({
  entityType: { type: String, required: true }, // 'Booking' | 'Payment' | 'PlannerPaymentAccount'
  entityId: { type: Schema.Types.ObjectId, required: true, index: true },
  actorType: { type: String, enum: ['SYSTEM', 'ADMIN', 'WEBHOOK'], required: true },
  actorId: Schema.Types.ObjectId,
  action: { type: String, required: true },
  before: Schema.Types.Mixed,
  after: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

/* ------------------------------------------------------------------ */
/* AdminAction — admin decisions on MANUAL_REVIEW cases                */
/* ------------------------------------------------------------------ */
const AdminActionSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  action: { type: String, enum: ['APPROVE', 'REJECT', 'REQUEST_INFO'], required: true },
  reason: { type: String, required: true },
}, { timestamps: true });

module.exports = {
  PlannerPaymentAccount: mongoose.model('PlannerPaymentAccount', PlannerPaymentAccountSchema),
  Booking: mongoose.model('Booking', BookingSchema),
  Payment: mongoose.model('Payment', PaymentSchema),
  VerificationLog: mongoose.model('VerificationLog', VerificationLogSchema),
  FraudFlag: mongoose.model('FraudFlag', FraudFlagSchema),
  AuditLog: mongoose.model('AuditLog', AuditLogSchema),
  AdminAction: mongoose.model('AdminAction', AdminActionSchema),
};
