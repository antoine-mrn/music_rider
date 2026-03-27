import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Trim } from 'src/shared/decorators/trim.decorators';

export class CreateUserDto {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstname: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastname: string;

  @Trim()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
