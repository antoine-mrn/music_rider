import { Controller, Get, Request } from '@nestjs/common';
import { TechnicalRiderService } from './technical-rider.service';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { SummaryTechnicalRider } from './types/technical-rider.types';

@Controller('technical-rider')
export class TechnicalRiderController {
  constructor(private readonly technicalRiderService: TechnicalRiderService) {}

  @Get()
  async findAllTechnicalRiderByUserID(
    @Request() req: AuthRequest,
  ): Promise<SummaryTechnicalRider[]> {
    return this.technicalRiderService.findAllTechnicalRiderByUserID(
      req.user.sub,
    );
  }
}
