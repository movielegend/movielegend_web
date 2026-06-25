'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const initialCart = [
  {
    id: '1',
    name: 'Máy Chiếu BEECUBE Xtreme II Gen 2',
    slug: 'beecube-xtreme-ii-gen-2',
    price: 6490000,
    image: 'https://images.unsplash.com/photo-1585799705912-32b0dd8a4783?auto=format&fit=crop&q=80&w=600',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Màn chiếu quang học 100 inch',
    slug: 'man-chieu-quang-hoc-100-inch',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
    quantity: 1,
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 selection:bg-movielegend-500 selection:text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Giỏ Hàng Của Bạn</h1>
          <p className="text-zinc-400">Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 gap-6 relative"
                >
                  <div className="relative w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-black shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 w-full flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <Link href={`/products/${item.slug}`} className="hover:text-movielegend-500 transition-colors">
                        <h3 className="text-xl font-semibold line-clamp-2">{item.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-rose-500 transition-colors p-2 -mr-2"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-end justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-4 bg-black rounded-full border border-zinc-800 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-6 border-t border-zinc-800">
                <Link href="/products" className="text-movielegend-500 hover:text-white transition-colors font-medium flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-8 sticky top-32">
                <h2 className="text-2xl font-bold mb-8">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4 mb-8 text-zinc-300">
                  <div className="flex justify-between">
                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span className="font-medium text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span className="font-medium text-emerald-400">Miễn phí</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-movielegend-500">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-6 mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-lg">Tổng cộng</span>
                    <span className="text-4xl font-bold text-white">{formatPrice(total)}</span>
                  </div>
                  <p className="text-right text-xs text-zinc-500">Đã bao gồm VAT</p>
                </div>

                <Button className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Tiến Hành Thanh Toán
                </Button>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <Truck className="w-5 h-5 text-zinc-500" />
                    Giao hàng hỏa tốc trong 2h tại Hà Nội & TP.HCM
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <ShieldCheck className="w-5 h-5 text-zinc-500" />
                    Bảo hành chính hãng 12-24 tháng
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/20 rounded-[3rem] border border-zinc-800/50">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-zinc-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Giỏ hàng trống</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto text-lg">
              Chưa có sản phẩm nào trong giỏ hàng của bạn. Hãy khám phá các thiết bị trình chiếu đẳng cấp của chúng tôi.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold">
                Bắt Đầu Mua Sắm
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
