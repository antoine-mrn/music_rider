import { Prisma } from '@prisma/client';

export const summaryTechnicalRiderSelect = {
  id: true,
  title: true,
  status: true,
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
} satisfies Prisma.TechnicalRiderSelect;

export type SummaryTechnicalRider = Prisma.TechnicalRiderGetPayload<{
  select: typeof summaryTechnicalRiderSelect;
}>;
