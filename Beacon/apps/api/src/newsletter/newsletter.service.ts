import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.newsletter.create({ data });
  }

  findAll() {
    return this.prisma.newsletter.findMany();
  }

  findOne(id: string) {
    return this.prisma.newsletter.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.newsletter.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.newsletter.delete({ where: { id } });
  }
}
