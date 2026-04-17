import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/shared/types/request-with-user';

@Injectable()
export class BandMemberGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const userId = request.user.sub;

    const bandId = request.params.bandId;

    if (!userId || !bandId) {
      throw new ForbiddenException();
    }

    const userBand = await this.prismaService.userBand.findUnique({
      where: {
        userId_bandId: {
          userId,
          bandId,
        },
      },
    });

    if (!userBand) {
      throw new ForbiddenException('You are not a member of this band');
    }

    return true;
  }
}
