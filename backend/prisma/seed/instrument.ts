import { PrismaClient } from '@prisma/client';

export async function seedInstruments(prisma: PrismaClient) {
  const instruments = [
    { code: 'SAMPLER', label: 'Sampler', instrumentCategoryCode: 'ELECTRONIC' },
    {
      code: 'PAD',
      label: 'Pad électronique',
      instrumentCategoryCode: 'ELECTRONIC',
    },

    { code: 'FLUTE', label: 'Flûte', instrumentCategoryCode: 'WOODWIND' },
    {
      code: 'SAXOPHONE',
      label: 'Saxophone',
      instrumentCategoryCode: 'WOODWIND',
    },

    { code: 'TRUMPET', label: 'Trompette', instrumentCategoryCode: 'BRASS' },

    {
      code: 'LEAD_VOCALS',
      label: 'Chant principal',
      instrumentCategoryCode: 'VOCALS',
    },

    { code: 'SYNTH', label: 'Synthétiseur', instrumentCategoryCode: 'KEYS' },
    { code: 'PIANO', label: 'Piano', instrumentCategoryCode: 'KEYS' },
    { code: 'KEYBOARD', label: 'Clavier', instrumentCategoryCode: 'KEYS' },

    { code: 'CONGAS', label: 'Congas', instrumentCategoryCode: 'PERCUSSION' },
    { code: 'CAJON', label: 'Cajón', instrumentCategoryCode: 'PERCUSSION' },
    { code: 'DRUMS', label: 'Batterie', instrumentCategoryCode: 'PERCUSSION' },

    { code: 'BASS', label: 'Basse', instrumentCategoryCode: 'STRINGS' },
    {
      code: 'ACOUSTIC_GUITAR',
      label: 'Guitare acoustique',
      instrumentCategoryCode: 'STRINGS',
    },
    {
      code: 'ELECTRIC_GUITAR',
      label: 'Guitare électrique',
      instrumentCategoryCode: 'STRINGS',
    },
    { code: 'GUITAR', label: 'Guitare', instrumentCategoryCode: 'STRINGS' },
  ];

  for (const instrument of instruments) {
    const category = await prisma.instrumentCategory.findUnique({
      where: { code: instrument.instrumentCategoryCode },
    });

    if (!category) {
      throw new Error(
        `Category ${instrument.instrumentCategoryCode} not found`,
      );
    }

    await prisma.instrument.upsert({
      where: { code: instrument.code },
      update: {},
      create: {
        code: instrument.code,
        label: instrument.label,
        isActive: true,
        instrumentCategoryId: category.id,
      },
    });
  }

  console.log('Instrument seed done ✅');
}
