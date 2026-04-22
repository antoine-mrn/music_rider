import { ContactRole, Prisma } from '@prisma/client';

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

export const technicalRiderGeneralSelect = {
  technicalRiderGeneral: {
    select: {
      musicianNumber: true,
      soundcheckDuration: true,
      setupDuration: true,
      teardownDuration: true,
    },
  },
  bandContact: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      contactRole: true,
      userBand: {
        select: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
              phone: true,
              role: true,
            },
          },
        },
      },
    },
  },
  TechnicalRiderStaff: true,
  band: {
    select: {
      id: true,
      label: true,
    },
  },
} satisfies Prisma.TechnicalRiderSelect;

export type TechnicalRiderGeneral = Prisma.TechnicalRiderGetPayload<{
  select: typeof technicalRiderGeneralSelect;
}>;

export type MappedTechnicalRiderGeneral = Omit<
  TechnicalRiderGeneral,
  'bandContact'
> & {
  bandContact: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    contactRole: ContactRole | null;
  } | null;
};
