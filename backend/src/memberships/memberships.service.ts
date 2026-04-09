import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMembership(
    bandId: string,
    body: CreateMembershipDto,
  ): Promise<{ bandId: string }> {
    return this.prismaService.$transaction(async (tx) => {
      let userId: string | undefined;

      if (body.mode === 'account') {
        const user = await tx.user.findUnique({
          where: { email: body.email },
        });

        if (!user) {
          throw new NotFoundException(
            `Aucun compte trouvé pour l'adresse ${body.email}`,
          );
        }

        userId = user.id;
      }

      const membership = await tx.userBand.create({
        data: {
          bandId,
          userId,
          firstname: body.mode === 'custom' ? body.firstname : null,
          lastname: body.mode === 'custom' ? body.lastname : null,
          userBandInstruments: {
            create: body.instrumentId.map((id) => ({ instrumentId: id })),
          },
        },
      });

      await tx.bandContact.create({
        data: {
          bandId,
          userId,
          firstname: body.mode === 'custom' ? body.firstname : null,
          lastname: body.mode === 'custom' ? body.lastname : null,
          contactRole: 'MEMBER',
          isPrimary: false,
        },
      });

      return { bandId };
    });
  }

  async updateMembership(body: UpdateMembershipDto): Promise<void> {
    const { membershipId, memberId, firstname, lastname, instrumentId } = body;

    const updatedData = memberId
      ? { instrumentId }
      : { firstname, lastname, instrumentId };

    await this.prismaService.userBand.update({
      where: { id: membershipId },
      data: updatedData,
    });
  }
}
