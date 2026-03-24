import { Module } from '@nestjs/common';
import { RiderCategoryService } from './rider-category.service';
import { RiderCategoryController } from './rider-category.controller';

@Module({
  controllers: [RiderCategoryController],
  providers: [RiderCategoryService],
})
export class RiderCategoryModule {}
