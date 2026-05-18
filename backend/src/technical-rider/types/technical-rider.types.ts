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
      setDuration: true,
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
  TechnicalRiderStaff: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      role: true,
    },
  },
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

export type UpdatedGeneralInfo = Prisma.TechnicalRiderGeneralGetPayload<{
  select: typeof technicalRiderGeneralSelect.technicalRiderGeneral.select;
}>;

type StaffMember = Omit<
  TechnicalRiderGeneral['TechnicalRiderStaff'][number],
  'role'
>;

export type MappedTechnicalRiderGeneral = Omit<
  TechnicalRiderGeneral,
  'bandContact' | 'TechnicalRiderStaff'
> & {
  TechnicalRiderStaff: {
    sound_engineers: StaffMember[];
    light_engineers: StaffMember[];
  };
  bandContact: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    contactRole: ContactRole | null;
  } | null;
};
