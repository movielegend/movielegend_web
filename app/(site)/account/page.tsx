'use client';

import React, { useState } from 'react';
import { User, Package, ShieldCheck, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock User Data
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    joinDate: 'Tháng 10, 2023',
  };

  const menuItems = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
    { id: 'orders', label: 'Quản lý đơn hàng', icon: Package },
    { id: 'warranty', label: 'Bảo hành thiết bị', icon: ShieldCheck },
    { id: 'address', label: 'Sổ địa chỉ', icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 selection:bg-movielegend-500 selection:text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0">
            <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold text-movielegend-500 shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-zinc-400 text-sm">Thành viên từ {user.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
              <nav className="flex flex-col">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between p-5 w-full text-left transition-colors border-l-4 ${
                        isActive 
                          ? 'border-movielegend-500 bg-zinc-900/50 text-white' 
                          : 'border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-movielegend-500' : ''}`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-movielegend-500' : ''}`} />
                    </button>
                  );
                })}
                <button
                  onClick={() => window.location.href = '/login'}
                  className="flex items-center gap-3 p-5 w-full text-left text-rose-500 hover:bg-rose-500/10 transition-colors border-l-4 border-transparent mt-2 border-t border-white/5"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 md:p-10">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Thông Tin Cá Nhân</h2>
                  <p className="text-zinc-400">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Họ và Tên</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Số Điện Thoại</label>
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      disabled
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none text-zinc-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Email không thể thay đổi sau khi đăng ký.</p>
                  </div>
                </div>

                <Button className="rounded-full px-8 py-6 font-semibold tracking-wide">
                  Lưu Thay Đổi
                </Button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Đơn Hàng Của Tôi</h2>
                  <p className="text-zinc-400">Theo dõi trạng thái đơn hàng và lịch sử mua hàng</p>
                </div>
                
                <div className="bg-[#141417] rounded-2xl border border-white/5 p-8 text-center">
                  <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h3>
                  <p className="text-zinc-400 mb-6">Bạn chưa thực hiện bất kỳ đơn hàng nào tại Movie Legend.</p>
                  <Link href="/products">
                    <Button variant="secondary" className="rounded-full">Bắt Đầu Mua Sắm</Button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Thiết Bị Của Tôi</h2>
                    <p className="text-zinc-400">Quản lý bảo hành các thiết bị đã mua</p>
                  </div>
                  <Link href="/warranty?action=activate">
                    <Button className="rounded-full">Kích Hoạt Mới</Button>
                  </Link>
                </div>
                
                <div className="bg-[#141417] rounded-2xl border border-white/5 p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-black rounded-xl border border-zinc-800 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-movielegend-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Máy Chiếu Movie Legend S6</h3>
                        <p className="text-zinc-400 text-sm font-mono mb-2">S/N: MLS6-00123</p>
                        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                          ĐANG BẢO HÀNH
                        </span>
                      </div>
                    </div>
                    <div className="text-right w-full md:w-auto border-t border-zinc-800 md:border-none pt-4 md:pt-0">
                      <p className="text-zinc-400 text-sm mb-1">Hạn bảo hành</p>
                      <p className="font-semibold">15 Tháng 10, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Sổ Địa Chỉ</h2>
                    <p className="text-zinc-400">Quản lý địa chỉ giao hàng của bạn</p>
                  </div>
                  <Button variant="secondary" className="rounded-full">Thêm Địa Chỉ Mới</Button>
                </div>
                
                <div className="bg-[#141417] rounded-2xl border border-movielegend-500/30 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-movielegend-500/10 rounded-bl-full" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <span className="bg-movielegend-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">Mặc định</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-movielegend-500 text-sm hover:underline">Sửa</button>
                    </div>
                  </div>
                  <p className="text-zinc-400 mb-1">Điện thoại: {user.phone}</p>
                  <p className="text-zinc-400 line-clamp-2">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hà Nội</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
