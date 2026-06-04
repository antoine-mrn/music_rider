import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { BAND_ROLE } from 'src/shared/types/band-role.enum';
import { getPaginationMeta } from 'src/utils/pagination';
import {
  BandDetailRaw,
  bandDetailSelect,
  SummaryBand,
  SummaryBandRaw,
} from './types/band.types';
import { BandDetails } from './dto/band-details.dto';
import { MediaService } from 'src/media/media.service';
import { CreateBandDto } from './dto/create-band.dto';
import { getContactField } from 'src/utils/getContactField';

@Injectable()
export class BandService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mediaService: MediaService,
  ) {}

  async createBand(
    data: CreateBandDto,
    userId: string,
  ): Promise<{ id: string }> {
    return await this.prismaService.$transaction(async (tx) => {
      const band = await tx.band.create({
        data: {
          label: data.label,
          musicStyleId: data.styleId,
        },
        select: { id: true },
      });

      const userBand = await tx.userBand.create({
        data: {
          userId,
          bandId: band.id,
          role: 'LEADER',
        },
      });

      await tx.bandContact.create({
        data: {
          bandId: band.id,
          userBandId: userBand.id,
          contactRole: 'MEMBER',
          isPrimary: true,
        },
      });

      return band;
    });
  }

  async findSummaryBandsByUserId(
    id: string,
    page: number = 1,
    limit: number = 6,
  ): Promise<PaginationResult<SummaryBand>> {
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
        select: {
          id: true,
          label: true,
          musicStyle: {
            select: {
              id: true,
              label: true,
            },
          },
          memberships: {
            select: { role: true },
            where: { userId: id },
          },
        },
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
    const mapData = this.__mapSummaryBand(bands);

    return { data: mapData, meta };
  }

  async findBandDetailById(bandId: string): Promise<BandDetails> {
    const band = await this.prismaService.band.findUnique({
      where: { id: bandId },
      select: bandDetailSelect,
    });

    if (!band) throw new NotFoundException();

    return this.__mapBandDetails(band);
  }

  async findAllMyBands(
    userId: string,
  ): Promise<{ id: string; label: string }[]> {
    return await this.prismaService.band.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        label: true,
      },
    });
  }

  __mapSummaryBand(bands: SummaryBandRaw[]): SummaryBand[] {
    return bands.map((band: SummaryBandRaw) => ({
      id: band.id,
      label: band.label,
      musicStyle: band.musicStyle
        ? { id: band.musicStyle.id, label: band.musicStyle.label }
        : null,
      userRole: BAND_ROLE[band.memberships[0].role],
    }));
  }

  __mapBandDetails(band: BandDetailRaw): BandDetails {
    const primaryContact = band.bandContacts.find((c) => c.isPrimary);

    return {
      id: band.id,
      label: band.label,
      memberCount: band.memberships.length,
      musicStyle: band.musicStyle
        ? {
            id: band.musicStyle.id,
            label: band.musicStyle.label,
          }
        : null,
      members: band.memberships.map((member) => ({
        membershipId: member.id,
        id: member.user?.id ?? null,
        firstname: member.user?.firstname ?? member.firstname ?? '',
        lastname: member.user?.lastname ?? member.lastname ?? '',
        role: BAND_ROLE[member.role],
        avatarUrl: member.user?.avatar
          ? this.mediaService.getPublicUrl(
              member.user.avatar.bucket,
              member.user.avatar.path,
            )
          : null,
        instruments: member.userBandInstruments.map(({ instrument }) => ({
          id: instrument.id,
          label: instrument.label,
        })),
      })),
      primaryContact: primaryContact
        ? {
            isPrimary: primaryContact.isPrimary,
            firstname: getContactField(primaryContact, 'firstname'),
            lastname: getContactField(primaryContact, 'lastname'),
            email: getContactField(primaryContact, 'email'),
            phone: getContactField(primaryContact, 'phone'),
            contactRole: primaryContact.contactRole ?? null,
          }
        : null,
      bandContacts: band.bandContacts
        .filter((c) => c.isPrimary !== true)
        .map((contact) => ({
          isPrimary: contact.isPrimary,
          firstname: getContactField(contact, 'firstname'),
          lastname: getContactField(contact, 'lastname'),
          email: getContactField(contact, 'email'),
          phone: getContactField(contact, 'phone'),
          contactRole: contact.contactRole ?? null,
        })),
      technicalRiders: band.technicalRiders.map((rider) => ({
        id: rider.id,
        title: rider.title,
        status: rider.status,
        band: {
          id: rider.band.id,
          label: rider.band.label,
        },
        riderCategory: {
          id: rider.riderCategory.id,
          label: rider.riderCategory.label,
        },
        updatedAt: rider.updatedAt,
      })),
      createdAt: band.createdAt,
      updatedAt: band.updatedAt,
    };
  }
}
