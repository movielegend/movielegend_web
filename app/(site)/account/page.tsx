'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, ShieldCheck, LogOut, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const mockUser = {
    fullName: 'Nguyễn Văn A',
    email: 'khachhang@gmail.com',
    phone: '0901234567',
    joinedDate: '15/01/2026'
  };

  const mockOrders = [
    {
      id: 'ML-88392',
      date: '20/02/2026',
      total: '24.900.000 đ',
      status: 'Đã giao hàng',
      items: ['Máy chiếu Laser XGIMI Horizon Ultra 4K']
    },
    {
      id: 'ML-71204',
      date: '10/01/2026',
      total: '1.290.000 đ',
      status: 'Hoàn tất',
      items: ['Chân đế máy chiếu xoay 360 độ']
    }
  ];

  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-200/80 p-6 mb-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-700 flex items-center justify-center font-bold text-xl">
                  {mockUser.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-black text-lg text-slate-900">{mockUser.fullName}</h2>
                  <p className="text-xs text-slate-500 font-medium">{mockUser.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl">
              <nav className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === 'orders' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3"><Package className="w-4 h-4" /> Đơn Hàng Của Tôi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === 'warranty' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> Bảo Hành Thiết Bị</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === 'info' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3"><Settings className="w-4 h-4" /> Thông Tin Tài Khoản</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <Link href="/login" className="w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all">
                  <span className="flex items-center gap-3"><LogOut className="w-4 h-4" /> Đăng Xuất</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-xl">
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-2xl font-black mb-6 text-slate-900">Lịch Sử Đơn Hàng</h3>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-extrabold text-slate-900">{order.id}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full">{order.status}</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium mb-1">{order.items.join(', ')}</p>
                        <p className="text-xs text-slate-400">Ngày đặt: {order.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-cyan-600 block">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div>
                <h3 className="text-2xl font-black mb-6 text-slate-900">Thông Tin Cá Nhân</h3>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="text-xs uppercase font-bold text-slate-500 block mb-1">Họ và tên</label>
                    <input type="text" readOnly value={mockUser.fullName} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-slate-500 block mb-1">Email</label>
                    <input type="email" readOnly value={mockUser.email} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold text-slate-500 block mb-1">Số điện thoại</label>
                    <input type="tel" readOnly value={mockUser.phone} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 font-bold" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">Bảo Hành Thiết Bị</h3>
                <p className="text-slate-600 text-sm mb-6">Tất cả thiết bị mua tại Movie Legend đều được tự động lưu vết mã serial bảo hành điện tử.</p>
                <Link href="/warranty">
                  <Button className="rounded-full bg-cyan-600 text-white font-bold hover:bg-cyan-500">Tra Cứu Bảo Hành Ngay</Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
