import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.inquiry.create({ data });
  }

  findAll(query?: { plannerId?: string }) {
    if (query?.plannerId) {
      return this.prisma.inquiry.findMany({ 
        where: { plannerId: query.plannerId },
        orderBy: { createdAt: 'desc' }
      });
    }
    return this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.inquiry.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.inquiry.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.inquiry.delete({ where: { id } });
  }
}
