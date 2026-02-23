import { Prisma } from '@prisma/client';

export const AuthUserSelect = {
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

export type AuthUser = Prisma.UserGetPayload<{ select: typeof AuthUserSelect }>;
