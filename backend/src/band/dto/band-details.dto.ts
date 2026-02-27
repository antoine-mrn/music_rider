import { BAND_ROLE } from 'src/shared/types/band-role.enum';

export class BandDetails {
  id: number;
  label: string;
  memberCount: number;
  musicStyle: {
    id: number;
    label: string;
  } | null;
  members: {
    id: number;
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
  createdAt: Date;
  updatedAt: Date;
}
