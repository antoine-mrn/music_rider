export interface RefreshSession {
  refreshTokenHash: string;
  revokedAt: Date | null;
  expiresAt: Date;
}
