import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthSessionService } from 'src/auth-session/auth-session.service';
import { verify } from 'src/utils/hash';
import { RefreshTokenPayload } from '../types/refresh-token-payload.interface';

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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refresh_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    const session = await this.authSessionService.findById(payload.sessionId);

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid session');
    }

    // Vérifier que le token envoyé correspond à celui stocké en base
    const isValid = await verify(
      req.cookies.refresh_token,
      session.refreshTokenHash,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      sessionId: payload.sessionId,
    };
  }
}
