import { AuthUser } from '../types/auth-user.interface';
import { TokensDto } from './tokens.dto';

export interface AuthResponDto extends TokensDto {
  user: AuthUser;
}
