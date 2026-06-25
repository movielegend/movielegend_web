'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

function WarrantyComponent() {
  const searchParams = useSearchParams();
  const serialParam = searchParams.get('serial') || '';
  const productParam = searchParams.get('product') || '';
  const actionParam = searchParams.get('action') || 'lookup'; // 'lookup' or 'activate'

  const [activeTab, setActiveTab] = useState<'lookup' | 'activate'>(actionParam as 'lookup' | 'activate');

  // Lookup state
  const [lookupSerial, setLookupSerial] = useState(serialParam);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);

  // Activation state
  const [actSerial, setActSerial] = useState(serialParam);
  const [actProduct, setActProduct] = useState(productParam);
  const [actName, setActName] = useState('');
  const [actPhone, setActPhone] = useState('');
  const [actOrderId, setActOrderId] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [purchaseSource, setPurchaseSource] = useState('');
  const [activateSuccess, setActivateSuccess] = useState(false);

  useEffect(() => {
    if (serialParam) {
      setLookupSerial(serialParam);
      setActSerial(serialParam);
    }
    if (productParam) setActProduct(productParam);
  }, [serialParam, productParam]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLookingUp(true);
    // Simulate API call
    setTimeout(() => {
      setIsLookingUp(false);
      setLookupResult({
        product: 'Máy chiếu Movie Legend S6',
        serial: lookupSerial,
        activationDate: '2023-10-15',
        expirationDate: '2024-10-15',
        status: 'valid' // valid, expired, not_found
      });
    }, 1000);
  };

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setActivateSuccess(true);
    }, 1500);
  };

  return (
    <div className="max-w-xl w-full relative z-10 mx-auto">
      <div className="text-center mb-10">
        <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase mb-4 block">Movie Legend Service</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Dịch Vụ Bảo Hành</h1>
        <p className="text-gray-400 font-light text-sm">
          Kiểm tra trạng thái hoặc đăng ký kích hoạt bảo hành cho thiết bị của bạn.
        </p>
      </div>

      <div className="flex bg-[#0a0a0a] rounded-full p-1 border border-white/10 mb-8 mx-auto w-fit">
        <button
          onClick={() => setActiveTab('lookup')}
          className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'lookup' ? 'bg-movielegend-500 text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Tra Cứu
        </button>
        <button
          onClick={() => setActiveTab('activate')}
          className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'activate' ? 'bg-movielegend-500 text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Kích Hoạt
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'lookup' && (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Tra Cứu Bảo Hành</h2>
              <form onSubmit={handleLookup} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Số Serial Thiết Bị</label>
                  <input 
                    type="text" 
                    value={lookupSerial}
                    onChange={(e) => setLookupSerial(e.target.value)}
                    required
                    placeholder="VD: MLS6-00123"
                    className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600 font-mono uppercase"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 text-base font-bold tracking-wide"
                  disabled={isLookingUp}
                >
                  {isLookingUp ? 'Đang Tra Cứu...' : 'Tra Cứu Trạng Thái'}
                </Button>
              </form>

              {lookupResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <h3 className="text-lg font-semibold mb-4 text-white">Kết Quả Tra Cứu</h3>
                  <div className="bg-[#141417] rounded-xl p-5 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-400 text-sm">Sản phẩm</span>
                      <span className="font-medium text-right pl-4">{lookupResult.product}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-400 text-sm">Số Serial</span>
                      <span className="font-mono text-movielegend-500">{lookupResult.serial}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-400 text-sm">Trạng thái</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${lookupResult.status === 'valid' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {lookupResult.status === 'valid' ? 'CÒN HẠN BẢO HÀNH' : 'HẾT HẠN'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Hạn bảo hành</span>
                      <span className="font-medium">{lookupResult.expirationDate}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'activate' && (
            <motion.div
              key="activate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {!activateSuccess ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Kích Hoạt Thiết Bị Mới</h2>
                  <form onSubmit={handleActivate} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Số Serial</label>
                      <input 
                        type="text" 
                        value={actSerial}
                        onChange={(e) => setActSerial(e.target.value)}
                        required
                        placeholder="VD: MLS6-00123"
                        className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600 font-mono uppercase"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Mã Sản Phẩm</label>
                      <input 
                        type="text" 
                        value={actProduct}
                        onChange={(e) => setActProduct(e.target.value)}
                        required
                        placeholder="VD: MLS6"
                        className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600 font-mono uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Họ và Tên</label>
                          <input 
                            type="text" 
                            value={actName}
                            onChange={(e) => setActName(e.target.value)}
                            required
                            placeholder="Tên của bạn"
                            className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Số Điện Thoại</label>
                          <input 
                            type="tel" 
                            value={actPhone}
                            onChange={(e) => setActPhone(e.target.value)}
                            required
                            placeholder="0987..."
                            className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600"
                          />
                      </div>
                      <div className="space-y-2 col-span-1 sm:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">ID đơn hàng</label>
                        <input 
                          type="tel" 
                          value={actOrderId}
                          onChange={(e) => setActOrderId(e.target.value)}
                          required
                          placeholder="ID đơn hàng"
                          className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-gray-600"
                        />
                      </div>
                      
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                        Mua tại
                      </label>

                      <div className="relative">
                        <select
                          value={purchaseSource}
                          onChange={(e) => setPurchaseSource(e.target.value)}
                          required
                          className="
                            w-full
                            h-[58px]
                            appearance-none
                            bg-[#141417]
                            border
                            border-white/5
                            rounded-xl
                            px-5
                            pr-12
                            outline-none
                            transition-all
                            duration-300
                            text-white
                            focus:border-movielegend-500
                            hover:border-white/10
                          "
                        >
                          <option value="">Chọn nơi mua</option>
                          <option value="tiktok">TikTok Shop</option>
                          <option value="shopee">Shopee Mall</option>
                          <option value="lazada">LazMall</option>
                          <option value="tiki">Tiki Trading</option>
                          <option value="store">Cửa hàng</option>
                          <option value="dealer">Đại lý MovieLegend</option>
                          <option value="other">Khác</option>
                        </select>

                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    </div>    

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full py-6 text-base font-bold tracking-wide"
                        disabled={isActivating}
                      >
                        {isActivating ? 'Đang Xử Lý...' : 'Gửi Yêu Cầu Kích Hoạt'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full py-10">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Kích Hoạt Thành Công</h3>
                  <p className="text-gray-400 mb-8 max-w-sm">
                    Sản phẩm <span className="text-white font-medium">{actProduct}</span> với Serial <span className="font-mono text-white">{actSerial}</span> đã được đăng ký thành công.
                  </p>
                  <Button onClick={() => setActivateSuccess(false)} className="px-8">
                    Kích Hoạt Thêm
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 selection:bg-movielegend-500 selection:text-black">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(245,179,52,0.15),_transparent_70%)] pointer-events-none" />
      <Suspense fallback={<div className="text-center pt-20">Đang tải...</div>}>
        <WarrantyComponent />
      </Suspense>
    </main>
  );
}
