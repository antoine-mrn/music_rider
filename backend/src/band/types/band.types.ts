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
      email: true,
      phone: true,
      contactRole: { select: { id: true, label: true } },
      user: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
          phone: true,
        },
      },
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
          avatar: { select: { bucket: true, path: true } },
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
      band: {
        select: {
          id: true,
          label: true,
        },
      },
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
