import { PrismaClient } from '@prisma/client';

export async function seedMusicStyles(prisma: PrismaClient) {
  const styles = [
    'Rock',
    'Hard Rock',
    'Metal',
    'Metalcore',
    'Métal électro',
    'Post-metal',
    'Progressive Metal',
    'Punk Rock',
    'Indie Rock',
    'Alternative Metal',
  ];

  for (const label of styles) {
    await prisma.musicStyle.upsert({
      where: { label },
      update: {},
      create: {
        label,
      },
    });
  }

  console.log('Music styles seed done ✅');
}
