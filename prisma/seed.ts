import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //delete all after init
  await prisma.user.deleteMany();

  //create sample user
  const hashPassword = await bcrypt.hash('tester@123', 8);
  const user1 = await prisma.user.create({
    data: {
      username: 'tester01',
      password: hashPassword,
      address: 'Ha Noi',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'tester02',
      password: hashPassword,
      address: 'Vinh Phuc',
    },
  });

  console.log('Init data', { user1, user2 });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
