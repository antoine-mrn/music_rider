import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Trim } from 'src/shared/decorators/trim.decorators';

export class CreateMembershipDto {
  @IsIn(['account', 'custom'])
  mode: 'account' | 'custom';

  // Mode Account
  @ValidateIf((m) => m.mode === 'account')
  @Trim()
  @IsNotEmpty({ message: 'Entrez une adresse email' })
  @IsEmail({}, { message: 'Entrez une adresse e-mail valide' })
  email?: string;

  // Mode Custom
  @ValidateIf((m) => m.mode === 'custom')
  @Trim()
  @IsNotEmpty({ message: 'Veuillez renseigner votre prénom' })
  @IsString()
  @MinLength(1, { message: 'Veuillez renseigner votre prénom' })
  @MaxLength(50, { message: 'Le prénom ne doit pas dépasser 50 caractères' })
  firstname?: string;

  @ValidateIf((m) => m.mode === 'custom')
  @Trim()
  @IsNotEmpty({ message: 'Veuillez entrer un nom' })
  @IsString()
  @MinLength(1, { message: 'Veuillez entrer un nom' })
  @MaxLength(50, { message: 'Le nom ne doit pas dépasser 50 caractères' })
  lastname?: string;

  // Commun
  @IsArray()
  @ArrayMinSize(1, { message: 'Veuillez choisir un instrument minimum' })
  @IsNumber({}, { each: true })
  instrumentId: number[];
}
