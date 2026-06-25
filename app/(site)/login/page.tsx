'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/account';
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24 pb-12 px-6 relative selection:bg-movielegend-500 selection:text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(245,179,52,0.15),_transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="text-2xl font-bold tracking-widest uppercase">Movie<span className="text-movielegend-500">Legend</span></span>
          </Link>
          <h1 className="text-3xl font-bold mb-3">Đăng Nhập</h1>
          <p className="text-zinc-400">Đăng nhập để quản lý đơn hàng và bảo hành của bạn</p>
        </div>

        <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#141417] border border-white/5 rounded-xl pl-11 pr-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Mật Khẩu</label>
                <Link href="/forgot-password" className="text-xs text-movielegend-500 hover:text-movielegend-400 transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#141417] border border-white/5 rounded-xl pl-11 pr-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-400">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-white font-semibold hover:text-movielegend-500 transition-colors inline-flex items-center gap-1">
                Đăng ký ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
