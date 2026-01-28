import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  summaryBandSelect,
  SummaryBandWithMusicStyle,
} from './types/band.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { getPaginationMeta } from 'src/utils/pagination';

@Injectable()
export class BandService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSummaryBandsByUserId(
    id: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<SummaryBandWithMusicStyle>> {
    const skip = (page - 1) * limit;

    const [bands, totalBands] = await Promise.all([
      this.prismaService.band.findMany({
        where: {
          memberships: {
            some: {
              userId: id,
            },
          },
        },
        select: summaryBandSelect,
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
        skip,
      }),
      this.prismaService.band.count({
        where: {
          memberships: {
            some: {
              userId: id,
            },
          },
        },
      }),
    ]);

    const meta = getPaginationMeta(totalBands, page, limit);

    return { data: bands, meta };
  }
}
