import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.blog.create({ data });
  }

  findAll() {
    return this.prisma.blog.findMany();
  }

  findOne(id: string) {
    return this.prisma.blog.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.blog.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.blog.delete({ where: { id } });
  }
}
