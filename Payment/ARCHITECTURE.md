# Beacon — Automatic Payment Verification Architecture
### PhonePe Business (per-planner merchant) model

---

## 1. Design Principle

Every planner is **mandated onto their own PhonePe Business merchant account** during
onboarding (own KYC, own bank settlement account). Beacon never touches traveller funds
— it only holds each planner's PhonePe **Merchant ID + API credentials**, and uses them
server-side to generate the payment request for that specific booking.

Because the payment is initiated *through* Beacon's integration (using the planner's
credentials) but *settles* into the planner's own account, PhonePe's webhook goes to
**Beacon's callback URL**, tagged with `merchantOrderId = Booking ID`. This gives Beacon
first-party, real-time, cryptographically-verifiable confirmation — no UTR typing, no
screenshots, no planner tap, no third-party AA cost.

```
Traveller pays  →  PhonePe processes  →  Settles to Planner's bank
                                     ↘
                                      Webhook → Beacon (signed, real-time)
                                            ↓
                                   Booking auto-confirmed
```

Manual UTR entry is kept **only** as a break-glass fallback (webhook missed / delayed /
planner temporarily deactivated) — never the primary path.

---

## 2. Booking → Payment → Verification Flow

```
1. Traveller selects package → creates Booking (status: DRAFT)
2. Beacon locks amount, generates Booking ID
3. Beacon backend calls PhonePe Create-Order API
      using the PLANNER's Merchant ID/Salt Key
      merchantOrderId = Booking ID
      → returns dynamic QR / payment link + orderId
4. Booking status → AWAITING_PAYMENT (30-min expiry timer starts)
5. Traveller pays via any UPI app (scans QR / opens link)
6. PhonePe sends webhook to Beacon:
      event: checkout.order.completed
      payload.state: COMPLETED
      payload.merchantOrderId: <Booking ID>
      payload.amount, transactionId, timestamp
7. Beacon verifies webhook signature (Basic Auth header PhonePe shares at setup)
8. Verification Engine runs deterministic checks (§4)
9. If all pass → Booking status: VERIFIED → receipt generated → notifications fired
10. If any check fails → status: MANUAL_REVIEW → Admin Dashboard alert
```

---

## 3. State Machine

```
                    ┌─────────┐
                    │  DRAFT  │
                    └────┬────┘
                         │ order created w/ planner PhonePe creds
                         ▼
                ┌──────────────────┐
                │ AWAITING_PAYMENT │──────────────┐
                └────────┬─────────┘              │ 30 min elapses,
                         │ webhook received        │ no webhook
                         ▼                         ▼
                  ┌─────────────┐           ┌──────────┐
                  │ VERIFYING   │           │ EXPIRED  │
                  └──────┬──────┘           └────┬─────┘
             ┌───────────┼────────────┐          │ traveller may retry →
             │           │            │          │ new order, same Booking
             ▼           ▼            ▼          
      ┌───────────┐ ┌──────────┐ ┌────────────────┐
      │ VERIFIED  │ │  FAILED  │ │ MANUAL_REVIEW   │
      └───────────┘ └──────────┘ │ (amount mismatch,│
                                  │ duplicate txn id,│
                                  │ fraud score high)│
                                  └────────┬─────────┘
                                           │ admin decision
                              ┌────────────┴────────────┐
                              ▼                         ▼
                       ┌────────────┐            ┌────────────┐
                       │  VERIFIED  │            │  REJECTED  │
                       │(overridden)│            │ (fraud/    │
                       └────────────┘            │  invalid)  │
                                                  └────────────┘
```

Terminal states: `VERIFIED`, `REJECTED`, `EXPIRED` (until retried).

---

## 4. Verification Engine — Deterministic Checks

Runs the instant a webhook lands, before touching booking status:

| # | Check | Logic | On fail |
|---|-------|-------|---------|
| 1 | Signature valid | HMAC/Basic-Auth header matches shared secret for that planner | Drop silently, log to `webhook_failures` |
| 2 | `merchantOrderId` maps to a real Booking | Lookup in Bookings table | Log to Audit, alert admin (orphan payment) |
| 3 | Booking not already VERIFIED | Idempotency — webhook retries are expected | No-op, ack 200 |
| 4 | `transactionId` not seen before | Unique index on Payments.transactionId | → `MANUAL_REVIEW`, fraud flag `DUPLICATE_TXN` |
| 5 | Amount == Booking.lockedAmount | Exact match required | Mismatch → `MANUAL_REVIEW`, flag `AMOUNT_MISMATCH` |
| 6 | Within payment window | `payload.timestamp` ≤ Booking.expiresAt | Late → `MANUAL_REVIEW`, flag `LATE_PAYMENT` |
| 7 | Planner account active & KYC-verified | PlannerPaymentAccount.status == ACTIVE | Should be impossible (gated at onboarding) — if it fires, hard alert |

All 7 pass → `VERIFIED`, receipt auto-generated, booking confirmed, notifications fired.
Any fail (except #1/#3) → `MANUAL_REVIEW` with the specific flag(s) attached, never silently rejected — admin always sees *why*.

---

## 5. Fraud Scoring (informational layer, runs alongside, not blocking)

Computed per booking/traveller/planner, stored on the Payment doc:

```
score = 0
+ 25  duplicate transactionId across bookings
+ 20  amount mismatch
+ 15  payment timestamp before booking creation timestamp (impossible → tampering)
+ 15  same device fingerprint used across >5 bookings in 24h
+ 10  same IP across >5 bookings in 24h
+ 10  traveller has ≥3 prior EXPIRED/FAILED bookings in 7 days
+ 10  planner has ≥3 MANUAL_REVIEW cases in 30 days (planner-side risk)
+ 5   payment landed in final 2 minutes of window

score ≥ 50  → auto-flag HIGH, force MANUAL_REVIEW regardless of engine result
score 20-49 → MEDIUM, visible in dashboard, no forced hold
score < 20  → LOW, informational only
```

---

## 6. Database Schema (MongoDB / Mongoose)

See `models/` — collections:

- **Bookings** — traveller, planner, package, lockedAmount, status, expiresAt, timestamps
- **PlannerPaymentAccounts** — PhonePe Merchant ID, encrypted Salt Key, KYC status, activation state
- **Payments** — bookingId, transactionId (unique), amount, verificationSource, rawWebhookPayload, status
- **VerificationLogs** — every check run, pass/fail, timestamp — immutable, append-only
- **FraudFlags** — bookingId, flagType, score contribution, resolved status
- **AuditLogs** — every state transition, actor (system/admin), before/after, immutable
- **AdminActions** — adminId, bookingId, action taken, reason, timestamp

All monetary/state-changing writes go through an **append-only audit trail** — no hard deletes anywhere in the payment path.

---

## 7. Security

- Salt Key / API credentials encrypted at rest (AES-256, KMS-managed key, never logged)
- Webhook endpoint validates Basic-Auth header PhonePe issues per merchant before trusting payload
- Idempotency keys on all state-changing endpoints
- Rate limiting on public booking/payment endpoints (Redis token bucket)
- Immutable audit + verification logs (write-once collections, no update/delete API)
- Least-privilege DB roles: webhook worker can only write Payments/VerificationLogs, never touch PlannerPaymentAccounts credentials table directly (goes through a secrets service)

---

## 8. Future-Ready

`Payment.verificationSource` enum: `phonepe_webhook | manual_utr | sms_auto | email_forward | aa_feed`
Adding Razorpay/Cashfree/bank-AA later = new adapter implementing the same
`VerificationSource` interface (`validate(payload) → {matched, amount, txnId}`) — zero
schema change, zero change to the Verification Engine or state machine.

---

## 9. Implementation Plan (phased)

1. **Phase 1** — Planner onboarding gate: PhonePe Business KYC flow, credential capture/encryption, activation state machine (block bookings until ACTIVE)
2. **Phase 2** — Booking + order creation against planner credentials, QR/link generation
3. **Phase 3** — Webhook receiver + signature validation + idempotent processing
4. **Phase 4** — Verification Engine (7 checks) + state machine wiring
5. **Phase 5** — Fraud scoring layer (async, non-blocking)
6. **Phase 6** — Admin dashboard (queues, search, override actions)
7. **Phase 7** — Notifications (traveller/planner/admin)
8. **Phase 8** — Manual-UTR fallback path (break-glass only)
