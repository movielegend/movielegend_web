'use client';

import React, { useState } from 'react';
import { Eye, Edit, X, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderManagerProps {
  initialOrders: any[];
}

export default function OrderManager({ initialOrders }: OrderManagerProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatPrice = (p: any) => {
    return Number(p || 0).toLocaleString('vi-VN') + ' đ';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Đơn Hàng</h1>
          <p className="text-gray-400">Xem danh sách, kiểm tra chi tiết và cập nhật trạng thái đơn hàng.</p>
        </div>
        <Button onClick={fetchOrders} variant="outline" className="rounded-full text-xs bg-transparent border-white/10 text-white">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Mã Đơn</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Số Điện Thoại</th>
                <th className="px-6 py-4">Ngày Đặt</th>
                <th className="px-6 py-4">Tổng Tiền</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white font-mono">#ORD-{order.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 text-white font-medium">{order.customer?.fullName || 'Khách lẻ'}</td>
                  <td className="px-6 py-4">{order.customer?.phone || 'N/A'}</td>
                  <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-white font-bold">{formatPrice(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      order.status === 'PROCESSING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    Chưa có đơn hàng nào trong hệ thống.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Chi Tiết Đơn Hàng #ORD-{selectedOrder.id.toString().padStart(4, '0')}
                </h2>
                <p className="text-xs text-gray-400">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-[#141417] p-4 rounded-xl space-y-2 border border-white/5">
                <h3 className="font-semibold text-white">Thông Tin Khách Hàng</h3>
                <p className="text-gray-300"><strong className="text-white">Họ tên:</strong> {selectedOrder.customer?.fullName}</p>
                <p className="text-gray-300"><strong className="text-white">SĐT:</strong> {selectedOrder.customer?.phone}</p>
                <p className="text-gray-300"><strong className="text-white">Địa chỉ giao:</strong> {selectedOrder.shippingAddr}</p>
                {selectedOrder.note && <p className="text-gray-300"><strong className="text-white">Ghi chú:</strong> {selectedOrder.note}</p>}
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Sản Phẩm Đã Đặt</h3>
                <div className="space-y-2">
                  {selectedOrder.orderItems?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-[#141417] border border-white/5">
                      <div>
                        <p className="font-medium text-white">{item.product?.name || `Sản phẩm #${item.productId}`}</p>
                        <p className="text-xs text-gray-500">Số lượng: {item.quantity} x {formatPrice(item.price)}</p>
                      </div>
                      <p className="font-bold text-white">{formatPrice(Number(item.price) * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-base font-bold text-white">
                <span>Tổng Tiền Đơn Hàng</span>
                <span className="text-movielegend-500 text-xl">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="font-semibold text-white mb-2">Cập Nhật Trạng Thái Đơn Hàng</h3>
                <div className="flex flex-wrap gap-2">
                  {['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'].map((st) => (
                    <button
                      key={st}
                      disabled={updatingStatus}
                      onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedOrder.status === st
                          ? 'bg-movielegend-500 text-black'
                          : 'bg-[#141417] text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
