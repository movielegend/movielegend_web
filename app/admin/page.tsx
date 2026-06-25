import prisma from '@/lib/prisma';
import AdminDashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  // Fetch real counts
  const totalOrders = await prisma.order.count();
  const totalCustomers = await prisma.customer.count();
  const totalProducts = await prisma.product.count();

  // Aggregate total revenue (sum of totalAmount where status is COMPLETED)
  const revenueResult = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: 'COMPLETED',
    },
  });

  const totalRevenueNumber = Number(revenueResult._sum.totalAmount || 0);

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

  // Fetch recent orders
  const recentOrdersRaw = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { customer: true }
  });

  const recentOrdersData = recentOrdersRaw.map(order => ({
    id: `#ORD-${order.id.toString().padStart(3, '0')}`,
    customer: order.customer.fullName,
    email: order.customer.email || '',
    date: formatDate(order.createdAt),
    total: formatPrice(Number(order.totalAmount)),
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
