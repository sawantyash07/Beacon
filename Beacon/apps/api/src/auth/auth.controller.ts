import { Body, Controller, Post, Get, Res, UseGuards, Request, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    // req.user is set by Passport LocalStrategy
    const { access_token, user } = await this.authService.login(req.user);
    
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Logged in successfully', user };
  }

  @Post('register')
  async register(@Body() registerDto: Record<string, any>) {
    if (!registerDto.name || !registerDto.email || !registerDto.mobileNumber || !registerDto.password) {
      throw new BadRequestException('Full Name, Email address, Mobile number, and Password are required.');
    }

    const ageNum = registerDto.age !== undefined && registerDto.age !== '' ? Number(registerDto.age) : undefined;
    if (ageNum !== undefined && (isNaN(ageNum) || ageNum < 18)) {
      throw new BadRequestException('Age must be a valid number and at least 18 years old.');
    }

    const result = await this.authService.register({
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
      mobileNumber: registerDto.mobileNumber,
      age: ageNum,
      gender: registerDto.gender || null,
      partnerType: registerDto.partnerType || 'COMPANY',
      role: registerDto.role || 'TRAVELER',
    });

    return { message: 'Account created successfully. Please log in to continue.', user: result.user };
  }
  
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return { user: req.user };
  }
}
