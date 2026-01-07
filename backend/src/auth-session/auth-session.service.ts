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

  async revokeSessionById(id: string): Promise<{ message: string }> {
    try {
      await this.prismaService.authSession.update({
        where: {
          id,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      return { message: 'Successfully logged out' };
    } catch (error: any) {
      throw new NotFoundException('Session already revoked or does not exist');
    }
  }

  private __getExpiresAt(): Date {
    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
    return new Date(Date.now() + ms(expiresIn));
  }
}
