import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@beacon/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    if (!identifier) return null;
    const trimmed = identifier.trim();
    const lowercased = trimmed.toLowerCase();

    if (trimmed.includes('@')) {
      return this.prisma.user.findUnique({
        where: { email: lowercased },
      });
    }

    const cleanPhone = trimmed.replace(/[^0-9+]/g, '');

    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: lowercased },
          { mobileNumber: trimmed },
          { mobileNumber: cleanPhone },
        ],
      },
    });
  }

  async findByEmailOrMobile(email: string, mobileNumber?: string): Promise<User | null> {
    const emailLower = email ? email.trim().toLowerCase() : '';
    const mobileTrimmed = mobileNumber ? mobileNumber.trim() : '';
    const cleanPhone = mobileTrimmed.replace(/[^0-9+]/g, '');

    const conditions: Prisma.UserWhereInput[] = [];
    if (emailLower) {
      conditions.push({ email: emailLower });
    }
    if (mobileTrimmed) {
      conditions.push({ mobileNumber: mobileTrimmed });
      if (cleanPhone && cleanPhone !== mobileTrimmed) {
        conditions.push({ mobileNumber: cleanPhone });
      }
    }

    if (conditions.length === 0) return null;

    return this.prisma.user.findFirst({
      where: { OR: conditions },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password as string, salt);

    return this.prisma.user.create({
      data: {
        ...data,
        email: data.email.trim().toLowerCase(),
        mobileNumber: data.mobileNumber ? data.mobileNumber.trim() : null,
        password: hashedPassword,
      },
    });
  }
}
