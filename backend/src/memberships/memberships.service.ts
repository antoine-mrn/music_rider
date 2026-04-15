import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ContactRole } from '@prisma/client';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMembership(
    bandId: string,
    body: CreateMembershipDto,
  ): Promise<{ bandId: string }> {
    let userId: string | undefined;

    if (body.mode === 'account') {
      const user = await this.prismaService.user.findUnique({
        where: { email: body.email },
      });

      if (!user) {
        throw new NotFoundException(
          `Aucun compte trouvé pour l'adresse ${body.email}`,
        );
      }

      userId = user.id;
    }

    const isCustom = body.mode === 'custom';

    await this.prismaService.userBand.create({
      data: {
        bandId,
        userId: userId ?? null,
        firstname: isCustom ? body.firstname : null,
        lastname: isCustom ? body.lastname : null,
        userBandInstruments: {
          create: body.instrumentId.map((id) => ({ instrumentId: id })),
        },
        bandContact: {
          create: {
            bandId,
            userId: userId ?? null,
            firstname: isCustom ? body.firstname : null,
            lastname: isCustom ? body.lastname : null,
            contactRole: ContactRole.MEMBER,
            isPrimary: false,
          },
        },
      },
    });

    return { bandId };
  }

  async updateMembership(
    membershipId: number,
    body: UpdateMembershipDto,
  ): Promise<void> {
    console.log(
      '🚀 ~ MembershipsService ~ updateMembership ~ membershipId:',
      membershipId,
      body,
    );
    const { memberId, firstname, lastname, instrumentId } = body;

    await this.prismaService.userBand.update({
      where: { id: membershipId },
      data: {
        userBandInstruments: {
          deleteMany: {},
          create: instrumentId.map((id) => ({ instrumentId: id })),
        },
        ...(!memberId && {
          firstname,
          lastname,
          bandContact: {
            update: { firstname, lastname },
          },
        }),
      },
    });
  }
}
