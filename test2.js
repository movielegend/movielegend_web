const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.customer.create({
      data: {
        fullName: 'Khách Hàng 2',
        phone: '0900000002',
        email: 'khachhang2@example.com',
      }
    });
    console.log("Success");
  } catch (e) {
    console.error(e);
  }
}
main().finally(() => prisma.$disconnect());
