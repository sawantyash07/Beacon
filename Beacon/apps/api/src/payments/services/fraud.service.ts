import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FraudService {
  constructor(private readonly prisma: PrismaService) {}

  async computeFraudScore(
    bookingId: string,
    params: {
      amount: number;
      transactionId: string;
      flags: string[];
    }
  ): Promise<{ score: number; contributions: { type: string; points: number }[] }> {
    let score = 0;
    const contributions: { type: string; points: number }[] = [];

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { package: true },
    });

    if (!booking) {
      return { score: 0, contributions: [] };
    }

    // 1. Amount mismatch (points: 20)
    if (params.flags.includes('AMOUNT_MISMATCH')) {
      score += 20;
      contributions.push({ type: 'AMOUNT_MISMATCH', points: 20 });
    }

    // 2. Duplicate Transaction ID (points: 25)
    if (params.flags.includes('DUPLICATE_TXN')) {
      score += 25;
      contributions.push({ type: 'DUPLICATE_TXN', points: 25 });
    }

    // 3. Device fingerprint abuse (points: 15)
    if (booking.deviceFingerprint) {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const fingerprintBookingsCount = await this.prisma.booking.count({
        where: {
          deviceFingerprint: booking.deviceFingerprint,
          createdAt: { gte: oneDayAgo },
        },
      });
      if (fingerprintBookingsCount > 5) {
        score += 15;
        contributions.push({ type: 'DEVICE_FINGERPRINT_ABUSE', points: 15 });
      }
    }

    // 4. IP address abuse (points: 10)
    if (booking.ipAddress) {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const ipBookingsCount = await this.prisma.booking.count({
        where: {
          ipAddress: booking.ipAddress,
          createdAt: { gte: oneDayAgo },
        },
      });
      if (ipBookingsCount > 5) {
        score += 10;
        contributions.push({ type: 'IP_ABUSE', points: 10 });
      }
    }

    // 5. Traveller history with expired/failed bookings (points: 10)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const failedBookingsCount = await this.prisma.booking.count({
      where: {
        travelerId: booking.travelerId,
        createdAt: { gte: sevenDaysAgo },
        status: { in: ['EXPIRED', 'FAILED', 'REJECTED'] },
      },
    });
    if (failedBookingsCount >= 3) {
      score += 10;
      contributions.push({ type: 'TRAVELLER_HIGH_FAILURE_RATE', points: 10 });
    }

    // 6. Late payment - landed in final 2 minutes of window (points: 5)
    if (booking.expiresAt) {
      const twoMinutesInMs = 2 * 60 * 1000;
      const timeLeft = booking.expiresAt.getTime() - Date.now();
      if (timeLeft > 0 && timeLeft <= twoMinutesInMs) {
        score += 5;
        contributions.push({ type: 'LATE_WINDOW_PAYMENT', points: 5 });
      }
    }

    return { score, contributions };
  }
}
