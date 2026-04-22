import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  MappedTechnicalRiderGeneral,
  SummaryTechnicalRider,
  summaryTechnicalRiderSelect,
  TechnicalRiderGeneral,
  technicalRiderGeneralSelect,
} from './types/technical-rider.types';
import { CreateTechnicalRiderDto } from './dto/create-technical-rider.dto';
import { getContactField } from 'src/utils/getContactField';

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
        bandContacts: {
          where: { isPrimary: true },
          select: { id: true },
        },
      },
    });

    if (!band) {
      throw new NotFoundException(`Band ${data.bandId} not found`);
    }

    const primaryContactId = band.bandContacts[0]?.id ?? null;

    return await this.prismaService.technicalRider.create({
      data: {
        title: data.title,
        riderCategoryId: data.riderCategoryId,
        bandId: data.bandId,
        bandContactId: primaryContactId,
        technicalRiderGeneral: {
          create: {
            musicianNumber: band._count.memberships,
          },
        },
      },
    });
  }

  async findTechnicalRiderGeneral(
    id: string,
  ): Promise<MappedTechnicalRiderGeneral> {
    const technicalRiderGeneral =
      await this.prismaService.technicalRider.findUnique({
        where: { id },
        select: technicalRiderGeneralSelect,
      });

    if (!technicalRiderGeneral) throw new NotFoundException();

    return this.__mapTechnicalRiderGeneral(technicalRiderGeneral);
  }

  __mapTechnicalRiderGeneral(
    riderGeneral: TechnicalRiderGeneral,
  ): MappedTechnicalRiderGeneral {
    return {
      ...riderGeneral,
      bandContact: riderGeneral.bandContact
        ? {
            firstname: getContactField(riderGeneral.bandContact, 'firstname'),
            lastname: getContactField(riderGeneral.bandContact, 'lastname'),
            email: getContactField(riderGeneral.bandContact, 'email'),
            phone: getContactField(riderGeneral.bandContact, 'phone'),
            contactRole: riderGeneral.bandContact.contactRole ?? null,
          }
        : null,
    };
  }
}
