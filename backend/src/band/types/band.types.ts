import { Prisma } from '@prisma/client';

export const summaryBandSelect = {
  id: true,
  label: true,
  musicStyle: {
    select: {
      id: true,
      label: true,
    },
  },
} as const;

export type SummaryBandWithMusicStyle = Prisma.BandGetPayload<{
  select: typeof summaryBandSelect;
}>;
