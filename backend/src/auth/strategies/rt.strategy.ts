import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenPayload } from '../types/RefreshTokenPayload.interface';
import { Request } from 'express';
import { AuthSessionService } from 'src/auth-session/auth-session.service';
import { hash, verify } from 'src/utils/hash';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    private readonly authSessionService: AuthSessionService,
  ) {
    const secret = config.get<string>('JWT_REFRESH_SECRET');
    if (!secret) {
      throw new Error('Missing JWT_REFRESH_SECRET environment variable');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Missing authorization');

    const [type, refreshToken] = authHeader.split(' ');
    if (type !== 'Bearer' || !refreshToken)
      throw new UnauthorizedException('Invalid Authorization header');

    const session = await this.authSessionService.findById(payload.sessionId);
    if (!session || session.revokedAt || session.expiresAt < new Date())
      throw new UnauthorizedException('Invalid Authorization header');

    const isValidSession = await verify(refreshToken, session.refreshTokenHash);
    if (!isValidSession)
      throw new UnauthorizedException('Invalid Authorization header');

    return {
      userId: payload.sub,
      email: payload.email,
      sessionId: payload.sessionId,
    };
  }
}
