import { AuthService } from './auth.service';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { RtAuthGuard } from './guards/rt-auth.guard';
import type { RefreshRequest } from 'src/shared/types/request-with-user';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthResponDto } from './dto/auth-response.dto';
import { TokensDto } from './dto/tokens.dto';

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
  async signin(@Request() req): Promise<AuthResponDto> {
    return this.authService.signin(req.user);
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

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
