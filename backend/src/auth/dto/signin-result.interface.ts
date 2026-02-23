import { MeResponseDto } from './me-response-dto';
import { TokensDto } from './tokens.dto';

export interface SigninResult extends TokensDto {
  user: MeResponseDto;
}
