import { AuthUser } from 'src/auth/types/auth-user.interface';
import { SummaryBandWithMusicStyle } from 'src/band/types/band.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { SummaryTechnicalRider } from 'src/technical-rider/types/technical-rider.types';

export interface DashboardDto {
  user: AuthUser;
  bands: PaginationResult<SummaryBandWithMusicStyle>;
  technicalRiders: PaginationResult<SummaryTechnicalRider>;
  quickOverview: {
    totalBands: number;
    totalTechnicalRiders: number;
  };
}
