import { Controller, Get } from '@nestjs/common';
import { InstrumentService } from './instrument.service';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get()
  async findAllInstrument(): Promise<{ id: number; label: string }[]> {
    return await this.instrumentService.findAllInstrument();
  }

  @Get('instruments-catalog')
  async findAllInstrumentsWithCategories() {
    return await this.instrumentService.findAllInstrumentsWithCategories();
  }
}
