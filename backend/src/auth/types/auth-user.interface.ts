// export interface AuthUser {
//   id: number;
//   email: string;
//   firstname: string;
//   lastname: string;
// }

import { Prisma } from '@prisma/client';

export const AuthUserSelect = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
};

export type AuthUser = Prisma.UserGetPayload<{ select: typeof AuthUserSelect }>;
