'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/login?registered=1';
      } else {
        setErrorMsg(data.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 flex items-center justify-center pt-24 pb-12 px-6 relative selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-md relative z-10 text-slate-900">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-black tracking-widest uppercase text-slate-900">Movie<span className="text-sky-600">Legend</span></span>
          </Link>
          <h1 className="text-3xl font-black mb-2 text-slate-900">Tạo Tài Khoản Mới</h1>
          <p className="text-slate-600 text-sm font-normal">Trải nghiệm mua sắm và bảo hành chính hãng</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/80 p-8 shadow-xl text-left">
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Họ và Tên *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 border border-slate-300 rounded-xl pl-11 pr-5 py-3.5 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 text-sm"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Số Điện Thoại *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 border border-slate-300 rounded-xl pl-11 pr-5 py-3.5 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 text-sm"
                  placeholder="0901234567"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 border border-slate-300 rounded-xl pl-11 pr-5 py-3.5 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Mật Khẩu *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/80 border border-slate-300 rounded-xl pl-11 pr-5 py-3.5 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2 bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25 mt-2"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Tạo Tài Khoản'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200/80 text-center">
            <p className="text-slate-600 text-sm font-medium">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-sky-600 font-bold hover:text-sky-700 transition-colors inline-flex items-center gap-1">
                Đăng nhập <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
