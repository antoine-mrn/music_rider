import type { Pagination } from "../../shared/types/pagination.interface";
import type { AuthUserInterface } from "../auth/types";
import type { SummaryTechnicalRider } from "../technical-rider/types";

export interface DashboardInterface {
  user: AuthUserInterface;
  bands: Pagination<SummaryBandWithMusicStyle>;
  technicalRiders: Pagination<SummaryTechnicalRider>;
  quickOverview: {
    totalBands: number;
    totalTechnicalRiders: number;
}