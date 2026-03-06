import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { BandService } from './band.service';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { SummaryBand } from './types/band.types';
import { BandDetails } from './dto/band-details.dto';
import { CreateBandDto } from './dto/create-band.dto';
import { create } from 'domain';

@Controller('band')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Post()
  async createBand(@Body() createBand: CreateBandDto) {
    //TODO : ajouter le créateur du groupe dans la liste des membres
    return await this.bandService.createBand(createBand);
  }

  @Get('bands-summary')
  async getBandsSummary(
    @Request() req: AuthRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PaginationResult<SummaryBand>> {
    return await this.bandService.findSummaryBandsByUserId(
      req.user.sub,
      page,
      limit,
    );
  }

  @Get(':bandId')
  async findBandDetailById(
    @Param('bandId', ParseIntPipe) bandId: number,
  ): Promise<BandDetails> {
    return await this.bandService.findBandDetailById(bandId);
  }
}
