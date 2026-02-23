import { CurrentUserDto } from 'src/user/dto/current-user.dto';
import { TokensDto } from '../dto/tokens.dto';

export interface AuthResult extends TokensDto {
  user: CurrentUserDto;
}
