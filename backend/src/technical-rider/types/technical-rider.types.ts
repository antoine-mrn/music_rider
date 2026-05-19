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

// Timing

export const technicalRiderTimingSelect = {
  technicalRiderGeneral: {
    select: {
      musicianNumber: true,
      setDuration: true,
      soundcheckDuration: true,
      setupDuration: true,
      teardownDuration: true,
    },
  },
} satisfies Prisma.TechnicalRiderSelect;

export type TechnicalRiderTiming = Prisma.TechnicalRiderGetPayload<{
  select: typeof technicalRiderTimingSelect;
}>;

export type UpdatedGeneralInfo = Prisma.TechnicalRiderGeneralGetPayload<{
  select: typeof technicalRiderTimingSelect.technicalRiderGeneral.select;
}>;

// Staff

export const technicalRiderStaffSelect = {
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
} satisfies Prisma.TechnicalRiderSelect;

export type TechnicalRiderStaffRaw = Prisma.TechnicalRiderGetPayload<{
  select: typeof technicalRiderStaffSelect;
}>;

type StaffMember = Omit<
  TechnicalRiderStaffRaw['TechnicalRiderStaff'][number],
  'role'
>;

export type MappedTechnicalRiderStaff = {
  sound_engineers: StaffMember[];
  light_engineers: StaffMember[];
};

// Band

const bandContactSelect = {
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
} as const;

export const technicalRiderBandSelect = {
  band: {
    select: {
      id: true,
      label: true,
    },
  },
  bandContact: bandContactSelect,
} satisfies Prisma.TechnicalRiderSelect;

export type TechnicalRiderBand = Prisma.TechnicalRiderGetPayload<{
  select: typeof technicalRiderBandSelect;
}>;

export type MappedTechnicalRiderBand = Omit<
  TechnicalRiderBand,
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

// Old version

// export const technicalRiderGeneralSelect = {
//   technicalRiderGeneral: {
//     select: {
//       musicianNumber: true,
//       setDuration: true,
//       soundcheckDuration: true,
//       setupDuration: true,
//       teardownDuration: true,
//     },
//   },
//   bandContact: {
//     select: {
//       id: true,
//       firstname: true,
//       lastname: true,
//       email: true,
//       phone: true,
//       contactRole: true,
//       userBand: {
//         select: {
//           user: {
//             select: {
//               firstname: true,
//               lastname: true,
//               email: true,
//               phone: true,
//               role: true,
//             },
//           },
//         },
//       },
//     },
//   },
//   TechnicalRiderStaff: {
//     select: {
//       id: true,
//       firstname: true,
//       lastname: true,
//       email: true,
//       phone: true,
//       role: true,
//     },
//   },
//   band: {
//     select: {
//       id: true,
//       label: true,
//     },
//   },
// } satisfies Prisma.TechnicalRiderSelect;
//
// export type TechnicalRiderGeneral = Prisma.TechnicalRiderGetPayload<{
//   select: typeof technicalRiderGeneralSelect;
// }>;
//
// export type MappedTechnicalRiderGeneral = Omit<
//   TechnicalRiderGeneral,
//   'bandContact' | 'TechnicalRiderStaff'
// > & {
//   TechnicalRiderStaff: {
//     sound_engineers: StaffMember[];
//     light_engineers: StaffMember[];
//   };
//   bandContact: {
//     firstname: string;
//     lastname: string;
//     email: string;
//     phone: string;
//     contactRole: ContactRole | null;
//   } | null;
// };
