import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthUserDb } from 'src/auth/types/auth-user-db.interface';
import { AuthUser } from 'src/auth/types/auth-user.interface';
import { BandService } from 'src/band/band.service';
import { TechnicalRiderService } from 'src/technical-rider/technical-rider.service';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bandService: BandService,
    private readonly technicalRider: TechnicalRiderService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AuthUser | null> {
    return await this.prismaService.user.create({
      data: createUserDto,
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });
  }

  async me(id: number): Promise<AuthUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async getDashboardUser(id: number) {
    const user = await this.me(id);
    const bands = await this.bandService.findSummaryBandsByUserId(id);
    const technicalRider =
      await this.technicalRider.findSummaryTechnicalRiderByUserId(id);

    return { user, bands, technicalRider };
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
