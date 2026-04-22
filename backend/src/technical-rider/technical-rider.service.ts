import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { getPaginationMeta } from 'src/utils/pagination';
import {
  SummaryTechnicalRider,
  summaryTechnicalRiderSelect,
} from './types/technical-rider.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { CreateTechnicalRiderDto } from './dto/create-technical-rider.dto';

@Injectable()
export class TechnicalRiderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllTechnicalRiderByUserID(
    userId: string,
  ): Promise<SummaryTechnicalRider[]> {
    return this.prismaService.technicalRider.findMany({
      where: {
        band: {
          memberships: {
            some: {
              userId,
            },
          },
        },
      },
      select: summaryTechnicalRiderSelect,
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findSummaryTechnicalRiderByUserId(
    id: string,
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

  async createTechnicalRider(data: CreateTechnicalRiderDto) {
    const band = await this.prismaService.band.findUnique({
      where: { id: data.bandId },
      select: {
        id: true,
        _count: { select: { memberships: true } },
      },
    });

    if (!band) {
      throw new NotFoundException(`Band ${data.bandId} not found`);
    }

    return await this.prismaService.technicalRider.create({
      data: {
        title: data.title,
        riderCategoryId: data.riderCategoryId,
        bandId: data.bandId,
        technicalRiderGeneral: {
          create: {
            musicianNumber: band._count.memberships,
          },
        },
      },
    });
  }

  async findTechnicalRiderGeneral(id: string) {
    return await this.prismaService.technicalRider.findUnique({
      where: { id },
      select: {
        technicalRiderGeneral: {
          select: {
            musicianNumber: true,
            soundcheckDuration: true,
            setupDuration: true,
            teardownDuration: true,
          },
        },
        bandContact: true,
        TechnicalRiderStaff: true,
        band: {
          select: {
            id: true,
            label: true,
            bandContacts: true,
          },
        },
      },
    });
  }

  // __mapTechnicalRiderGeneral(riderGeneral: any) {
  //   return {
  //     ...riderGeneral,
  //     bandContact: {},
  //   };
  // }
}
