import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStats(query?: { plannerId?: string }) {
    const wherePackage = query?.plannerId ? { plannerId: query.plannerId } : {};
    const whereBooking = query?.plannerId ? { package: { plannerId: query.plannerId } } : {};
    const whereInquiry = query?.plannerId ? { plannerId: query.plannerId } : {};
    const whereSupport = query?.plannerId ? { plannerId: query.plannerId } : {};

    const [
      packagesCount,
      bookingsCount,
      pendingPaymentsCount,
      newInquiriesCount,
      supportTicketsCount
    ] = await Promise.all([
      this.prisma.package.count({ where: wherePackage }),
      this.prisma.booking.count({ where: whereBooking }),
      this.prisma.booking.count({ 
        where: { 
          ...whereBooking,
          status: 'PENDING' 
        } 
      }),
      this.prisma.inquiry.count({ 
        where: {
          ...whereInquiry,
          status: 'new'
        }
      }),
      this.prisma.supportTicket.count({ where: whereSupport })
    ]);

    const bookings = await this.prisma.booking.findMany({
      where: {
        ...whereBooking,
        status: 'CONFIRMED'
      },
      select: {
        totalAmount: true
      }
    });
    const monthlyEarnings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    return {
      packages: packagesCount,
      bookings: bookingsCount,
      pendingPayments: pendingPaymentsCount,
      newInquiries: newInquiriesCount,
      supportTickets: supportTicketsCount,
      monthlyEarnings: monthlyEarnings,
    };
  }
}
