import { BAND_ROLE } from 'src/shared/types/band-role.enum';

export interface SummaryBandRaw {
  id: number;
  label: string;
  musicStyle: {
    id: number;
    label: string;
  } | null;
  memberships: {
    role: keyof typeof BAND_ROLE;
  }[];
}

export interface SummaryBand {
  id: number;
  label: string;
  musicStyle: {
    id: number;
    label: string;
  } | null;
  userRole: BAND_ROLE;
}
