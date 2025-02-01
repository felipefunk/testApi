import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.funnel.createMany({
    data: [{ name: 'UNDER_NEGOTIATION' }, { name: 'LOST' }, { name: 'WIN' }],
    skipDuplicates: true,
  });

  console.log('Seed finalizado!');
}

main()
  .catch((e) => {
    console.error('Erro:', e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
