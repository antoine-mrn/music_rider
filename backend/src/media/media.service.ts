import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from 'supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { folderName } from './types/media.types';
import { PrismaService } from 'prisma/prisma.service';
import { Media } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
    readonly configService: ConfigService,
  ) {}

  async createMedia(path: string, folder: folderName): Promise<Media> {
    return await this.prismaService.media.create({
      data: {
        bucket: this.configService.getOrThrow('SUPABASE_BUCKET'),
        path,
        folder,
      },
    });
  }

  async upload(
    file: Express.Multer.File,
    folder: folderName,
  ): Promise<{ path: string; id: string; fullPath: string }> {
    const extension = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;

    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from(this.configService.getOrThrow('SUPABASE_BUCKET'))
      .upload(`${folder}/${filename}`, file.buffer);

    if (error) throw new BadRequestException(error.message);

    return data;
  }

  async deleteMedia(
    id: number,
    folder: folderName,
  ): Promise<{ success: boolean }> {
    const media = await this.prismaService.media.findUnique({
      where: { id },
    });

    if (!media) throw new NotFoundException();

    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from(this.configService.getOrThrow('SUPABASE_BUCKET'))
      .remove([media.path]);

    if (error) throw new InternalServerErrorException();

    await this.prismaService.media.delete({ where: { id } });

    return { success: true };
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabaseService
      .getClient()
      .storage.from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}
