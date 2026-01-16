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
import { AuthResponDto } from './dto/auth-response.dto';
import { TokensDto } from './dto/tokens.dto';
import { AuthUser } from './types/auth-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<AuthResponDto> {
    return this.authService.signup(dto);
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
  async refresh(@Request() req: RefreshRequest): Promise<TokensDto> {
    return this.authService.refresh(req.user);
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Post('logout')
  async logout(@Request() req: RefreshRequest): Promise<{ message: string }> {
    return await this.authService.logout(req.user);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
