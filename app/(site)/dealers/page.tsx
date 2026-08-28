'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dealers = [
  {
    name: 'Movie Legend Hà Nội',
    address: 'Tầng 1, Lotte Mall West Lake, Hoàn Kiếm, Hà Nội',
    phone: '024-XXXX-XXXX',
    hours: '9:00 - 21:00',
    features: ['Showroom lớn', 'Tư vấn miễn phí', 'Lắp đặt in-home']
  },
  {
    name: 'Movie Legend TP.HCM',
    address: 'Số 456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028-XXXX-XXXX',
    hours: '9:00 - 21:00',
    features: ['Showroom lớn', 'Tư vấn miễn phí', 'Giao hàng nhanh']
  },
  {
    name: 'Movie Legend Đà Nẵng',
    address: 'Số 789 Trần Phú, Hải Châu, Đà Nẵng',
    phone: '0236-XXX-XXXX',
    hours: '9:00 - 20:00',
    features: ['Showroom', 'Tư vấn miễn phí', 'Bảo hành']
  },
  {
    name: 'Movie Legend Cần Thơ',
    address: 'Số 321 Nguyễn Trãi, Ninh Kiều, Cần Thơ',
    phone: '0292-XXX-XXXX',
    hours: '9:00 - 20:00',
    features: ['Showroom', 'Tư vấn chuyên nghiệp', 'Dịch vụ']
  }
];

export default function DealersPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-5xl mb-20">
        <div className="text-center mb-12">
          <span className="text-cyan-600 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Mạng Lưới Bán Hàng</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-6 text-slate-900">Tìm Đại Lý Movie Legend Gần Bạn</h1>
          <p className="text-slate-600 text-lg font-normal max-w-2xl mx-auto">
            Với hàng chục showroom và đối tác uy tín trên khắp Việt Nam, chúng tôi luôn ở gần bạn để phục vụ trải nghiệm trình chiếu đỉnh cao.
          </p>
        </div>
      </section>

      {/* Dealers Grid */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dealers.map((dealer, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl hover:border-cyan-500/50 transition-all">
              <h3 className="text-2xl font-black mb-6 text-slate-900">{dealer.name}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-0.5">Địa chỉ</p>
                    <p className="text-slate-900 font-semibold">{dealer.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-0.5">Điện thoại</p>
                    <p className="text-slate-900 font-bold">{dealer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-0.5">Giờ mở cửa</p>
                    <p className="text-slate-900 font-medium">{dealer.hours} (Cả thứ 7 & CN)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-6">
                <p className="text-xs text-slate-500 font-bold uppercase mb-3">Dịch vụ tại đây:</p>
                <div className="flex flex-wrap gap-2">
                  {dealer.features.map((feature, j) => (
                    <span key={j} className="text-xs bg-cyan-100/80 text-cyan-700 font-bold px-3.5 py-1.5 rounded-full border border-cyan-200">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become Dealer */}
      <section className="container mx-auto px-6 max-w-5xl bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl">
        <h2 className="text-3xl font-black mb-4 text-slate-900">Bạn Muốn Trở Thành Đại Lý Đối Tác?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto font-normal text-lg">
          Movie Legend luôn mở rộng hợp tác kinh doanh với chính sách chiết khấu hấp dẫn và hỗ trợ kỹ thuật truyền thông toàn diện.
        </p>
        <Link href="/contact?type=dealer">
          <Button className="gap-2 rounded-full px-8 py-6 bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-600/25">
            Đăng Ký Trở Thành Đại Lý <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
