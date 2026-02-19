import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from 'supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  constructor(
    private readonly SupabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  async upload(
    file: Express.Multer.File,
  ): Promise<{ path: string; id: string } | any> {
    const extension = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;

    const { data, error } = await this.SupabaseService.getClient()
      .storage.from('Music-rider')
      .upload(filename, file.buffer);

    if (error) throw new BadRequestException(error.message);
    console.log('🚀 ~ MediaService ~ upload ~ response:', data);

    return data;
  }
}
