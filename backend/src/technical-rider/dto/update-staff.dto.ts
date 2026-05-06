import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  Matches,
  ValidateIf,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Trim } from 'src/shared/decorators/trim.decorators';

export class UpdateStaffDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffMember)
  sound_engineer: StaffMember[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffMember)
  light_engineer: StaffMember[];
}

class StaffMember {
  @IsOptional()
  @IsInt()
  id?: number;

  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstname: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastname: string;

  @ValidateIf((o) => !o.phone)
  @IsOptional()
  @Trim()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsOptional()
  @Matches(/^\+?[1-9]\d{6,14}$/, {
    message: 'Invalid phone number format',
  })
  phone?: string;
}
