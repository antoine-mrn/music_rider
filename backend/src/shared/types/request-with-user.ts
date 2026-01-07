import { Request } from 'express';
import { Payload } from 'src/auth/types/payload.interface.ts';
import { RefreshTokenPayload } from 'src/auth/types/refresh-token-payload.interface';

export interface AuthRequest extends Request {
  user: Payload;
}
export interface RefreshRequest extends Request {
  user: RefreshTokenPayload;
}
