'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-transparent text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-home-cinema-room-with-projection-584-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col items-center text-center mt-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm md:text-base font-bold tracking-[0.3em] text-sky-600 mb-4 uppercase">
              Kỷ Nguyên Mới Của Rạp Hát Tại Gia
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-slate-900">
              HORIZON <span className="font-light text-sky-600">Ultra</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-normal mb-10">
              Trải nghiệm True 4K với Dolby Vision. Đỉnh cao của độ chân thực hình ảnh và âm thanh sống động.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="px-8 py-4 bg-sky-600 text-white font-bold rounded-full hover:bg-sky-500 shadow-lg shadow-sky-500/25 transition-all duration-300 min-w-[160px]">
                Mua Ngay
              </Link>
              <Link href="#features" className="px-8 py-4 bg-white/60 border border-slate-300 text-slate-900 font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px] backdrop-blur-md">
                Tìm Hiểu Thêm <ChevronRight className="w-4 h-4" />
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
              <span className="text-sky-600 tracking-[0.2em] text-sm font-bold uppercase mb-4">Công Nghệ Dual Light</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Độ Sáng & Màu Sắc Hoàn Hảo.</h3>
              <p className="text-slate-600 text-lg font-normal leading-relaxed mb-8">
                Bằng cách kết hợp nguồn sáng LED và Laser, chúng tôi mang đến độ chính xác màu sắc hàng đầu trong ngành, độ sáng cực cao và trải nghiệm xem tự nhiên tuyệt vời.
              </p>
              <Link href="/solutions" className="text-sky-600 hover:text-sky-700 flex items-center gap-2 font-bold transition-colors w-fit pb-1 border-b border-transparent hover:border-sky-600">
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
            <Link href="/products" className="text-slate-900 border border-slate-300 px-6 py-3 rounded-full hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 whitespace-nowrap font-bold bg-white/60 backdrop-blur-md">
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
                    className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-xs tracking-[0.2em] text-slate-400 font-bold uppercase mb-2">{product.category}</span>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">{product.name}</h3>
                  <p className="text-slate-600 font-normal text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 line-through mb-1">{product.originalPrice}</p>
                      <p className="text-xl font-bold text-sky-600">{product.price}</p>
                    </div>
                    <Link href={`/products/${product.slug}`} className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center group-hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Image Break / Audio */}
      <section className="relative h-[70vh] w-full flex items-center rounded-3xl overflow-hidden my-12 container mx-auto px-6">
        <Image 
          src="https://images.unsplash.com/photo-1524901541404-02b951f27c58?auto=format&fit=crop&w=1920&q=80" 
          alt="Audio Experience" 
          fill 
          className="object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-slate-900/60 rounded-3xl" />
        <div className="container mx-auto px-12 relative z-10 text-white">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Âm Thanh từ Harman Kardon.</h2>
            <p className="text-lg md:text-xl text-slate-200 font-normal mb-8">
              Trải nghiệm âm thanh chất lượng rạp hát. Loa kép tùy chỉnh mang lại âm thanh sống động, không bị biến dạng với âm trầm sâu và dải động cao.
            </p>
            <Button variant="secondary" size="lg" className="px-8 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-full">
              Khám Phá Âm Thanh
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
