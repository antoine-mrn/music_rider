import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import ms from 'ms';
import { hash } from 'src/utils/hash';
import { RefreshSession } from 'src/shared/types/refresh-session.interface';

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(
    sessionId: string,
    userId: number,
    refreshToken: string,
  ): Promise<{ id: string } | null> {
    const refreshTokenHash = await hash(refreshToken);
    const expiresAt = this.__getExpiresAt();

    return await this.prismaService.authSession.create({
      data: {
        id: sessionId,
        userId,
        refreshTokenHash,
        expiresAt,
      },
      select: { id: true },
    });
  }

  async findById(id: string): Promise<RefreshSession | null> {
    return await this.prismaService.authSession.findUnique({
      where: {
        id,
      },
      select: {
        refreshTokenHash: true,
        revokedAt: true,
        expiresAt: true,
      },
    });
  }

  async updateSessionById(
    id: string,
    refreshtoken: string,
  ): Promise<{ id: string } | null> {
    const refreshTokenHash = await hash(refreshtoken);
    const expiresAt = this.__getExpiresAt();

    return await this.prismaService.authSession.update({
      where: {
        id,
      },
      data: {
        refreshTokenHash,
        expiresAt,
      },
      select: {
        id: true,
      },
    });
  }

  async revokeSessionById(sessionId: string): Promise<void> {
    await this.prismaService.authSession.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  private __getExpiresAt(): Date {
    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
    return new Date(Date.now() + ms(expiresIn));
  }
}
