import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  async getProfile(@Request() req: AuthRequest) {
    return await this.userService.me(req.user.sub);
  }

  // @Get('dashboard')
  // getDashboardUser(@Request() req: AuthRequest) {
  //   return this.usersService.getDashboardUser(req.user.sub);
  // }
}
