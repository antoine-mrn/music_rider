import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { TechnicalRiderService } from './technical-rider.service';
import type { AuthRequest } from 'src/shared/types/request-with-user';
import { SummaryTechnicalRider } from './types/technical-rider.types';
import { CreateTechnicalRiderDto } from './dto/create-technical-rider.dto';
import { UpdateGenetalDto } from './dto/update-general.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { EditTechnicalRiderStageDto } from './dto/edit-technical-rider-stage-dimensions.dto';

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

  @Post()
  async createTechnicalRider(
    @Body() createTechnicalRider: CreateTechnicalRiderDto,
  ) {
    return await this.technicalRiderService.createTechnicalRider(
      createTechnicalRider,
    );
  }

  // General
  // @Get(':riderId/general')
  // async findTechnicalRiderGeneral(
  //   @Param('riderId') riderId: string,
  // ): Promise<MappedTechnicalRiderGeneral> {
  //   return await this.technicalRiderService.findTechnicalRiderGeneral(riderId);
  // }
  @Get(':riderId/general/timing')
  findTechnicalRiderTiming(@Param('riderId') riderId: string) {
    return this.technicalRiderService.findTechnicalRiderTiming(riderId);
  }

  @Patch(':riderId/general')
  async updateGeneralInfo(
    @Param('riderId') riderId: string,
    @Body() dto: UpdateGenetalDto,
  ) {
    return await this.technicalRiderService.updateGeneralInfo(riderId, dto);
  }

  // Staff
  @Get(':riderId/general/staff')
  findTechnicalRiderStaff(@Param('riderId') riderId: string) {
    return this.technicalRiderService.findTechnicalRiderStaff(riderId);
  }

  @Put(':riderId/staff')
  async updateStaff(
    @Param('riderId') riderId: string,
    @Body() dto: UpdateStaffDto,
  ) {
    return await this.technicalRiderService.updateStaff(riderId, dto);
  }

  // Band
  @Get(':riderId/general/band')
  findTechnicalRiderMeta(@Param('riderId') riderId: string) {
    return this.technicalRiderService.findTechnicalRiderBand(riderId);
  }

  // Stage dimensions
  @Get(':riderId/stage/dimensions')
  findTechnicalRiderStageDimensions(@Param('riderId') riderId: string) {
    return this.technicalRiderService.findTechnicalRiderStageDimensions(
      riderId,
    );
  }

  @Patch(':riderId/stage/dimensions')
  async upsertStageDimensions(
    @Param('riderId') riderId: string,
    @Body() body: EditTechnicalRiderStageDto,
  ) {
    return this.technicalRiderService.upsertTechnicalRiderStageDimensions(
      riderId,
      body,
    );
  }
}
