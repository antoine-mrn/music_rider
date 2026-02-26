import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandController } from './band.controller';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [MediaModule],
  controllers: [BandController],
  providers: [BandService],
  exports: [BandService],
})
export class BandModule {}
