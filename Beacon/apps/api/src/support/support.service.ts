import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.supportTicket.create({ data });
  }

  findAll(query?: { plannerId?: string; customerId?: string }) {
    const where: any = {};
    if (query?.plannerId) where.plannerId = query.plannerId;
    if (query?.customerId) where.customerId = query.customerId;

    return this.prisma.supportTicket.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.supportTicket.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.supportTicket.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.supportTicket.delete({ where: { id } });
  }
}
