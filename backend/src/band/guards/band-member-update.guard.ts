import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthRequest } from 'src/shared/types/request-with-user';

@Injectable()
export class BandMemberUpdateGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();

    const userId = request.user.sub;
    const bandId = request.params.bandId;

    const bandUser = await this.prismaService.userBand.findUnique({
      where: { userId_bandId: { bandId, userId } },
      select: { userId: true, role: true },
    });

    if (bandUser?.role !== 'LEADER' || userId !== bandUser.userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this resource',
      );
    }

    return true;
  }
}
