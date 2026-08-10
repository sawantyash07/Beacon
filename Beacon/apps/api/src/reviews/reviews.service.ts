import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.review.create({ data });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findOne(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.review.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
