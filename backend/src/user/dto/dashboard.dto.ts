import { MeResponseDto } from 'src/auth/dto/me-response-dto';
import { AuthUser } from 'src/auth/types/auth-user.interface';
import { SummaryBand } from 'src/band/types/band.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { SummaryTechnicalRider } from 'src/technical-rider/types/technical-rider.types';

export interface DashboardDto {
  user: MeResponseDto;
  bands: PaginationResult<SummaryBand>;
  technicalRiders: PaginationResult<SummaryTechnicalRider>;
  quickOverview: {
    totalBands: number;
    totalTechnicalRiders: number;
  };
}
