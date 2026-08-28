'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.name?.toLowerCase().includes(q) ||
      p.brand?.name?.toLowerCase().includes(q)
    );
  });

  const formatPrice = (price: any) => {
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN') + ' đ';
    }
    return price || 'Liên hệ';
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-sky-500 selection:text-white">
      <section className="container mx-auto px-6 max-w-7xl">
        
        {/* Header & Search Bar */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold mb-4 block">Movie Legend Search</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-slate-900">Tìm Kiếm Sản Phẩm</h1>
          <p className="text-slate-600 text-lg font-normal mb-8">
            Tìm máy chiếu, thiết bị âm thanh và phụ kiện phù hợp nhất với nhu cầu của bạn.
          </p>

          <div className="relative w-full shadow-lg rounded-full">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input 
              type="text"
              autoFocus
              placeholder="Nhập tên sản phẩm, thương hiệu hoặc từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-2xl border border-slate-300 rounded-full py-5 pl-16 pr-6 text-slate-900 text-lg outline-none focus:border-sky-600 transition-colors shadow-xl placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            <p className="font-medium">Đang tìm kiếm sản phẩm...</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-slate-200/80 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {query ? `Kết quả tìm kiếm cho "${query}"` : 'Tất cả sản phẩm'}
              </h2>
              <span className="text-sm font-semibold text-slate-500">{filteredProducts.length} sản phẩm</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const imgUrl = product.images?.[0]?.url || product.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';
                const catName = product.category?.name || product.category || 'Máy Chiếu';

                return (
                  <div key={product.id || product.slug} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-slate-200/80">
                    <div className="relative h-[280px] w-full bg-slate-100/80 flex items-center justify-center overflow-hidden">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/80 backdrop-blur-md border border-slate-200/60 text-xs px-3 py-1.5 rounded-full font-bold text-slate-700">
                          {catName}
                        </span>
                      </div>
                      <Image 
                        src={imgUrl} 
                        alt={product.name} 
                        width={400}
                        height={400}
                        className="object-contain h-[80%] w-[80%] group-hover:scale-110 transition-transform duration-700 ease-out" 
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-sky-600 transition-colors">{product.name}</h3>
                        <p className="text-slate-600 text-sm font-normal line-clamp-2 mb-6">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                        <div>
                          <p className="text-xs text-slate-400 line-through">{product.originalPrice ? formatPrice(product.originalPrice) : ''}</p>
                          <p className="text-xl font-extrabold text-sky-600">{formatPrice(product.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/products/${product.slug || product.id}`} className="px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-full hover:bg-slate-800 transition-colors">
                            Xem
                          </Link>
                          <button 
                            onClick={() => addItem({
                              id: product.id,
                              name: product.name,
                              slug: product.slug,
                              price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
                              image: imgUrl
                            })}
                            className="p-2.5 border border-slate-300 rounded-full hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors text-slate-700"
                            title="Thêm vào giỏ"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/80">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm nào</h3>
                <p className="text-slate-500 mb-6">Thử lại với các từ khóa khác như "Beecube", "XGIMI", "Laser"...</p>
                <Button onClick={() => setQuery('')} className="rounded-full bg-sky-600 text-white font-bold hover:bg-sky-500">
                  Xem Tất Cả Sản Phẩm
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
