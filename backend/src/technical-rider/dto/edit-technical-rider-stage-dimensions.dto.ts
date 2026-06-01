import { IsOptional, IsInt, Min, IsString, ValidateIf } from 'class-validator';

export class EditTechnicalRiderStageDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @ValidateIf((o) => o.stageLength !== null)
  stageLength?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ValidateIf((o) => o.stageWidth !== null)
  stageWidth?: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ValidateIf((o) => o.stageDepth !== null)
  stageDepth?: number | null;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.stageAccess !== null)
  stageAccess?: string | null;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.stageLength !== null)
  backlineProvided?: string | null;
}
