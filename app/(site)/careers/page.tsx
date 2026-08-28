'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const openPositions = [
  {
    id: 'tech-lead',
    title: 'Chuyên Viên Kỹ Thuật Lắp Đặt Rạp Phim',
    department: 'Kỹ Thuật & Thi Công',
    location: 'Hà Nội / TP.HCM',
    type: 'Toàn thời gian',
    description: 'Chịu trách nhiệm khảo sát, tư vấn giải pháp lắp đặt máy chiếu 4K, màn chiếu âm tường và hệ thống âm thanh Dolby Atmos cho khách hàng.'
  },
  {
    id: 'sales-exec',
    title: 'Chuyên Viên Tư Vấn Bán Hàng (Showroom)',
    department: 'Kinh Doanh',
    location: 'Hà Nội / TP.HCM',
    type: 'Toàn thời gian',
    description: 'Đón tiếp, tư vấn trải nghiệm hình ảnh & âm thanh trực tiếp tại Showroom cho khách hàng cá nhân và doanh nghiệp.'
  },
  {
    id: 'marketing-spec',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Hà Nội',
    type: 'Toàn thời gian',
    description: 'Quản lý chiến dịch quảng cáo, xây dựng nội dung thương hiệu trên các nền tảng số và phát triển cộng đồng yêu điện ảnh.'
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-5xl mb-20 text-center">
        <span className="text-cyan-600 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Tuyển Dụng & Gia Nhập</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Kiến Tạo Tương Lai Rạp Phim Tại Gia</h1>
        <p className="text-slate-600 text-lg md:text-xl font-normal max-w-2xl mx-auto">
          Gia nhập Movie Legend để cùng mang trải nghiệm giải trí điện ảnh chuyên nghiệp đến hàng triệu ngôi nhà Việt Nam.
        </p>
      </section>

      {/* Positions Grid */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <h2 className="text-3xl font-black mb-10 text-slate-900">Vị Trí Đang Tuyển Dụng</h2>
        <div className="space-y-6">
          {openPositions.map((job) => (
            <div key={job.id} className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl hover:shadow-2xl transition-all">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">{job.department}</span>
                <h3 className="text-2xl font-black text-slate-900">{job.title}</h3>
                <p className="text-slate-600 text-sm font-normal leading-relaxed">{job.description}</p>
                <div className="flex gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-600" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-600" /> {job.type}</span>
                </div>
              </div>
              <Link href="/contact?job=1">
                <Button className="rounded-full px-6 py-5 bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-md shadow-cyan-600/20">
                  Ứng Tuyển Ngay <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
