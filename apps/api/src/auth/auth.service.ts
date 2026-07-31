import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@beacon/database';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: Prisma.UserCreateInput) {
    if (data.age != null && data.age < 18) {
      throw new BadRequestException('You must be at least 18 years old to register.');
    }

    const existingUser = await this.usersService.findByEmailOrMobile(
      data.email,
      data.mobileNumber || undefined,
    );
    if (existingUser) {
      if (existingUser.email.toLowerCase() === data.email.trim().toLowerCase()) {
        throw new ConflictException('User with this email already exists');
      }
      throw new ConflictException('User with this mobile number already exists');
    }

    const user = await this.usersService.createUser(data);
    
    return {
      message: 'Account created successfully. Please log in to continue.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobileNumber: user.mobileNumber,
        age: user.age,
        gender: user.gender,
        role: user.role,
      }
    };
  }

  async validateUser(identifier: string, pass: string) {
    if (!identifier || !pass) return null;
    const user = await this.usersService.findByIdentifier(identifier);
    if (!user || !user.password) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
      }
    };
  }
}
