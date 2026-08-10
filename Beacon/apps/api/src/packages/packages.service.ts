import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.package.create({ data });
  }

  findAll(query?: { plannerId?: string; status?: string }) {
    const where: any = {};
    if (query?.plannerId) where.plannerId = query.plannerId;
    if (query?.status) where.status = query.status;

    return this.prisma.package.findMany({
      where,
      include: {
        planner: {
          include: {
            profile: true
          }
        },
        images: true,
        itinerary: true,
        reviews: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.package.findUnique({
      where: { id },
      include: {
        planner: {
          include: {
            profile: true
          }
        },
        images: true,
        itinerary: true,
        reviews: true
      }
    });
  }

  update(id: string, data: any) {
    return this.prisma.package.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.package.delete({ where: { id } });
  }
}
