import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.booking.create({ data });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.booking.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
