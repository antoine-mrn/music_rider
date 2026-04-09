import { BAND_ROLE } from 'src/shared/types/band-role.enum';
import { SummaryTechnicalRider } from 'src/technical-rider/types/technical-rider.types';

export class BandDetails {
  id: string;
  label: string;
  memberCount: number;
  musicStyle: {
    id: number;
    label: string;
  } | null;
  members: {
    membershipId: number;
    id: string | null;
    firstname: string;
    lastname: string;
    role: BAND_ROLE;
    avatarUrl: string | null;
    instruments: {
      id: number;
      label: string;
    }[];
  }[];
  primaryContact: {
    isPrimary: boolean;
    firstname: string;
    lastname: string;
    email: string | null;
    phone: string | null;
    contactRole: string;
  } | null;
  bandContacts: {
    isPrimary: boolean;
    firstname: string;
    lastname: string;
    email: string | null;
    phone: string | null;
    contactRole: string;
  }[];
  technicalRiders: SummaryTechnicalRider[];
  createdAt: Date;
  updatedAt: Date;
}
