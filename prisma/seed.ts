import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Roles
  const roles = ['Super Admin', 'Admin', 'Staff', 'Customer'];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });
  const staffRole = await prisma.role.findUnique({ where: { name: 'Staff' } });
  const customerRole = await prisma.role.findUnique({ where: { name: 'Customer' } });

  if (!adminRole || !staffRole || !customerRole) throw new Error("Roles not created properly");

  // 2. Users
  const users = [
    { email: 'admin@movielegend.vn', name: 'Admin', roleId: adminRole.id, passwordHash: 'hashedpassword' },
    { email: 'staff@movielegend.vn', name: 'Staff', roleId: staffRole.id, passwordHash: 'hashedpassword' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }

  // 3. Categories
  const categories = [
    { name: 'Máy Chiếu Di Động', slug: 'may-chieu-di-dong', description: 'Máy chiếu nhỏ gọn' },
    { name: 'Máy Chiếu Gia Đình', slug: 'may-chieu-gia-dinh', description: 'Máy chiếu cho gia đình' },
    { name: 'Máy Chiếu Cao Cấp', slug: 'may-chieu-cao-cap', description: 'Máy chiếu cao cấp' },
    { name: 'Phụ Kiện', slug: 'phu-kien', description: 'Phụ kiện máy chiếu' },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // 4. Brands
  const brands = [
    { name: 'BeeCube', slug: 'beecube' },
    { name: 'XGIMI', slug: 'xgimi' },
    { name: 'JMGO', slug: 'jmgo' },
    { name: 'MovieLegend', slug: 'movielegend' },
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }

  // Fetch Categories & Brands
  const catDiDong = await prisma.category.findUnique({ where: { slug: 'may-chieu-di-dong' } });
  const brandBeeCube = await prisma.brand.findUnique({ where: { slug: 'beecube' } });

  if (!catDiDong || !brandBeeCube) throw new Error("Category or Brand not created properly");

  // 5. Products (20 products)
  console.log('Seeding products...');
  for (let i = 1; i <= 20; i++) {
    const pSlug = `san-pham-mau-${i}`;
    const pSku = `SP${i.toString().padStart(3, '0')}`;
    await prisma.product.upsert({
      where: { slug: pSlug },
      update: {},
      create: {
        name: `Sản Phẩm Mẫu ${i}`,
        slug: pSlug,
        sku: pSku,
        description: `Mô tả chi tiết cho sản phẩm mẫu ${i}`,
        shortDesc: `Mô tả ngắn ${i}`,
        price: 5000000 + (i * 100000),
        originalPrice: 6000000 + (i * 100000),
        stockQuantity: 100,
        categoryId: catDiDong.id,
        brandId: brandBeeCube.id,
        images: {
          create: [
            { url: `https://picsum.photos/seed/${i}/800/800`, isPrimary: true, altText: `Ảnh sản phẩm ${i}` }
          ]
        }
      }
    });
  }

  // 6. Customers (20 customers)
  console.log('Seeding customers...');
  for (let i = 1; i <= 20; i++) {
    const phone = `0900000${i.toString().padStart(3, '0')}`;
    const email = `khachhang${i}@example.com`;
    
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        name: `Khách Hàng ${i}`,
        roleId: customerRole.id,
        passwordHash: 'hashedpassword',
      }
    });

    await prisma.customer.upsert({
      where: { phone: phone },
      update: { userId: user.id },
      create: {
        userId: user.id,
        fullName: `Khách Hàng ${i}`,
        phone: phone,
        email: email,
      }
    });
  }

  // 7. Orders (30 orders)
  const customers = await prisma.customer.findMany({ take: 20 });
  const products = await prisma.product.findMany({ take: 20 });

  const orderCount = await prisma.order.count();
  if (orderCount < 30) {
    console.log('Seeding orders...');
    for (let i = 1; i <= 30; i++) {
      const customer = customers[i % customers.length];
      const product = products[i % products.length];
      
      await prisma.order.create({
        data: {
          customerId: customer.id,
          totalAmount: product.price,
          shippingAddr: `Địa chỉ giao hàng số ${i}, Hà Nội`,
          status: 'PENDING',
          orderItems: {
            create: [
              {
                productId: product.id,
                quantity: 1,
                price: product.price
              }
            ]
          }
        }
      });
    }
  }

  // 8. Warranty Registrations (10 records)
  const warrantyCount = await prisma.warrantyRegistration.count();
  if (warrantyCount < 10) {
    console.log('Seeding warranties...');
    for (let i = 1; i <= 10; i++) {
      const customer = customers[i % customers.length];
      const product = products[i % products.length];
      const serial = `SN-WARRANTY-${i}`;

      const serialNum = await prisma.serialNumber.upsert({
        where: { serial },
        update: {},
        create: {
          productId: product.id,
          serial: serial,
          status: 'WARRANTY'
        }
      });

      await prisma.warrantyRegistration.upsert({
        where: { serialNumberId: serialNum.id },
        update: {},
        create: {
          serialNumberId: serialNum.id,
          customerId: customer.id,
          purchaseDate: new Date(),
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }
      });
    }
  }

  // 9. News (10 articles)
  console.log('Seeding news...');
  for (let i = 1; i <= 10; i++) {
    const nSlug = `bai-viet-mau-${i}`;
    await prisma.news.upsert({
      where: { slug: nSlug },
      update: {},
      create: {
        title: `Bài Viết Mẫu ${i}`,
        slug: nSlug,
        content: `Nội dung chi tiết bài viết mẫu ${i} dành cho chuyên mục tin tức của MovieLegend.`,
      }
    });
  }

  // 10. Banners (5 banners)
  const bannerCount = await prisma.banner.count();
  if (bannerCount < 5) {
    console.log('Seeding banners...');
    for (let i = 1; i <= 5; i++) {
      await prisma.banner.create({
        data: {
          title: `Banner ${i}`,
          imageUrl: `https://picsum.photos/seed/banner${i}/1920/600`,
          link: '#',
          isActive: true
        }
      });
    }
  }

  // 11. Settings
  console.log('Seeding settings...');
  const settings = [
    { key: 'SiteName', value: 'MovieLegend VN' },
    { key: 'Hotline', value: '1900 xxxx' },
    { key: 'Email', value: 'contact@movielegend.vn' },
    { key: 'Address', value: 'Hà Nội, Việt Nam' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 12. Notifications (10 notifications)
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@movielegend.vn' } });
  if (adminUser) {
    const notifCount = await prisma.notification.count();
    if (notifCount < 10) {
      console.log('Seeding notifications...');
      for (let i = 1; i <= 10; i++) {
        await prisma.notification.create({
          data: {
            userId: adminUser.id,
            title: `Thông báo ${i}`,
            message: `Nội dung thông báo tự động số ${i} từ hệ thống.`,
            isRead: false
          }
        });
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
