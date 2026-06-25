'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductDetailClient({ product }: { product: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );

      // Sticky Image Animation
      const imageEl = document.querySelector('.sticky-image');
      if (imageEl) {
        gsap.to(imageEl, {
          scale: 1.2,
          scrollTrigger: {
            trigger: imageSectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }

      // Fade in text blocks on scroll
      const textBlocks = document.querySelectorAll('.fade-up-text');
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden selection:bg-movielegend-500 selection:text-black">
      
      {/* Sticky Buy Bar */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="font-medium text-sm md:text-base">{product.name}</span>
          <div className="flex items-center gap-4">
            <span className="font-bold hidden sm:inline">{product.price}</span>
            <Button size="default" className="text-xs">Mua Ngay</Button>
          </div>
        </div>
      </div>

      {/* Cinematic Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center pt-16">
        <div className="absolute inset-0 z-0">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
        </div>
        
        <div ref={heroTextRef} className="relative z-10 max-w-4xl px-6 mt-20">
          <span className="text-movielegend-500 tracking-[0.3em] text-sm uppercase font-semibold block mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">{product.name}</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            {product.description}
          </p>
        </div>
      </section>

      {/* Scroll Storytelling Section */}
      <section ref={imageSectionRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#000]">
           <Image 
              src={product.gallery[0] || product.image} 
              alt="Feature details"
              width={1600}
              height={900}
              className="sticky-image object-cover w-full h-full opacity-60"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
              <div className="fade-up-text bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 max-w-2xl mt-40">
                 <h2 className="text-3xl md:text-4xl font-bold mb-4">Rõ Nét Chưa Từng Có.</h2>
                 <p className="text-base md:text-lg text-gray-300 font-light">
                   Được trang bị độ phân giải 4K thực và công nghệ chiếu Laser tiên tiến. Mọi chi tiết, mọi bóng tối, đều được thể hiện hoàn hảo.
                 </p>
              </div>
            </div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="fade-up-text mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Thông Số Kỹ Thuật Đỉnh Cao.</h2>
            <p className="text-gray-400 text-lg">Được thiết kế cho trải nghiệm rạp hát tại gia tuyệt đỉnh.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {product.specs?.map((spec: any, i: number) => (
               <div key={i} className="fade-up-text p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col">
                  <span className="text-movielegend-500 uppercase tracking-widest text-xs font-semibold mb-2">{spec.label}</span>
                  <span className="text-2xl md:text-3xl font-bold">{spec.value}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-screen flex items-center justify-center">
        <video 
           autoPlay muted loop playsInline 
           className="absolute inset-0 w-full h-full object-cover"
        >
           <source src={product.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
           <div className="text-center fade-up-text p-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                 <Play className="w-8 h-8 ml-1" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Xem Trực Tiếp</h2>
              <p className="text-gray-300">Chứng kiến {product.name} biến mọi căn phòng thành rạp chiếu phim.</p>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#08080a]">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-16 fade-up-text">
             <h2 className="text-3xl font-bold mb-4">Câu Hỏi Thường Gặp</h2>
           </div>
           <div className="space-y-6">
             {product.faq?.map((q: any, i: number) => (
                <div key={i} className="fade-up-text p-8 rounded-3xl bg-[#0f0f12] border border-white/5">
                   <h4 className="text-lg font-bold mb-2">{q.question}</h4>
                   <p className="text-gray-400 font-light">{q.answer}</p>
                </div>
             ))}
           </div>
        </div>
      </section>
      
    </div>
  );
}
