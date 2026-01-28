import { Prisma } from '@prisma/client';

export const summaryTechnicalRiderSelect = {
  id: true,
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
  updatedAt: true,
} as const;

export type SummaryTechnicalRider = Prisma.TechnicalRiderGetPayload<{
  select: typeof summaryTechnicalRiderSelect;
}>;
