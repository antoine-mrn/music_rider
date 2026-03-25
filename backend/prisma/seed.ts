import { Pool } from 'pg';
import { seedInstrumentCategories } from './seed/instrumentCategories';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { seedInstruments } from './seed/instrument';
import { seedMusicStyles } from './seed/musicStyles';
import { seedRiderCategories } from './seed/riderCategory';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await seedInstrumentCategories(prisma);
  await seedInstruments(prisma);
  await seedMusicStyles(prisma);
  await seedRiderCategories(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
