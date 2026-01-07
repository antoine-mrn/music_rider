import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { hash, verify } from 'src/utils/hash';
import { AuthSessionService } from 'src/auth-session/auth-session.service';
import { RefreshTokenPayload } from './types/refresh-token-payload.interface';
import { AuthUser } from './types/auth-user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthResponDto } from './dto/auth-response.dto';

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
  ): Promise<AuthUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await verify(password, user.password))) {
      const { password, createdAt, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: AuthUser): Promise<AuthResponDto> {
    const newSessionId = randomUUID();

    const { accessToken, refreshToken } = await this.__getTokens(
      user.email,
      user.id,
      newSessionId,
    );

    await this.__createNewSession(newSessionId, user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async signup(newUser: CreateUserDto): Promise<AuthResponDto> {
    const user = await this.usersService.findOneByEmail(newUser.email);

    if (user) throw new ConflictException();

    const hashedPassword = await hash(newUser.password);
    newUser = { ...newUser, password: hashedPassword };

    const newUserInBDD = await this.usersService.create(newUser);
    if (!newUserInBDD) throw new UnauthorizedException('Failed to create user');

    const newSessionId = randomUUID();

    const { accessToken, refreshToken } = await this.__getTokens(
      newUserInBDD.email,
      newUserInBDD.id,
      newSessionId,
    );

    await this.__createNewSession(newSessionId, newUserInBDD.id, refreshToken);

    return { accessToken, refreshToken, user: newUserInBDD };
  }

  async refresh(payload: RefreshTokenPayload): Promise<TokensDto> {
    const { accessToken, refreshToken } = await this.__getTokens(
      payload.email,
      payload.sub,
      randomUUID(),
    );

    try {
      await this.authSessionService.updateSessionById(
        payload.sessionId,
        refreshToken,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return { accessToken, refreshToken };
  }

  async logout(payload: RefreshTokenPayload): Promise<{ message: string }> {
    return this.authSessionService.revokeSessionById(payload.sessionId);
  }

  private async __getTokens(
    email: string,
    sub: number,
    sessionId: string,
  ): Promise<TokensDto> {
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
  ): Promise<void> {
    const newAuthSession = await this.authSessionService.create(
      sessionId,
      userId,
      refreshToken,
    );

    if (!newAuthSession)
      throw new UnauthorizedException('Session invalid or expired');
  }
}
