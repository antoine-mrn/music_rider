import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { RefreshTokenPayload } from './types/RefreshTokenPayload.interface';
import { hash, verify } from 'src/utils/hash';
import { AuthSessionService } from 'src/auth-session/auth-session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly config: ConfigService,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await verify(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    const newSessionId = randomUUID();

    const { accessToken, refreshToken } = await this.__getTokens(
      user.email,
      user.id,
      newSessionId,
    );

    await this.__createNewSession(newSessionId, user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async signup(newUser: CreateAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (user) throw new ConflictException();

    const hashedPassword = await hash(newUser.password);
    newUser = { ...newUser, password: hashedPassword };

    const newUserInBDD = await this.prismaService.user.create({
      data: newUser,
    });

    const newSessionId = randomUUID();

    const { accessToken, refreshToken } = await this.__getTokens(
      newUserInBDD.email,
      newUserInBDD.id,
      newSessionId,
    );

    await this.__createNewSession(newSessionId, newUserInBDD.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh(payload: RefreshTokenPayload) {
    console.log('🚀 ~ AuthService ~ refresh ~ payload:', payload);
    const session = await this.authSessionService.findById(payload.sessionId);

    if (!session || session.expiresAt < new Date() || session.revokedAt)
      throw new UnauthorizedException('Session invalid or expired');

    const refreshToken = payload.refreshToken;
    console.log('🚀 ~ AuthService ~ refresh ~ refreshTokenn:', refreshToken);

    return;
  }

  private async __getTokens(email: string, sub: number, sessionId: string) {
    const accessToken = await this.__generateAccessToken(email, sub);
    const refreshToken = await this.__generateRefreshToken(
      email,
      sub,
      sessionId,
    );

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

  private async __createNewSession(
    sessionId: string,
    userId: number,
    refreshToken: string,
  ) {
    const newAuthSession = await this.authSessionService.create(
      sessionId,
      userId,
      refreshToken,
    );

    if (!newAuthSession)
      throw new UnauthorizedException('Session invalid or expired');
  }
}
