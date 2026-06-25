'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dealers = [
  {
    name: 'Movie Legend Hà Nội',
    address: 'Số 123 Phố Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
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
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="text-center mb-12">
          <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase">Mạng Lưới Bán Hàng</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Tìm Đại Lý Movie Legend Gần Bạn</h1>
          <p className="text-gray-400 text-lg">
            Với hàng chục cửa hàng trên khắp Việt Nam, chúng tôi luôn ở gần bạn để phục vụ.
          </p>
        </div>
      </section>

      {/* Dealers Grid */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dealers.map((dealer, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-movielegend-500/30 transition-colors">
              <h3 className="text-xl font-bold mb-6 text-white">{dealer.name}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-movielegend-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Địa chỉ</p>
                    <p className="text-white">{dealer.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-movielegend-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Điện thoại</p>
                    <p className="text-white">{dealer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-movielegend-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Giờ mở cửa</p>
                    <p className="text-white">{dealer.hours} (Cả thứ 7 & CN)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <p className="text-sm text-gray-400 mb-4">Dịch vụ:</p>
                <div className="flex flex-wrap gap-2">
                  {dealer.features.map((feature, j) => (
                    <span key={j} className="text-xs bg-movielegend-500/10 text-movielegend-500 px-3 py-1 rounded-full">
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
      <section className="container mx-auto px-6 max-w-5xl bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Bạn Muốn Trở Thành Đại Lý?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Movie Legend luôn tìm kiếm những đối tác uy tín để mở rộng mạng lưới bán hàng. Nếu bạn quan tâm, hãy liên hệ với chúng tôi.
        </p>
        <Link href="/contact?type=dealer">
          <Button className="gap-2">
            Tìm Hiểu Thêm <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </main>
  );
}
