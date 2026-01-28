import { Controller } from '@nestjs/common';
import { BandService } from './band.service';

@Controller('band')
export class BandController {
  constructor(private readonly bandService: BandService) {}
}
