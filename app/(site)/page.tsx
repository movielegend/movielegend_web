'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, ShieldCheck, Download, Award, Zap } from 'lucide-react';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-transparent text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-28 pb-20">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-home-cinema-room-with-projection-584-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/80 text-teal-700 text-xs font-extrabold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Kỷ Nguyên Mới Của Rạp Hát Tại Gia
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-slate-900 leading-[1.05]">
              HORIZON <span className="font-light text-teal-600">Ultra 4K</span>
            </h1>

            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-normal mb-10 leading-relaxed">
              Trải nghiệm công nghệ Dual Light Laser tiên tiến nhất. Độ phân giải 4K UHD chân thực kết hợp cùng âm thanh Harman Kardon đỉnh cao.
            </p>

            {/* Premium Studio Product Showcase Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-3xl my-6 group"
            >
              {/* Soft Ambient Light Glow Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/30 via-sky-300/20 to-teal-200/30 rounded-[3rem] blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Floating Product Hero Card */}
              <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/90 p-8 shadow-2xl overflow-hidden flex flex-col items-center">
                
                {/* Floating Specs Badges */}
                <div className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200/80 px-4 py-2 rounded-full text-xs font-bold text-slate-800 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" /> 3.500 ANSI Lumens
                </div>

                <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200/80 px-4 py-2 rounded-full text-xs font-bold text-slate-800 shadow-md">
                  <Award className="w-4 h-4 text-amber-500" /> Dolby Vision & Atmos
                </div>

                {/* Floating Studio Image Display */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center p-4"
                >
                  <Image 
                    src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=80" 
                    alt="Horizon Ultra 4K Laser Projector"
                    fill
                    priority
                    className="object-cover rounded-3xl shadow-xl group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Glass Lens Highlight */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-left text-white z-10">
                    <p className="text-xs uppercase tracking-widest text-teal-300 font-bold mb-1">Dual Light Laser Engine</p>
                    <h3 className="text-2xl font-black">HORIZON Ultra Flagship</h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6">
              <Button size="lg" className="rounded-full px-10 py-7 text-base font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xl shadow-teal-600/25 transition-all hover:scale-105">
                Đặt Mua Ngay — 38.900.000₫
              </Button>
              <Link href="/products/ml-laser-4k-pro">
                <Button size="lg" variant="outline" className="rounded-full px-8 py-7 text-base font-bold border-slate-300 hover:bg-slate-900 hover:text-white text-slate-900 bg-white/80 backdrop-blur-md shadow-sm">
                  Khám Phá Chi Tiết <ChevronRight className="ml-1 w-4 h-4" />
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

      {/* B2B CAD Drawings Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-200/80 p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">
                <ShieldCheck className="w-4 h-4" /> Tệp Tài Liệu Kỹ Thuật CAD B2B
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Bản Vẽ 3D CAD (.STP 140MB) Cho Đối Tác</h3>
              <p className="text-slate-600 text-sm max-w-2xl font-normal">
                Tải bản vẽ CAD chuẩn xác A8-0306.stp dành cho các kỹ sư, đơn vị thiết kế thi công nội thất và đối tác thương mại.
              </p>
            </div>
            <a href="/models/A8-0306.stp" download="A8-0306.stp">
              <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-6 flex items-center gap-2 whitespace-nowrap shadow-md">
                <Download className="w-4 h-4 text-teal-400" /> Tải Bản Vẽ CAD (.STP)
              </Button>
            </a>
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
