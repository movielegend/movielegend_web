'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-[#050505] text-white selection:bg-movielegend-500 selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-home-cinema-room-with-projection-584-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col items-center text-center mt-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] text-movielegend-500 mb-4 uppercase">
              Kỷ Nguyên Mới Của Rạp Hát Tại Gia
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              HORIZON <span className="font-light">Ultra</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light mb-10">
              Trải nghiệm True 4K với Dolby Vision. Đỉnh cao của độ chân thực hình ảnh và âm thanh sống động.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products/ml-laser-4k-pro" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 min-w-[160px]">
                Mua Ngay
              </Link>
              <Link href="#features" className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2 min-w-[160px]">
                Tìm Hiểu Thêm <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <span className="text-movielegend-500 tracking-[0.2em] text-sm font-semibold uppercase mb-4">Công Nghệ Dual Light</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Độ Sáng & Màu Sắc Hoàn Hảo.</h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                Bằng cách kết hợp nguồn sáng LED và Laser, chúng tôi mang đến độ chính xác màu sắc hàng đầu trong ngành, độ sáng cực cao và trải nghiệm xem tự nhiên tuyệt vời.
              </p>
              <Link href="/solutions" className="text-white hover:text-movielegend-500 flex items-center gap-2 font-medium transition-colors w-fit pb-1 border-b border-transparent hover:border-movielegend-500">
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
      <section className="py-24 bg-[#08080a]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Nâng Tầm Không Gian</h2>
              <p className="text-gray-400 text-lg font-light">Khám phá các dòng máy chiếu thông minh bán chạy nhất của chúng tôi.</p>
            </div>
            <Link href="/products" className="text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap">
              Xem Tất Cả Sản Phẩm
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <div key={product.slug} className="group flex flex-col bg-[#0f0f12] rounded-3xl overflow-hidden hover:bg-[#151518] transition-colors border border-white/5">
                <div className="relative h-80 p-8 w-full bg-[#141417] flex items-center justify-center">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400}
                    height={400}
                    className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-2">{product.category}</span>
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 font-light text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 line-through mb-1">{product.originalPrice}</p>
                      <p className="text-xl font-semibold">{product.price}</p>
                    </div>
                    <Link href={`/products/${product.slug}`} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-movielegend-500 transition-colors">
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
      <section className="relative h-[80vh] w-full flex items-center">
        <Image 
          src="https://images.unsplash.com/photo-1524901541404-02b951f27c58?auto=format&fit=crop&w=1920&q=80" 
          alt="Audio Experience" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Âm Thanh từ Harman Kardon.</h2>
            <p className="text-lg md:text-xl text-gray-300 font-light mb-8">
              Trải nghiệm âm thanh chất lượng rạp hát. Loa kép tùy chỉnh mang lại âm thanh sống động, không bị biến dạng với âm trầm sâu và dải động cao.
            </p>
            <Button variant="secondary" size="lg" className="px-8 bg-transparent backdrop-blur-md border-white">
              Khám Phá Âm Thanh
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
