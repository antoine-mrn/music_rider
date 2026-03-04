import { Controller, Get } from '@nestjs/common';
import { StyleService } from './style.service';

@Controller('style')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @Get()
  async findAllStyles() {
    return await this.styleService.findAllStyles();
  }
}
