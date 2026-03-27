import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/shared/decorators/trim.decorators';

export class CreateTechnicalRiderDto {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  riderCategoryId: number;

  @IsUUID()
  bandId: string;
}
