'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="text-center mb-16">
          <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase">Về Chúng Tôi</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Movie Legend - Chuyên Gia Máy Chiếu</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Với hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ hiển thị, Movie Legend là đối tác tin cậy của hàng nghìn khách hàng tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Khởi Đầu & Phát Triển</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Movie Legend được thành lập năm 2008 với sứ mệnh mang công nghệ hiển thị tốt nhất đến cho mọi gia đình và doanh nghiệp Việt Nam.
            </p>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Chúng tôi không chỉ cung cấp máy chiếu, mà còn mang đến những trải nghiệm hình ảnh vô cùng sắc nét và tinh tế, biến mọi không gian thành một rạp chiếu phim cao cấp.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Đến nay, chúng tôi đã phục vụ hơn 10,000 khách hàng hài lòng trên khắp đất nước.
            </p>
          </div>
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-8">
            <h3 className="text-2xl font-bold mb-6">Những Con Số</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-movielegend-500">15+</div>
                <div className="text-sm text-gray-400">Năm kinh nghiệm</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-movielegend-500">10K+</div>
                <div className="text-sm text-gray-400">Khách hàng hài lòng</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-movielegend-500">50+</div>
                <div className="text-sm text-gray-400">Loại sản phẩm</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-movielegend-500">24/7</div>
                <div className="text-sm text-gray-400">Hỗ trợ khách hàng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Giá Trị Cốt Lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Chất Lượng Hàng Đầu', desc: 'Chỉ cung cấp sản phẩm từ các thương hiệu uy tín nhất thế giới.' },
            { title: 'Tư Vấn Chuyên Nghiệp', desc: 'Đội ngũ chuyên gia luôn sẵn sàng giúp bạn chọn sản phẩm phù hợp.' },
            { title: 'Dịch Vụ Xuất Sắc', desc: 'Hỗ trợ trước, trong và sau bán hàng với chất lượng tuyệt vời.' }
          ].map((value, i) => (
            <div key={i} className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
              <h3 className="text-lg font-bold mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-6">Hãy Liên Hệ Với Chúng Tôi</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Nếu bạn có bất kỳ câu hỏi nào hoặc muốn tìm hiểu thêm về các sản phẩm của chúng tôi, đừng ngần ngại liên hệ.
        </p>
        <Link href="/contact">
          <Button className="gap-2">
            Liên Hệ Ngay <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
