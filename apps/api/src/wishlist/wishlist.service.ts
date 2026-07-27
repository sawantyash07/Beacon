import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  create(data: { userId: string, packageId?: string }) {
    return this.prisma.wishlist.create({
      data: {
        userId: data.userId,
        packageId: data.packageId || 'dummy-package-id'
      }
    });
  }

  findAll() {
    return this.prisma.wishlist.findMany();
  }

  findOne(id: string) {
    return this.prisma.wishlist.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.wishlist.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.wishlist.delete({ where: { id } });
  }
}
