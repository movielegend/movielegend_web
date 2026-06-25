import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Danh sách yêu thích | Movie Legend',
  description: 'Sản phẩm yêu thích của bạn tại Movie Legend',
};

// Mock data
const wishlistItems = [
  {
    id: '1',
    name: 'Máy Chiếu BEECUBE Xtreme II Gen 2',
    slug: 'beecube-xtreme-ii-gen-2',
    price: 6490000,
    originalPrice: 6990000,
    image: 'https://images.unsplash.com/photo-1585799705912-32b0dd8a4783?auto=format&fit=crop&q=80&w=600',
    inStock: true,
  },
  {
    id: '2',
    name: 'Máy Chiếu BEECUBE Harmony',
    slug: 'beecube-harmony',
    price: 3990000,
    image: 'https://images.unsplash.com/photo-1626244669527-5ab16260abac?auto=format&fit=crop&q=80&w=600',
    inStock: false,
  }
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Danh Sách Yêu Thích</h1>
            <p className="text-zinc-400">Bạn có {wishlistItems.length} sản phẩm trong danh sách</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center text-zinc-400 hover:text-white transition-colors mt-4 md:mt-0">
            Tiếp tục mua sắm <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors gap-6 relative group"
              >
                <div className="relative w-full sm:w-48 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-black shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1 w-full text-center sm:text-left">
                  <Link href={`/products/${item.slug}`} className="hover:text-primary transition-colors">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.name}</h3>
                  </Link>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm mb-4">
                    <span className={item.inStock ? "text-emerald-400" : "text-rose-400"}>
                      {item.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span className="text-zinc-400">Giao hàng dự kiến: 2-3 ngày</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <span className="text-2xl font-bold text-white">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-zinc-500 line-through">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center justify-center gap-3 w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
                  <Button 
                    className="w-full sm:w-40 rounded-full h-12 text-sm font-medium"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-40 rounded-full h-12 text-sm font-medium border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/20 rounded-3xl border border-zinc-800/50">
            <Heart className="w-16 h-16 mx-auto text-zinc-600 mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Danh sách trống</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Bạn chưa có sản phẩm nào trong danh sách yêu thích. Hãy quay lại trang sản phẩm để thêm những thiết bị bạn quan tâm.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 h-14">
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
