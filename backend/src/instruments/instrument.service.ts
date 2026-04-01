import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class InstrumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllInstrument(): Promise<{ id: number; label: string }[]> {
    return await this.prismaService.instrument.findMany({
      select: {
        id: true,
        label: true,
      },
    });
  }
}
