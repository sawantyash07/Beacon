import { Controller, Post, Body, Headers, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('order')
  @HttpCode(HttpStatus.OK)
  async createOrder(
    @Body() body: { bookingId: string; ipAddress?: string; deviceFingerprint?: string }
  ) {
    if (!body.bookingId) {
      throw new BadRequestException('bookingId is required');
    }
    return this.paymentsService.createOrder(body.bookingId, body.ipAddress, body.deviceFingerprint);
  }

  @Post('webhook/phonepe')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() payload: any,
    @Headers('authorization') authHeader: string
  ) {
    return this.paymentsService.handleWebhook(payload, authHeader);
  }

  @Post('admin/override')
  @HttpCode(HttpStatus.OK)
  async adminOverride(
    @Body() body: { bookingId: string; adminId: string; action: 'APPROVE' | 'REJECT'; reason: string }
  ) {
    if (!body.bookingId || !body.adminId || !body.action || !body.reason) {
      throw new BadRequestException('Missing parameters for manual admin override');
    }
    return this.paymentsService.adminVerifyPayment(body.bookingId, body.adminId, body.action, body.reason);
  }

  // MOCK WEBHOOK TRIGGER ENDPOINT
  // This allows developer/traveller to simulate a PhonePe transaction completed event locally.
  @Post('mock-webhook')
  @HttpCode(HttpStatus.OK)
  async triggerMockWebhook(
    @Body() body: { bookingCode: string; amount: number; transactionId?: string; failAmount?: boolean; failActive?: boolean }
  ) {
    if (!body.bookingCode || !body.amount) {
      throw new BadRequestException('bookingCode and amount are required to trigger mock webhook');
    }

    const transactionId = body.transactionId || `MOCK-TXN-${Date.now()}`;
    const amountInPaise = body.failAmount ? body.amount * 90 : body.amount * 100; // send wrong amount if requested

    // PhonePe payload structure
    const payload = {
      event: 'checkout.order.completed',
      payload: {
        merchantId: body.failActive ? 'MOCK_INACTIVE_MERCHANT' : 'BEACON_MOCK_MERCHANT',
        merchantOrderId: body.bookingCode,
        amount: amountInPaise,
        state: 'COMPLETED',
        paymentDetails: [
          {
            transactionId,
            paymentMode: 'UPI',
            amount: amountInPaise,
          }
        ]
      }
    };

    // Simulated basic auth matching our mock credentials (pre-loaded or matching the mock account setup)
    const mockAuthHeader = 'Basic YmVhY29uX3dlYmhvb2tfYWRtaW46c2VjdXJlX21vY2tfcGFzc3dvcmQ=';

    return this.paymentsService.handleWebhook(payload, mockAuthHeader);
  }
}
