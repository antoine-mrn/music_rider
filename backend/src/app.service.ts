import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Instrument,
  User,
  InstrumentCategory,
  Prisma,
} from './generated/prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
