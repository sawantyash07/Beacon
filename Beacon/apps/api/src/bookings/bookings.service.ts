import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { travelerId, packageId, travelDate, passengerCount, totalAmount, status, utr } = data;
    const bookingCode = `BKN-${Math.floor(100000 + Math.random() * 900000)}`;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    
    // Create booking and nested payment
    const booking = await this.prisma.booking.create({
      data: {
        travelerId,
        packageId,
        travelDate: new Date(travelDate),
        passengerCount: parseInt(passengerCount, 10) || 1,
        totalAmount: parseFloat(totalAmount),
        status: status || 'PENDING',
        bookingCode,
        paymentWindowMinutes: 30,
        expiresAt,
        payment: {
          create: {
            amount: parseFloat(totalAmount),
            status: 'PENDING',
            razorpayPaymentId: utr || null
          }
        }
      },
      include: {
        payment: true,
        package: true
      }
    });

    return booking;
  }

  findAll(query?: { plannerId?: string; travelerId?: string }) {
    const where: any = {};
    if (query?.travelerId) where.travelerId = query.travelerId;
    if (query?.plannerId) {
      where.package = { plannerId: query.plannerId };
    }

    return this.prisma.booking.findMany({
      where,
      include: {
        package: {
          include: {
            planner: {
              include: {
                profile: true
              }
            }
          }
        },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({ 
      where: { id },
      include: {
        package: true,
        payment: true
      }
    });
  }

  async update(id: string, data: any) {
    const { status, utr, paymentStatus } = data;
    
    const updateData: any = {};
    if (status) updateData.status = status;
    
    const paymentUpdate: any = {};
    if (status === 'CONFIRMED') {
      paymentUpdate.status = 'SUCCESS';
    } else if (paymentStatus) {
      paymentUpdate.status = paymentStatus;
    }
    if (utr) {
      paymentUpdate.razorpayPaymentId = utr;
    }

    if (Object.keys(paymentUpdate).length > 0) {
      updateData.payment = {
        update: paymentUpdate
      };
    }

    return this.prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        payment: true,
        package: true
      }
    });
  }

  remove(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
