import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/shared/pipes/file-validation.pipe';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { CurrentUserDto } from './dto/current-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('me')
  async getProfile(@Request() req: AuthRequest): Promise<CurrentUserDto> {
    return await this.userService.me(req.user.sub);
  }

  @Get('dashboard')
  async getDashboardUser(@Request() req: AuthRequest) {
    return await this.userService.getDashboardUser(req.user.sub);
  }

  @Patch('me')
  async updateUserById(
    @Request() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<CurrentUserDto> {
    return await this.userService.updateUserById(req.user.sub, updateUserDto);
  }

  @Patch('me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatarByUserId(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
    @Request() req: AuthRequest,
  ): Promise<UpdateAvatarDto> {
    return this.userService.updateAvatarByUserId(req.user.sub, file);
  }
}
