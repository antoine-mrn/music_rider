import { Prisma } from '@prisma/client';
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

export const bandDetailSelect = {
  id: true,
  label: true,
  musicStyle: {
    select: {
      id: true,
      label: true,
    },
  },
  bandContacts: {
    select: {
      isPrimary: true,
      firstname: true,
      lastname: true,
    },
  },
  memberships: {
    select: {
      role: true,
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
        },
      },
      userBandInstruments: {
        select: {
          instrument: {
            select: {
              id: true,
              label: true,
            },
          },
        },
      },
    },
  },
  technicalRiders: {
    select: {
      id: true,
      title: true,
      updatedAt: true,
      riderCategory: {
        select: {
          id: true,
          label: true,
        },
      },
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BandSelect;

export type BandDetailRaw = Prisma.BandGetPayload<{
  select: typeof bandDetailSelect;
}>;

export interface BandDetail {
  id: number;
  label: string;
  musicStyle: {
    id: number;
    label: string;
  } | null;
  members: {
    id: number;
    firstname: string;
    lastname: string;
    role: BAND_ROLE;
    instruments: {
      id: number;
      label: string;
    }[];
  }[];
  bandContacts: {
    isPrimary: boolean;
    firstname: string | null;
    lastname: string | null;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
