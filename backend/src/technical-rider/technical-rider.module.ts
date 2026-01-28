import { Module } from '@nestjs/common';
import { TechnicalRiderService } from './technical-rider.service';
import { TechnicalRiderController } from './technical-rider.controller';

@Module({
  controllers: [TechnicalRiderController],
  providers: [TechnicalRiderService],
  exports: [TechnicalRiderService],
})
export class TechnicalRiderModule {}
