'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailClient({ product }: { product: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero text animation
      gsap.from(heroTextRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Pinned image zoom effect
      ScrollTrigger.create({
        trigger: imageSectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        animation: gsap.to('.sticky-image', {
          scale: 1.2,
          ease: 'none',
        }),
      });

      // Fade up elements
      gsap.utils.toArray<HTMLElement>('.fade-up-text').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent text-slate-900 overflow-hidden selection:bg-sky-500 selection:text-white">
      
      {/* Sticky Buy Bar */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center text-slate-900">
          <span className="font-bold text-sm md:text-base">{product.name}</span>
          <div className="flex items-center gap-4">
            <span className="font-bold text-sky-600 hidden sm:inline">{product.price}</span>
            <Button size="default" className="text-xs font-bold rounded-full bg-sky-600 text-white hover:bg-sky-500">Mua Ngay</Button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f2] via-[#faf8f2]/40 to-[#faf8f2]/80" />
        </div>
        
        <div ref={heroTextRef} className="relative z-10 max-w-4xl px-6 mt-20">
          <span className="text-sky-600 tracking-[0.3em] text-sm uppercase font-bold block mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-slate-900">{product.name}</h1>
          <p className="text-xl md:text-2xl text-slate-700 font-normal max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>
      </section>

      {/* Scroll Storytelling Section */}
      <section ref={imageSectionRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-100/50">
           <Image 
              src={product.gallery[0] || product.image} 
              alt="Feature details"
              width={1600}
              height={900}
              className="sticky-image object-cover w-full h-full opacity-70"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
              <div className="fade-up-text bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-slate-200/80 max-w-2xl mt-40 shadow-xl">
                 <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900">Rõ Nét Chưa Từng Có.</h2>
                 <p className="text-base md:text-lg text-slate-700 font-normal">
                   Được trang bị độ phân giải 4K thực và công nghệ chiếu Laser tiên tiến. Mọi chi tiết, mọi bóng tối, đều được thể hiện hoàn hảo.
                 </p>
              </div>
            </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="py-32 bg-transparent">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="fade-up-text mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">Thông Số Kỹ Thuật Đỉnh Cao.</h2>
            <p className="text-slate-600 text-lg">Được thiết kế cho trải nghiệm rạp hát tại gia tuyệt đỉnh.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {product.specs?.map((spec: any, i: number) => (
               <div key={i} className="fade-up-text p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/80 flex flex-col shadow-sm">
                  <span className="text-sky-600 uppercase tracking-widest text-xs font-bold mb-2">{spec.label}</span>
                  <span className="text-2xl md:text-3xl font-extrabold text-slate-900">{spec.value}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-screen flex items-center justify-center rounded-3xl overflow-hidden my-12 container mx-auto px-6">
        <video 
           autoPlay muted loop playsInline 
           className="absolute inset-0 w-full h-full object-cover"
        >
           <source src={product.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
           <div className="text-center fade-up-text p-6 text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30 cursor-pointer hover:bg-white/30 transition-colors">
                 <Play className="w-8 h-8 ml-1" />
              </div>
              <h2 className="text-4xl font-black mb-4">Xem Trực Tiếp</h2>
              <p className="text-slate-200">Chứng kiến {product.name} biến mọi căn phòng thành rạp chiếu phim.</p>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-transparent">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-16 fade-up-text">
             <h2 className="text-3xl font-black mb-4 text-slate-900">Câu Hỏi Thường Gặp</h2>
           </div>
           <div className="space-y-6">
             {product.faq?.map((q: any, i: number) => (
                <div key={i} className="fade-up-text p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm">
                   <h4 className="text-lg font-bold mb-2 text-slate-900">{q.question}</h4>
                   <p className="text-slate-600 font-normal">{q.answer}</p>
                </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
