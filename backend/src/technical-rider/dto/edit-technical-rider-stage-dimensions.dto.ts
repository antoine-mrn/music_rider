import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class EditTechnicalRiderStageDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  stageLength?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  stageWidth?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  stageDepth?: number;

  @IsOptional()
  @IsString()
  stageAccess?: string;

  @IsOptional()
  @IsString()
  backlineProvided?: string;
}
