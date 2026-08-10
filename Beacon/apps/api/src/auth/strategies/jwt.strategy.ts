import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // We extract from either Bearer token or HttpOnly cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['access_token'];
          }
          if (!token && request.headers.authorization) {
            const [type, auth] = request.headers.authorization.split(' ');
            if (type === 'Bearer') {
              token = auth;
            }
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-beacon-key-do-not-use-in-prod',
    });
  }

  async validate(payload: any) {
    // Passport automatically attaches this return value to `req.user`
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}
