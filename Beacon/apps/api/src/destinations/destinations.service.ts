import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    if (search) {
      return this.prisma.destination.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
          ],
        },
      });
    }
    return this.prisma.destination.findMany();
  }

  async findOne(id: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { id },
      include: {
        packages: {
          include: {
            images: true,
          }
        },
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, profile: true },
            }
          }
        }
      },
    });

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return destination;
  }
}
