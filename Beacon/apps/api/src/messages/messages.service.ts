import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.message.create({ data });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  findOne(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.message.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
