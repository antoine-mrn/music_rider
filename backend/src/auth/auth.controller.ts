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
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { RtAuthGuard } from './guards/rt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateAuthDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }
}
