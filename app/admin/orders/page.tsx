import React from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      payments: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalCount = await prisma.order.count();

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short' }).format(date);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Đơn Hàng</h1>
          <p className="text-gray-400">Quản lý và theo dõi các đơn hàng trên hệ thống.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80 focus-within:border-movielegend-500/50 transition-colors">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm mã đơn, khách hàng..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Lọc
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Mã Đơn</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Ngày Đặt</th>
                <th className="px-6 py-4">Tổng Tiền</th>
                <th className="px-6 py-4">Thanh Toán</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => {
                const paymentStatus = order.payments.length > 0 ? order.payments[0].status : 'Chưa thanh toán';

                return (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">#ORD-{order.id.toString().padStart(3, '0')}</td>
                    <td className="px-6 py-4">{order.customer.fullName}</td>
                    <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 text-white font-medium">{formatPrice(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        paymentStatus === 'COMPLETED' ? 'bg-blue-500/10 text-blue-500' : 
                        paymentStatus === 'PENDING' ? 'bg-purple-500/10 text-purple-500' : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 
                        order.status === 'PENDING' ? 'bg-movielegend-500/10 text-movielegend-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <p>Hiển thị 1-{orders.length} của {totalCount} đơn hàng</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
}