import { AuthService } from './auth.service';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { RtAuthGuard } from './guards/rt-auth.guard';
import type { RefreshRequest } from 'src/shared/types/request-with-user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthUser } from './types/auth-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ): Promise<AuthUser> {
    const { accessToken, refreshToken, user } =
      await this.authService.signup(dto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Request() req,
  ): Promise<AuthUser> {
    const { accessToken, refreshToken, user } = await this.authService.signin(
      req.user,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return user;
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Request() req: RefreshRequest,
  ): Promise<{ success: boolean }> {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return { success: true };
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Request() req: RefreshRequest,
  ): Promise<void> {
    await this.authService.logout(req.user);

    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
  }

  @Get('me')
  async getProfile(@Request() req) {
    return await this.authService.me(req.user.email);
  }
}
