import { PrismaClient } from '@prisma/client';

export async function seedRiderCategories(prisma: PrismaClient) {
  const categories = ['Festival', 'Salle de concert', 'Bar', 'Club', 'Théâtre'];

  for (const label of categories) {
    await prisma.riderCategory.upsert({
      where: { label },
      update: {},
      create: {
        label,
      },
    });
  }

  console.log('Rider categories seed done ✅');
}
