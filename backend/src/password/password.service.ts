import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ARGON2_OPTIONS } from './password.config';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return await argon.hash(password, ARGON2_OPTIONS);
  }

  async verifyPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await argon.verify(hashPassword, password);
  }
}
