import { SummaryBand } from 'src/band/types/band.types';
import { PaginationResult } from 'src/shared/dto/pagination-result.dto';
import { SummaryTechnicalRider } from 'src/technical-rider/types/technical-rider.types';
import { CurrentUserDto } from './current-user.dto';

export interface DashboardDto {
  user: CurrentUserDto;
  bands: PaginationResult<SummaryBand>;
  technicalRiders: PaginationResult<SummaryTechnicalRider>;
  quickOverview: {
    totalBands: number;
    totalTechnicalRiders: number;
  };
}
