import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateGenetalDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  musicianNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  setDuration?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  soundcheckDuration?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  setupDuration?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  teardownDuration?: number;
}
