import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthUserDb } from 'src/auth/types/auth-user-db.interface';
import { AuthUser } from 'src/auth/types/auth-user.interface';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<AuthUser | null> {
    return await this.prismaService.user.create({
      data: createUserDto,
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        createdAt: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<AuthUserDb | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        password: true,
        createdAt: true,
      },
    });
  }

  async isEmailExist(email: string): Promise<boolean> {
    const count = await this.prismaService.user.count({
      where: { email },
    });
    return count > 0;
  }
}
