import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import ms from 'ms';
import { hash } from 'src/utils/hash';

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(sessionId: string, userId: number, refreshToken: string) {
    const refreshTokenHash = await hash(refreshToken);

    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
    const expiresAt = new Date(Date.now() + ms(expiresIn));

    return await this.prismaService.authSession.create({
      data: {
        id: sessionId,
        userId,
        refreshTokenHash,
        expiresAt,
      },
    });
  }

  async findById(id: string) {
    return await this.prismaService.authSession.findUnique({
      where: {
        id,
      },
    });
  }
}
