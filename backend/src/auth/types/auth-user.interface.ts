import { Prisma } from '@prisma/client';

export interface AuthUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export const MeSelect = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  avatar: {
    select: {
      bucket: true,
      path: true,
    },
  },
} satisfies Prisma.UserSelect;

export type MeUser = Prisma.UserGetPayload<{ select: typeof MeSelect }>;
