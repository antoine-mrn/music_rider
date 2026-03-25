import { Prisma } from '@prisma/client';

export interface CurrentUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export const currentUserSelect = {
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

export type CurrentUserEntity = Prisma.UserGetPayload<{
  select: typeof currentUserSelect;
}>;
