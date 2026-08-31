'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

const Hero3DModel = dynamic(() => import('@/components/ui/hero-3d-model'), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] md:h-[460px] w-full flex items-center justify-center text-slate-400 font-medium">
      Đang tải mô hình 3D...
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="bg-transparent text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 pb-16">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-home-cinema-room-with-projection-584-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full"
          >
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-teal-600 mb-3 uppercase">
              Kỷ Nguyên Mới Của Rạp Hát Tại Gia
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-slate-900">
              HORIZON <span className="font-light text-teal-600">Ultra</span>
            </h1>
            <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-normal mb-2">
              Trải nghiệm True 4K với Dolby Vision. Đỉnh cao của độ chân thực hình ảnh và âm thanh sống động.
            </p>

            {/* Seamless Auto-Rotating 3D Model Display */}
            <Hero3DModel />

            <div className="flex items-center gap-4 justify-center mt-2">
              <Button size="lg" className="rounded-full px-8 py-6 text-base font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-600/25">
                Mua Ngay
              </Button>
              <Link href="/products">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base font-bold border-slate-300 hover:bg-slate-900 hover:text-white text-slate-900 bg-white/70 backdrop-blur-md">
                  Khám Phá Sản Phẩm <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-24 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-xl">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <span className="text-teal-600 tracking-[0.2em] text-sm font-bold uppercase mb-4">Công Nghệ Dual Light</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Độ Sáng & Màu Sắc Hoàn Hảo.</h3>
              <p className="text-slate-600 text-lg font-normal leading-relaxed mb-8">
                Bằng cách kết hợp nguồn sáng LED và Laser, chúng tôi mang đến độ chính xác màu sắc hàng đầu trong ngành, độ sáng cực cao và trải nghiệm xem tự nhiên tuyệt vời.
              </p>
              <Link href="/solutions" className="text-teal-600 hover:text-teal-700 flex items-center gap-2 font-bold transition-colors w-fit pb-1 border-b border-transparent hover:border-teal-600">
                Khám Phá Công Nghệ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative h-[400px] lg:h-auto">
              <Image 
                src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=80" 
                alt="Projector Lens" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">Nâng Tầm Không Gian</h2>
              <p className="text-slate-600 text-lg font-normal">Khám phá các dòng máy chiếu thông minh bán chạy nhất của chúng tôi.</p>
            </div>
            <Link href="/products" className="text-slate-900 border border-slate-300 px-6 py-3 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 whitespace-nowrap font-bold bg-white/60 backdrop-blur-md">
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div key={product.slug} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200/80">
                <div className="relative h-80 p-8 w-full bg-slate-100/80 flex items-center justify-center">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400}
                    height={400}
                    className="object-contain h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-2">{product.category}</span>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900">{product.name}</h3>
                    <p className="text-slate-600 text-sm font-normal line-clamp-2 mb-6">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                    <span className="text-xl font-bold text-slate-900">{product.price}</span>
                    <Link href={`/products/${product.slug}`} className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                      Chi tiết <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
