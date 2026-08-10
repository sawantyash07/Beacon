import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const identifier = req.body?.email || req.body?.emailOrMobile || req.body?.identifier || req.body?.username || req.body?.mobileNumber || username;
    const user = await this.authService.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email, mobile number, or password');
    }
    return user;
  }
}
