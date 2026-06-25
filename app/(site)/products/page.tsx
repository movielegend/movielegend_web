'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';

const categories = ['Tất Cả', 'Máy chiếu gia đình', 'Máy chiếu doanh nghiệp', 'Máy chiếu mini', 'Phụ kiện'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'Tất Cả' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-12 selection:bg-movielegend-500 selection:text-black">
      
      {/* Page Header */}
      <section className="border-b border-white/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-movielegend-500 font-semibold mb-4">Danh Mục Sản Phẩm</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Trải Nghiệm Đỉnh Cao</h1>
            <p className="text-lg text-gray-400 font-light">
              Khám phá bộ sưu tập máy chiếu thông minh và giải pháp nghe nhìn cao cấp từ MovieLegend.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 sticky top-[80px] z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f0f12] border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.slug} 
                  className="group flex flex-col bg-[#0a0a0c] rounded-3xl overflow-hidden hover:bg-[#121216] transition-colors duration-500 border border-white/5 shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="relative h-[320px] w-full bg-[#141417] flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-black/50 backdrop-blur-md border border-white/10 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide">
                        {product.category}
                      </span>
                    </div>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={600}
                      height={600}
                      className="object-contain h-[80%] w-[80%] group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 tracking-tight">{product.name}</h2>
                    <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto space-y-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-gray-500 line-through mb-1">{product.originalPrice}</p>
                          <p className="text-2xl font-bold text-white">{product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-movielegend-500 uppercase tracking-widest font-semibold">Trả Góp</p>
                          <p className="text-sm font-medium text-gray-300">{product.installment}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/products/${product.slug}`} className="flex-1 text-center py-3.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors duration-300">
                          Xem Chi Tiết
                        </Link>
                        <button className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-white/20 rounded-full hover:bg-movielegend-500 hover:text-black hover:border-movielegend-500 transition-colors duration-300">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-400">Vui lòng thử lại với từ khóa hoặc danh mục khác.</p>
            </div>
          )}
        </div>
      </section>

      {/* Global CSS for hiding scrollbar in categories */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
