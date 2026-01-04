import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as argon from 'argon2';
import { ARGON2_OPTIONS } from './password.config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return await this.__getTokens(payload);
  }

  async signup(newUser: CreateAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    if (user) throw new ConflictException();

    const hashedPassword = await this.__hashPassword(newUser.password);
    newUser = { ...newUser, password: hashedPassword };

    const newUserInBDD = await this.prismaService.user.create({
      data: newUser,
    });

    return await this.__getTokens({
      email: newUserInBDD.email,
      sub: newUserInBDD.id,
    });
  }

  private async __getTokens(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async __hashPassword(password: string): Promise<string> {
    return await argon.hash(password, ARGON2_OPTIONS);
  }

  private async __verifyPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await argon.verify(hashPassword, password);
  }
}
