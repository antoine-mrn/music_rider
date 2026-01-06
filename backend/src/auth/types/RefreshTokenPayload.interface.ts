import { Payload } from './payload.interface.ts';

export interface RefreshTokenPayload extends Payload {
  sessionId: string;
  refreshToken: string;
}
