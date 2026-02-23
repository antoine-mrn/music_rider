import { Request } from 'express';
import { Payload } from 'src/auth/types/payload.interface.ts';
import { RefreshTokenPayload } from 'src/auth/types/refresh-token-payload.interface';
import { CurrentUser } from 'src/user/types/auth-user.interface';

export interface AuthRequest extends Request {
  user: Payload;
}
export interface RefreshRequest extends Request {
  user: RefreshTokenPayload;
}

export interface SigninRequest extends Request {
  user: CurrentUser;
}
