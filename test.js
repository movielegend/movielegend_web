const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("USERS:", users);
  const customers = await prisma.customer.findMany();
  console.log("CUSTOMERS:", customers);
}

main().finally(() => prisma.$disconnect());
