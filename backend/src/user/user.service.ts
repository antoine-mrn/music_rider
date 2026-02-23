import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthUserDb } from 'src/auth/types/auth-user-db.interface';
import { AuthUser, AuthUserSelect } from 'src/auth/types/auth-user.interface';
import { BandService } from 'src/band/band.service';
import { TechnicalRiderService } from 'src/technical-rider/technical-rider.service';
import { DashboardDto } from './dto/dashboard.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MediaService } from 'src/media/media.service';
import { ConfigService } from '@nestjs/config';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { MeResponseDto } from 'src/auth/dto/me-response-dto';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bandService: BandService,
    private readonly technicalRider: TechnicalRiderService,
    private readonly mediaService: MediaService,
    readonly configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<MeResponseDto, 'avatarUrl'> | null> {
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

  async me(id: number): Promise<MeResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: AuthUserSelect,
    });

    if (!user) throw new NotFoundException();

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      avatarUrl: user.avatar
        ? this.mediaService.getPublicUrl(user.avatar.bucket, user.avatar.path)
        : null,
    };
  }

  async getDashboardUser(id: number): Promise<DashboardDto> {
    const [user, bands, technicalRiders] = await Promise.all([
      this.me(id),
      this.bandService.findSummaryBandsByUserId(id),
      this.technicalRider.findSummaryTechnicalRiderByUserId(id),
    ]);

    const quickOverview = {
      totalBands: bands.meta.total,
      totalTechnicalRiders: technicalRiders.meta.total,
    };

    return { user, bands, technicalRiders, quickOverview };
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

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<AuthUser> {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto },
      select: AuthUserSelect,
    });
  }

  async updateAvatarByUserId(
    userId: number,
    file: Express.Multer.File,
  ): Promise<UpdateAvatarDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, avatarId: true },
    });

    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const oldAvatarId = user.avatarId;

    const newAvatar = await this.mediaService.upload(file, 'avatars');

    const newMedia = await this.prismaService.$transaction(async (tx) => {
      const media = await tx.media.create({
        data: {
          bucket: this.configService.getOrThrow('SUPABASE_BUCKET'),
          path: newAvatar.path,
          folder: 'avatars',
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { avatarId: media.id },
      });

      return media;
    });

    if (!newMedia)
      throw new InternalServerErrorException('Impossible de créer le media');

    if (oldAvatarId) {
      await this.mediaService.deleteMedia(oldAvatarId, 'avatars');
    }

    return {
      id: newMedia.id,
      path: this.mediaService.getPublicUrl(newMedia.bucket, newMedia.path),
    };
  }
}
