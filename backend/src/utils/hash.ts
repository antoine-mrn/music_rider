import * as argon2 from 'argon2';

export const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 1,
};

export async function hash(data: string): Promise<string> {
  return await argon2.hash(data, ARGON2_OPTIONS);
}

export async function verify(data: string, hash: string): Promise<boolean> {
  return await argon2.verify(hash, data);
}
