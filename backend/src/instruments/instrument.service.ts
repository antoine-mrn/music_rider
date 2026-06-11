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

  async findAllInstrumentsWithCategories() {
    return await this.prismaService.instrumentCategory.findMany({
      select: {
        id: true,
        label: true,
        code: true,
        Instruments: {
          where: { isActive: true },
          select: { id: true, code: true, label: true },
          orderBy: { label: 'asc' },
        },
      },
      where: {
        isActive: true,
        Instruments: { some: { isActive: true } },
      },
      orderBy: {
        label: 'asc',
      },
    });
  }
}
