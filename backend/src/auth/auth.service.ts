import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as argon from 'argon2';
import { ARGON2_OPTIONS } from './password.config';
import { AuthSession, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { randomUUID } from 'crypto';
import { RefreshTokenPayload } from './types/RefreshTokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await this.__verify(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    return await this.__getTokens(user.email, user.userId, randomUUID());
  }

  async signup(newUser: CreateAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (user) throw new ConflictException();

    const hashedPassword = await this.__hash(newUser.password);
    newUser = { ...newUser, password: hashedPassword };

    const newUserInBDD = await this.prismaService.user.create({
      data: newUser,
    });

    const { accessToken, refreshToken } = await this.__getTokens(
      newUserInBDD.email,
      newUserInBDD.id,
      randomUUID(),
    );

    return { accessToken, refreshToken };
  }

  async refresh(payload: RefreshTokenPayload) {
    return;
  }

  private async __getTokens(email: string, sub: number, sessionId: string) {
    const accessToken = await this.__generateAccessToken(email, sub);
    const refreshToken = await this.__generateRefreshToken(
      email,
      sub,
      sessionId,
    );

    const newAuthSession = await this.__createOrUpdateSession(
      sessionId,
      refreshToken,
      sub,
    );

    if (!newAuthSession)
      throw new UnauthorizedException('Session invalid or expired');

    return { accessToken, refreshToken };
  }

  private async __generateAccessToken(
    email: string,
    sub: number,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      { email, sub },
      {
        secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.config.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
      },
    );
  }

  private async __generateRefreshToken(
    email: string,
    sub: number,
    sessionId: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { email, sub, sessionId },
      {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
      },
    );
  }

  private async __createOrUpdateSession(
    sessionId: string,
    refreshToken: string,
    userId: number,
  ) {
    const refreshTokenHash = await this.__hash(refreshToken);

    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN');
    const expiresAt = new Date(Date.now() + ms(expiresIn));

    return this.prismaService.$transaction(async (tx) => {
      const isSessionExist = await tx.authSession.findUnique({
        where: {
          id: sessionId,
        },
      });

      if (isSessionExist) {
        await tx.authSession.update({
          where: {
            id: sessionId,
          },
          data: {
            revokedAt: new Date(),
          },
        });
      }

      return await tx.authSession.create({
        data: {
          id: sessionId,
          userId,
          refreshTokenHash,
          expiresAt,
        },
      });
    });
  }

  private async __hash(data: string): Promise<string> {
    return await argon.hash(data, ARGON2_OPTIONS);
  }

  private async __verify(data: string, hash: string): Promise<boolean> {
    return await argon.verify(hash, data);
  }
}
