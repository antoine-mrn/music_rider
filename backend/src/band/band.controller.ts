import { Controller, Get, Query, Request } from '@nestjs/common';
import { BandService } from './band.service';
import type { AuthRequest } from 'src/shared/types/request-with-user';

@Controller('band')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get('bands-summary')
  async getBandsSummary(
    @Request() req: AuthRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log(req.user, page, limit);
    return;
  }
}
