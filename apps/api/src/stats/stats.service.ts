import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [usersCount, packagesCount, bookingsCount, destinationsCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.package.count(),
      this.prisma.booking.count(),
      this.prisma.destination.count(),
    ]);

    return {
      users: usersCount,
      packages: packagesCount,
      bookings: bookingsCount,
      destinations: destinationsCount,
    };
  }
}
