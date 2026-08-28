'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, RefreshCw } from 'lucide-react';
import { products as fallbackProducts } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const categories = ['Tất Cả', 'Máy Chiếu Gia Đình', 'Máy Chiếu Di Động', 'Máy Chiếu Cao Cấp', 'Phụ Kiện'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/api/products';
      const params = new URLSearchParams();
      if (activeCategory !== 'Tất Cả') {
        params.append('category', activeCategory);
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setProductsList(data);
        } else {
          setProductsList(fallbackProducts);
        }
      } else {
        setProductsList(fallbackProducts);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setProductsList(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const formatPrice = (price: any) => {
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN') + ' đ';
    }
    return price || 'Liên hệ';
  };

  return (
    <div className="bg-transparent text-slate-900 min-h-screen pt-24 pb-12 selection:bg-sky-500 selection:text-white">
      
      {/* Page Header */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold mb-4">Danh Mục Sản Phẩm</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Trải Nghiệm Đỉnh Cao</h1>
            <p className="text-lg text-slate-600 font-normal">
              Khám phá bộ sưu tập máy chiếu thông minh và giải pháp nghe nhìn cao cấp từ MovieLegend.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 z-30 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20' 
                      : 'bg-white/60 text-slate-700 border-slate-300 hover:bg-white hover:text-sky-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 border border-slate-300 rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-sky-600" />
              <p className="font-medium">Đang tải danh sách sản phẩm...</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => {
                  const imgUrl = product.images?.[0]?.url || product.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';
                  const catName = product.category?.name || product.category || 'Máy Chiếu';

                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={product.slug || product.id} 
                      className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-slate-200/80"
                    >
                      {/* Image Container */}
                      <div className="relative h-[320px] w-full bg-slate-100/80 flex items-center justify-center overflow-hidden">
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white/80 backdrop-blur-md border border-slate-200/60 text-xs px-3 py-1.5 rounded-full font-bold text-slate-700">
                            {catName}
                          </span>
                        </div>
                        <Image 
                          src={imgUrl} 
                          alt={product.name} 
                          width={600}
                          height={600}
                          className="object-contain h-[80%] w-[80%] group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                      </div>
                      
                      {/* Content Container */}
                      <div className="p-8 flex-1 flex flex-col">
                        <h2 className="text-2xl font-bold mb-3 tracking-tight text-slate-900">{product.name}</h2>
                        <p className="text-slate-600 font-normal text-sm leading-relaxed mb-6 line-clamp-2">
                          {product.shortDesc || product.description}
                        </p>
                        
                        <div className="mt-auto space-y-6">
                          <div className="flex items-end justify-between">
                            <div>
                              {product.originalPrice && (
                                <p className="text-xs text-slate-400 line-through mb-1">{formatPrice(product.originalPrice)}</p>
                              )}
                              <p className="text-2xl font-extrabold text-sky-600">{formatPrice(product.price)}</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Link href={`/products/${product.slug || product.id}`} className="flex-1 text-center py-3.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors duration-300">
                              Xem Chi Tiết
                            </Link>
                            <button 
                              onClick={() => addItem({
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
                                image: imgUrl
                              })}
                              className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-slate-300 rounded-full hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors duration-300 text-slate-700"
                              title="Thêm vào giỏ"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-slate-500">Vui lòng thử lại với từ khóa hoặc danh mục khác.</p>
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
