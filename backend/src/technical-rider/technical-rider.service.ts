import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  MappedTechnicalRiderBand,
  MappedTechnicalRiderStaff,
  SummaryTechnicalRider,
  summaryTechnicalRiderSelect,
  technicalRiderBandSelect,
  technicalRiderStaffSelect,
  TechnicalRiderTiming,
  technicalRiderTimingSelect,
  UpdatedGeneralInfo,
} from './types/technical-rider.types';
import { CreateTechnicalRiderDto } from './dto/create-technical-rider.dto';
import { getContactField } from 'src/utils/getContactField';
import { UpdateGenetalDto } from './dto/update-general.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { TechnicalStaffRole } from '@prisma/client';

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

  //   async findTechnicalRiderGeneral(
  //     id: string,
  //   ): Promise<MappedTechnicalRiderGeneral> {
  //     const technicalRiderGeneral =
  //       await this.prismaService.technicalRider.findUnique({
  //         where: { id },
  //         select: technicalRiderGeneralSelect,
  //       });
  //
  //     if (!technicalRiderGeneral) throw new NotFoundException();
  //
  //     return this.__mapTechnicalRiderGeneral(technicalRiderGeneral);
  //   }

  // General / timing

  async findTechnicalRiderTiming(
    id: string,
  ): Promise<TechnicalRiderTiming['technicalRiderGeneral']> {
    const result = await this.prismaService.technicalRider.findUnique({
      where: { id },
      select: technicalRiderTimingSelect,
    });

    if (!result) throw new NotFoundException();

    return result.technicalRiderGeneral;
  }

  async updateGeneralInfo(
    technicalRiderId: string,
    dto: UpdateGenetalDto,
  ): Promise<UpdatedGeneralInfo> {
    return await this.prismaService.technicalRiderGeneral.update({
      where: { technicalRiderId },
      data: dto,
      select: {
        musicianNumber: true,
        setDuration: true,
        soundcheckDuration: true,
        setupDuration: true,
        teardownDuration: true,
      },
    });
  }

  // Staff

  async findTechnicalRiderStaff(
    id: string,
  ): Promise<MappedTechnicalRiderStaff> {
    const result = await this.prismaService.technicalRider.findUnique({
      where: { id },
      select: technicalRiderStaffSelect,
    });

    if (!result) throw new NotFoundException();

    return {
      sound_engineers: result.TechnicalRiderStaff.filter(
        (s) => s.role === 'SOUND_ENGINEER',
      ).map(({ role, ...rest }) => rest),
      light_engineers: result.TechnicalRiderStaff.filter(
        (s) => s.role === 'LIGHT_ENGINEER',
      ).map(({ role, ...rest }) => rest),
    };
  }

  async updateStaff(riderId: string, dto: UpdateStaffDto) {
    return await this.prismaService.$transaction(async (tx) => {
      const existing = await tx.technicalRiderStaff.findMany({
        where: { technicalRiderId: riderId },
        select: { id: true },
      });

      const existingIds = existing.map((s) => s.id);

      const incoming = [
        ...dto.sound_engineers.map((s) => ({
          ...s,
          role: TechnicalStaffRole.SOUND_ENGINEER,
        })),
        ...dto.light_engineers.map((s) => ({
          ...s,
          role: TechnicalStaffRole.LIGHT_ENGINEER,
        })),
      ];

      const incomingIds = incoming.filter((s) => s.dbId).map((s) => s.dbId);

      const toDelete = existingIds.filter(
        (dbId) => !incomingIds.includes(dbId),
      );
      if (toDelete.length > 0) {
        await tx.technicalRiderStaff.deleteMany({
          where: { id: { in: toDelete } },
        });
      }

      await Promise.all(
        incoming.map((member) =>
          tx.technicalRiderStaff.upsert({
            where: { id: member.dbId ?? 0 },
            update: {
              firstname: member.firstname,
              lastname: member.lastname,
              email: member.email,
              phone: member.phone,
              role: member.role,
            },
            create: {
              technicalRiderId: riderId,
              firstname: member.firstname,
              lastname: member.lastname,
              email: member.email,
              phone: member.phone,
              role: member.role,
            },
          }),
        ),
      );
    });
  }

  // Band

  async findTechnicalRiderBand(id: string): Promise<MappedTechnicalRiderBand> {
    const result = await this.prismaService.technicalRider.findUnique({
      where: { id },
      select: technicalRiderBandSelect,
    });

    if (!result) throw new NotFoundException();

    return {
      ...result,
      bandContact: result.bandContact
        ? {
            firstname: getContactField(result.bandContact, 'firstname'),
            lastname: getContactField(result.bandContact, 'lastname'),
            email: getContactField(result.bandContact, 'email'),
            phone: getContactField(result.bandContact, 'phone'),
            contactRole: result.bandContact.contactRole ?? null,
          }
        : null,
    };
  }

  // __mapTechnicalRiderGeneral(
  //   riderGeneral: TechnicalRiderGeneral,
  // ): MappedTechnicalRiderGeneral {
  //   return {
  //     ...riderGeneral,
  //     TechnicalRiderStaff: {
  //       sound_engineers: riderGeneral.TechnicalRiderStaff.filter(
  //         (s) => s.role === 'SOUND_ENGINEER',
  //       ).map(({ role, ...rest }) => rest),
  //       light_engineers: riderGeneral.TechnicalRiderStaff.filter(
  //         (s) => s.role === 'LIGHT_ENGINEER',
  //       ).map(({ role, ...rest }) => rest),
  //     },
  //     bandContact: riderGeneral.bandContact
  //       ? {
  //           firstname: getContactField(riderGeneral.bandContact, 'firstname'),
  //           lastname: getContactField(riderGeneral.bandContact, 'lastname'),
  //           email: getContactField(riderGeneral.bandContact, 'email'),
  //           phone: getContactField(riderGeneral.bandContact, 'phone'),
  //           contactRole: riderGeneral.bandContact.contactRole ?? null,
  //         }
  //       : null,
  //   };
  // }
}
