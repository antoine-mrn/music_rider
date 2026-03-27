import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/shared/decorators/trim.decorators';

export class CreateBandDto {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  label: string;

  @IsNotEmpty()
  @IsNumber()
  styleId: number;
}
