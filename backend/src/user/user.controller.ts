import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('me')
  async getProfile(@Request() req: AuthRequest) {
    return await this.userService.me(req.user.sub);
  }

  @Get('dashboard')
  async getDashboardUser(@Request() req: AuthRequest) {
    console.log('🚀 ~ UserController ~ getDashboardUser ~ req:', req.user);
    return await this.userService.getDashboardUser(req.user.sub);
  }
}
