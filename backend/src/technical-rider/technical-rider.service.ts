import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { getPaginationMeta } from 'src/utils/pagination';
import {
  summaryTechnicalRiderSelect,
  SummaryTechnicalRiderWithMusicStyle,
} from './types/technical-rider.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';

@Injectable()
export class TechnicalRiderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSummaryTechnicalRiderByUserId(
    id: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<SummaryTechnicalRiderWithMusicStyle>> {
    const skip = (page - 1) * limit;

    const [technicalRider, totalTechnicalRider] = await Promise.all([
      this.prismaService.technicalRider.findMany({
        where: {
          band: {
            memberships: {
              some: {
                userId: id,
              },
            },
          },
        },
        select: summaryTechnicalRiderSelect,
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
        skip,
      }),
      this.prismaService.technicalRider.count({
        where: {
          band: {
            memberships: {
              some: {
                userId: id,
              },
            },
          },
        },
      }),
    ]);

    const meta = getPaginationMeta(totalTechnicalRider, page, limit);

    return { data: technicalRider, meta };
  }
}
