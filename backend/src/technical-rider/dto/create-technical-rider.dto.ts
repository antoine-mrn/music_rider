import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTechnicalRiderDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  riderCategoryId: number;

  @IsNotEmpty()
  @IsNumber()
  bandId: number;
}
