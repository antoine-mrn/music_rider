import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StyleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllStyles(): Promise<{ id: number; label: string }[]> {
    return await this.prismaService.musicStyle.findMany({
      select: {
        id: true,
        label: true,
      },
    });
  }
}
