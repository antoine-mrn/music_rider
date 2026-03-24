import { Controller, Get } from '@nestjs/common';
import { RiderCategoryService } from './rider-category.service';

@Controller('rider-category')
export class RiderCategoryController {
  constructor(private readonly riderCategoryService: RiderCategoryService) {}

  @Get()
  async findAllRiderCategory(): Promise<{ id: number; label: string }[]> {
    return await this.riderCategoryService.findAllRiderCategory();
  }
}
