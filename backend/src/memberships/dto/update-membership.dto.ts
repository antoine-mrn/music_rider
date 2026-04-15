import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMembershipDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstname?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastname?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  instrumentId: number[];

  @IsOptional()
  @IsUUID()
  memberId?: string;
}
