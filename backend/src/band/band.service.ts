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

@Injectable()
export class BandService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSummaryBandsByUserId(
    id: number,
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

  async findBandDetailById(bandId: number): Promise<BandDetails> {
    const band = await this.prismaService.band.findUnique({
      where: { id: bandId },
      select: bandDetailSelect,
    });

    if (!band) throw new NotFoundException();

    return this.__mapBandDetails(band);
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
        id: member.user.id,
        firstname: member.user.firstname,
        lastname: member.user.lastname,
        role: BAND_ROLE[member.role],
        instruments: member.userBandInstruments.map(({ instrument }) => ({
          id: instrument.id,
          label: instrument.label,
        })),
      })),
      bandContacts: band.bandContacts.map((contact) => ({
        isPrimary: contact.isPrimary,
        firstname: contact.firstname ?? null,
        lastname: contact.lastname ?? null,
      })),
      createdAt: band.createdAt,
      updatedAt: band.updatedAt,
    };
  }
}
