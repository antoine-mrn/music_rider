import { CurrentUser } from 'src/user/types/auth-user.interface';
import { TokensDto } from './tokens.dto';

export interface AuthResponseDto extends TokensDto {
  user: CurrentUser;
}
