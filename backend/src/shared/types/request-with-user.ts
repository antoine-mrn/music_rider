import { Request } from 'express';
import { AuthUser } from 'src/auth/types/auth-user.interface';
import { Payload } from 'src/auth/types/payload.interface.ts';
import { RefreshTokenPayload } from 'src/auth/types/refresh-token-payload.interface';

export interface AuthRequest extends Request {
  user: Payload;
}
export interface RefreshRequest extends Request {
  user: RefreshTokenPayload;
}

export interface SigninRequest extends Request {
  user: AuthUser;
}
