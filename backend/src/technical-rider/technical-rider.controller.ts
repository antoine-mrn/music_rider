import { Controller } from '@nestjs/common';
import { TechnicalRiderService } from './technical-rider.service';

@Controller('technical-rider')
export class TechnicalRiderController {
  constructor(private readonly technicalRiderService: TechnicalRiderService) {}
}
