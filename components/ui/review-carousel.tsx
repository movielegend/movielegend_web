'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewItem {
  platform: string;
  title: string;
  excerpt: string;
  highlight: string;
}

interface ReviewCarouselProps {
  items: ReviewItem[];
}

export function ReviewCarousel({ items }: ReviewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[activeIndex].platform}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-beecube-400">{items[activeIndex].platform}</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">{items[activeIndex].title}</h3>
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/80 text-beecube-400">
              <ArrowRight className="h-6 w-6" />
            </div>
          </div>
          <p className="text-slate-300 leading-7">{items[activeIndex].excerpt}</p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-beecube-400">Điểm nổi bật</p>
            <p className="mt-2 text-lg font-semibold text-white">{items[activeIndex].highlight}</p>
          </div>
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.platform}
                type="button"
                className={cn(
                  'h-3 w-3 rounded-full transition',
                  index === activeIndex ? 'bg-beecube-400' : 'bg-white/20'
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.platform} review`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
