'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const [formData, setFormData] = useState({ email: 'admin@movielegend.vn', password: 'hashedpassword' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        const target = redirectUrl || (['Admin', 'Super Admin', 'Staff'].includes(data.user?.role) ? '/admin' : '/account');
        window.location.href = target;
      } else {
        setErrorMsg(data.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Đã có lỗi kết nối xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md relative z-10 text-slate-900">
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-black tracking-widest uppercase text-slate-900">Movie<span className="text-sky-600">Legend</span></span>
        </Link>
        <h1 className="text-3xl font-bold mb-3 text-slate-900">Đăng Nhập</h1>
        <p className="text-slate-600 font-normal">Đăng nhập tài khoản Khách hàng hoặc Quản trị viên</p>
      </div>

      <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/80 p-8 shadow-xl text-left">
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <div className="mb-6 p-3.5 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-900 text-xs space-y-1">
          <p className="font-bold text-sky-700">🔑 Tài khoản Admin dùng thử:</p>
          <p>Email: <code className="text-sky-950 font-bold font-mono">admin@movielegend.vn</code></p>
          <p>Mật khẩu: <code className="text-sky-950 font-bold font-mono">hashedpassword</code></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</label>
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
                className="w-full bg-white/80 border border-slate-300 rounded-xl pl-11 pr-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Mật Khẩu</label>
            </div>
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
                className="w-full bg-slate-80 border border-slate-300 rounded-xl pl-11 pr-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2 bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Đăng Nhập'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200/80 text-center">
          <p className="text-slate-600 text-sm">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-sky-600 font-bold hover:text-sky-700 transition-colors inline-flex items-center gap-1">
              Đăng ký ngay <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 flex items-center justify-center pt-24 pb-12 px-6 relative selection:bg-sky-500 selection:text-white">
      <Suspense fallback={<div className="text-center pt-20">Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
