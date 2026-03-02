import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { getPaginationMeta } from 'src/utils/pagination';
import {
  SummaryTechnicalRider,
  summaryTechnicalRiderSelect,
} from './types/technical-rider.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';

@Injectable()
export class TechnicalRiderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSummaryTechnicalRiderByUserId(
    id: number,
    limit: number = 10,
  ): Promise<{ data: SummaryTechnicalRider[]; totalTechnicalRiders: number }> {
    const [technicalRider, totalTechnicalRiders] = await Promise.all([
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

    return { data: technicalRider, totalTechnicalRiders };
  }
}
