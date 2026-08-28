'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const total = getTotalPrice();

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      setErrorMsg('Vui lòng điền họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const payload = {
        fullName,
        phone,
        email,
        shippingAddr: address,
        note,
        paymentMethod: 'COD',
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderSuccess(data.order);
        clearCart();
      } else {
        setErrorMsg(data.error || 'Đặt hàng thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg('Đã có lỗi xảy ra. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-sky-500 selection:text-white">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[3rem] p-12 shadow-2xl">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-slate-900">Đặt Hàng Thành Công!</h1>
            <p className="text-slate-600 text-lg mb-6 font-normal">
              Cảm ơn bạn đã lựa chọn MovieLegend. Mã đơn hàng của bạn là{' '}
              <span className="font-bold text-sky-600">#{orderSuccess.id}</span>.
            </p>

            <div className="bg-white/80 border border-slate-200/60 rounded-2xl p-6 mb-8 text-left space-y-3 text-sm text-slate-700">
              <p><strong className="text-slate-900">Người nhận:</strong> {orderSuccess.customer?.fullName}</p>
              <p><strong className="text-slate-900">Số điện thoại:</strong> {orderSuccess.customer?.phone}</p>
              <p><strong className="text-slate-900">Địa chỉ giao:</strong> {orderSuccess.shippingAddr}</p>
              <p><strong className="text-slate-900">Tổng tiền:</strong> <span className="text-xl font-black text-sky-600 ml-2">{formatPrice(Number(orderSuccess.totalAmount))}</span></p>
            </div>

            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 bg-sky-600 text-white font-bold hover:bg-sky-500">
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-sky-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Giỏ Hàng Của Bạn</h1>
          <p className="text-slate-500">Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-center p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/80 gap-6 relative shadow-sm"
                >
                  <div className="relative w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 w-full flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <Link href={`/products/${item.slug}`} className="hover:text-sky-600 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-2">{item.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-2 -mr-2"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-end justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-4 bg-white/80 rounded-full border border-slate-300 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-600"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-2xl font-black text-sky-600">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-6 border-t border-slate-200/60">
                <Link href="/products" className="text-sky-600 hover:text-sky-700 transition-colors font-bold flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Order Summary & Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/80 p-8 sticky top-32 shadow-xl">
                <h2 className="text-2xl font-bold mb-8 text-slate-900">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-4 mb-8 text-slate-600">
                  <div className="flex justify-between">
                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span className="font-bold text-slate-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span className="font-bold text-emerald-600">Miễn phí</span>
                  </div>
                </div>

                <div className="border-t border-slate-200/80 pt-6 mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-bold text-slate-900">Tổng cộng</span>
                    <span className="text-4xl font-black text-sky-600">{formatPrice(total)}</span>
                  </div>
                  <p className="text-right text-xs text-slate-400">Đã bao gồm VAT</p>
                </div>

                {!isCheckoutModalOpen ? (
                  <Button 
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2 bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25"
                  >
                    <ShieldCheck className="w-5 h-5" /> Tiến Hành Thanh Toán
                  </Button>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                    <h3 className="font-bold text-lg text-slate-900 border-b border-slate-200/80 pb-2 mb-3">Thông Tin Giao Hàng</h3>
                    
                    {errorMsg && (
                      <p className="text-xs text-rose-500 bg-rose-500/10 p-2.5 rounded-lg">{errorMsg}</p>
                    )}

                    <div>
                      <label className="text-xs text-slate-600 font-semibold mb-1 block">Họ và tên *</label>
                      <input 
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-sky-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-600 font-semibold mb-1 block">Số điện thoại *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="0901234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-sky-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-600 font-semibold mb-1 block">Email (Tùy chọn)</label>
                      <input 
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-sky-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-600 font-semibold mb-1 block">Địa chỉ nhận hàng *</label>
                      <textarea 
                        required
                        rows={2}
                        placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-sky-600 resize-none"
                      />
                    </div>

                    <div className="pt-2 flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsCheckoutModalOpen(false)}
                        className="w-1/3 py-3 rounded-full text-xs"
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-2/3 py-3 rounded-full text-sm font-bold bg-sky-600 text-white hover:bg-sky-500 flex items-center justify-center gap-2"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Xác Nhận Đặt Hàng'}
                      </Button>
                    </div>
                  </form>
                )}

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Truck className="w-5 h-5 text-sky-600" />
                    Giao hàng hỏa tốc toàn quốc
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <ShieldCheck className="w-5 h-5 text-sky-600" />
                    Bảo hành chính hãng 12-24 tháng
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-white/50 backdrop-blur-xl rounded-[3rem] border border-slate-200/80 shadow-sm">
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-sky-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Giỏ hàng trống</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg font-normal">
              Chưa có sản phẩm nào trong giỏ hàng của bạn. Hãy khám phá các thiết bị trình chiếu đẳng cấp của chúng tôi.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold bg-sky-600 text-white hover:bg-sky-500">
                Bắt Đầu Mua Sắm
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
