import prisma from '@/lib/prisma';
import AdminDashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let totalOrders = 0;
  let totalCustomers = 0;
  let totalProducts = 0;
  let totalRevenueNumber = 0;
  let recentOrdersRaw: any[] = [];

  try {
    totalOrders = await prisma.order.count();
    totalCustomers = await prisma.customer.count();
    totalProducts = await prisma.product.count();

    const revenueResult = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: 'COMPLETED',
      },
    });

    totalRevenueNumber = Number(revenueResult._sum.totalAmount || 0);

    recentOrdersRaw = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { customer: true }
    });
  } catch (err) {
    console.error('Error querying DB in AdminDashboard:', err);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(date);
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Hoàn thành';
      case 'PENDING': return 'Đang xử lý';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const recentOrdersData = recentOrdersRaw.map(order => ({
    id: `#ORD-${order.id.toString().padStart(3, '0')}`,
    customer: order.customer?.fullName || 'Khách hàng',
    email: order.customer?.email || '',
    date: order.createdAt ? formatDate(new Date(order.createdAt)) : '',
    total: formatPrice(Number(order.totalAmount || 0)),
    status: formatStatus(order.status),
  }));

  const statsData = {
    revenue: formatPrice(totalRevenueNumber),
    orders: totalOrders.toString(),
    customers: totalCustomers.toString(),
    products: totalProducts.toString(),
  };

  return (
    <AdminDashboardClient statsData={statsData} recentOrdersData={recentOrdersData} />
  );
}
