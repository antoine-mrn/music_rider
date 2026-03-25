import { PrismaClient } from '@prisma/client';

export async function seedInstrumentCategories(prisma: PrismaClient) {
  const instrumentCategories = [
    { code: 'STRINGS', label: 'Cordes' },
    { code: 'PERCUSSION', label: 'Percussions' },
    { code: 'KEYS', label: 'Claviers' },
    { code: 'VOCALS', label: 'Chant' },
    { code: 'BRASS', label: 'Cuivres' },
    { code: 'WOODWIND', label: 'Bois' },
    { code: 'ELECTRONIC', label: 'Électronique' },
    { code: 'OTHER', label: 'Autre' },
  ];

  for (const type of instrumentCategories) {
    await prisma.instrumentCategory.upsert({
      where: { code: type.code },
      update: {},
      create: { ...type, isActive: true },
    });
  }

  console.log('InstrumentCategories seed done ✅');
}
