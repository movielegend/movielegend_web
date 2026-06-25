'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Heart, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const positions = [
  {
    id: 1,
    title: 'Chuyên Viên Tư Vấn Bán Hàng',
    department: 'Sales',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'Kỹ Thuật Viên Lắp Đặt Máy Chiếu',
    department: 'Technical',
    location: 'Hà Nội',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'Nhân Viên Digital Marketing',
    department: 'Marketing',
    location: 'Hồ Chí Minh',
    type: 'Full-time',
  },
  {
    id: 4,
    title: 'Quản Lý Showroom',
    department: 'Management',
    location: 'Đà Nẵng',
    type: 'Full-time',
  }
];

const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Môi trường làm việc',
    desc: 'Trẻ trung, năng động và luôn khuyến khích sự sáng tạo, đổi mới.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Chăm sóc sức khỏe',
    desc: 'Bảo hiểm y tế toàn diện cho bạn và gói ưu đãi khám sức khỏe định kỳ.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Cơ hội phát triển',
    desc: 'Lộ trình thăng tiến rõ ràng, hỗ trợ chi phí tham gia các khóa đào tạo.'
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-5xl mb-24 relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(245,179,52,0.15),_transparent_70%)] pointer-events-none" />
        <div className="text-center mb-16 relative">
          <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase block mb-4">Tuyển Dụng</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Kiến Tạo Tương Lai Cùng <span className="text-movielegend-500">MovieLegend</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light">
            Chúng tôi luôn tìm kiếm những tài năng đam mê công nghệ và mong muốn mang đến trải nghiệm giải trí đỉnh cao cho mọi khách hàng.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="container mx-auto px-6 max-w-6xl mb-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Tại Sao Chọn Chúng Tôi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
              <div className="w-14 h-14 bg-movielegend-500/10 text-movielegend-500 rounded-xl flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vị Trí Đang Tuyển</h2>
            <p className="text-gray-400">Tham gia ngay hôm nay để trở thành một phần của MovieLegend.</p>
          </div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            Xem Tất Cả Vị Trí
          </Button>
        </div>

        <div className="space-y-4">
          {positions.map((job) => (
            <div key={job.id} className="group bg-[#0a0a0a] border border-white/5 hover:border-movielegend-500/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 hover:bg-white/[0.02]">
              <div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-movielegend-500 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                    <Briefcase className="w-4 h-4" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10">
                    {job.type}
                  </span>
                </div>
              </div>
              <Button className="shrink-0 w-full md:w-auto gap-2">
                Ứng Tuyển <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-movielegend-500/10 blur-[100px] rounded-full" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Không Tìm Thấy Vị Trí Phù Hợp?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
            Hãy gửi CV cho chúng tôi! Chúng tôi luôn chào đón những nhân tài mới gia nhập đội ngũ. Bạn sẽ được liên hệ khi có cơ hội phù hợp.
          </p>
          <Button size="lg" className="relative z-10 text-base font-semibold px-8 py-6">
            Gửi Hồ Sơ Ứng Tuyển Tự Do
          </Button>
        </div>
      </section>
    </main>
  );
}
