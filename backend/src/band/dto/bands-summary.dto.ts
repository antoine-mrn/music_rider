import { IsInt, IsOptional } from 'class-validator';

export class BandsSummaryDto {
  @IsOptional()
  @IsInt()
  page: number;

  @IsOptional()
  @IsInt()
  limit: number;
}
