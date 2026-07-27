import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.package.create({ data });
  }

  findAll() {
    return this.prisma.package.findMany();
  }

  findOne(id: string) {
    return this.prisma.package.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.package.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.package.delete({ where: { id } });
  }
}
