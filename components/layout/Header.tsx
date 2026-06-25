'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/products';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || activeDesktopMenu
          ? 'bg-[#050505]/95 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
      onMouseLeave={() => setActiveDesktopMenu(null)}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase z-50">
          MovieLegend
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          <div 
            className="relative cursor-pointer h-full flex items-center group py-2"
            onMouseEnter={() => setActiveDesktopMenu('products')}
          >
            <span className={`flex items-center gap-1 transition-colors ${activeDesktopMenu === 'products' ? 'text-movielegend-500' : 'hover:text-movielegend-500'}`}>
              Máy Chiếu <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDesktopMenu === 'products' ? 'rotate-180' : ''}`} />
            </span>
          </div>
          <Link href="/products?category=audio" className="hover:text-movielegend-500 transition-colors py-2">Âm Thanh</Link>
          <Link href="/products?category=accessories" className="hover:text-movielegend-500 transition-colors py-2">Phụ Kiện</Link>
          <Link href="/solutions" className="hover:text-movielegend-500 transition-colors py-2">Giải Pháp</Link>
          <Link href="/warranty" className="hover:text-movielegend-500 transition-colors py-2">Bảo Hành</Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 z-50">
          <Link href="/search" className="hover:text-movielegend-500 transition-colors"><Search className="w-5 h-5" /></Link>
          <Link href="/account" className="hover:text-movielegend-500 transition-colors"><User className="w-5 h-5" /></Link>
          <Link href="/cart" className="hover:text-movielegend-500 transition-colors"><ShoppingCart className="w-5 h-5" /></Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 hover:text-movielegend-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Mega Menu for Products */}
      <AnimatePresence>
        {activeDesktopMenu === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10 hidden md:block"
          >
            <div className="container mx-auto px-6 py-10">
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-sm text-gray-500 font-semibold tracking-[0.2em] uppercase mb-6">Danh mục</h3>
                  <ul className="space-y-4">
                    <li><Link href="/products" className="text-lg hover:text-movielegend-500 transition-colors">Tất cả máy chiếu</Link></li>
                    <li><Link href="/products" className="text-lg hover:text-movielegend-500 transition-colors">Máy chiếu gia đình</Link></li>
                    <li><Link href="/products" className="text-lg hover:text-movielegend-500 transition-colors">Máy chiếu doanh nghiệp</Link></li>
                    <li><Link href="/products" className="text-lg hover:text-movielegend-500 transition-colors">Máy chiếu mini di động</Link></li>
                  </ul>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.slug} className="group block p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-movielegend-500/50 transition-all">
                      <div className="relative h-40 w-full mb-4 bg-[#141417] rounded-xl overflow-hidden flex items-center justify-center p-4">
                        <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-semibold mb-1 group-hover:text-movielegend-500 transition-colors">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 shadow-2xl md:hidden h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 space-y-6 text-lg font-medium tracking-wide">
              <div className="space-y-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Sản phẩm</p>
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block pl-4 hover:text-movielegend-500 transition-colors border-l border-white/10">Tất cả Máy Chiếu</Link>
                <Link href="/products?category=audio" onClick={() => setIsMobileMenuOpen(false)} className="block pl-4 hover:text-movielegend-500 transition-colors border-l border-white/10">Âm Thanh</Link>
                <Link href="/products?category=accessories" onClick={() => setIsMobileMenuOpen(false)} className="block pl-4 hover:text-movielegend-500 transition-colors border-l border-white/10">Phụ Kiện</Link>
              </div>
              <Link href="/solutions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-movielegend-500 transition-colors">Giải Pháp</Link>
              <Link href="/warranty" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-movielegend-500 transition-colors">Bảo Hành</Link>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-around">
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-movielegend-500 transition-colors"><Search className="w-6 h-6" /></Link>
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-movielegend-500 transition-colors"><User className="w-6 h-6" /></Link>
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-movielegend-500 transition-colors"><ShoppingCart className="w-6 h-6" /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
