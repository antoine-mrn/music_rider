import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RiderCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRiderCategory(): Promise<{ id: number; label: string }[]> {
    return await this.prismaService.riderCategory.findMany({
      select: {
        id: true,
        label: true,
      },
    });
  }
}
