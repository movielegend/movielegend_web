'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

function WarrantyComponent() {
  const searchParams = useSearchParams();
  const serialParam = searchParams.get('serial') || '';
  const productParam = searchParams.get('product') || '';
  const actionParam = searchParams.get('action') || 'lookup';

  const [activeTab, setActiveTab] = useState<'lookup' | 'activate'>(actionParam as 'lookup' | 'activate');

  // Lookup state
  const [lookupSerial, setLookupSerial] = useState(serialParam);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState('');

  // Activation state
  const [actSerial, setActSerial] = useState(serialParam);
  const [actProduct, setActProduct] = useState(productParam);
  const [actName, setActName] = useState('');
  const [actPhone, setActPhone] = useState('');
  const [actEmail, setActEmail] = useState('');
  const [actOrderId, setActOrderId] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activateSuccess, setActivateSuccess] = useState(false);
  const [activateError, setActivateError] = useState('');

  useEffect(() => {
    if (serialParam) {
      setLookupSerial(serialParam);
      setActSerial(serialParam);
    }
    if (productParam) setActProduct(productParam);
  }, [serialParam, productParam]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupSerial.trim()) return;

    try {
      setIsLookingUp(true);
      setLookupError('');
      setLookupResult(null);

      const res = await fetch(`/api/warranty/lookup?serial=${encodeURIComponent(lookupSerial.trim())}`);
      const data = await res.json();

      if (res.ok && data.found) {
        setLookupResult(data);
      } else {
        setLookupError(data.message || data.error || 'Không tìm thấy dữ liệu bảo hành cho số Serial này.');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setLookupError('Lỗi kết nối máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actSerial.trim() || !actName.trim() || !actPhone.trim()) {
      setActivateError('Vui lòng điền đầy đủ số Serial, Họ tên và Số điện thoại.');
      return;
    }

    try {
      setIsActivating(true);
      setActivateError('');

      const res = await fetch('/api/warranty/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serial: actSerial.trim(),
          fullName: actName.trim(),
          phone: actPhone.trim(),
          email: actEmail.trim(),
          orderId: actOrderId.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActivateSuccess(true);
      } else {
        setActivateError(data.error || 'Kích hoạt thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Activate error:', err);
      setActivateError('Lỗi kết nối máy chủ. Vui lòng thử lại.');
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="max-w-xl w-full relative z-10 mx-auto text-slate-900">
      <div className="text-center mb-10">
        <span className="text-sky-600 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Movie Legend Service</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">Dịch Vụ Bảo Hành</h1>
        <p className="text-slate-600 font-normal text-sm">
          Kiểm tra trạng thái hoặc đăng ký kích hoạt bảo hành cho thiết bị của bạn.
        </p>
      </div>

      <div className="flex bg-white/60 backdrop-blur-xl rounded-full p-1.5 border border-slate-200/80 mb-8 mx-auto w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('lookup')}
          className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
            activeTab === 'lookup' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tra Cứu
        </button>
        <button
          onClick={() => setActiveTab('activate')}
          className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
            activeTab === 'activate' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kích Hoạt
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'lookup' && (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Tra Cứu Bảo Hành</h2>
              <form onSubmit={handleLookup} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Số Serial Thiết Bị</label>
                  <input 
                    type="text" 
                    value={lookupSerial}
                    onChange={(e) => setLookupSerial(e.target.value)}
                    required
                    placeholder="VD: SN-WARRANTY-1"
                    className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 font-mono uppercase"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 text-base font-bold tracking-wide bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2"
                  disabled={isLookingUp}
                >
                  {isLookingUp ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Tra Cứu Trạng Thái'}
                </Button>
              </form>

              {lookupError && (
                <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{lookupError}</p>
                </div>
              )}

              {lookupResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-slate-200/80"
                >
                  <h3 className="text-lg font-bold mb-4 text-slate-900">Kết Quả Tra Cứu</h3>
                  <div className="bg-white/80 rounded-xl p-5 border border-slate-200/60 space-y-4 text-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Sản phẩm</span>
                      <span className="font-bold text-right text-slate-900">{lookupResult.productName}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Số Serial</span>
                      <span className="font-mono text-sky-600 font-bold">{lookupResult.serial}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Khách hàng</span>
                      <span className="font-bold text-slate-900">{lookupResult.customerName}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Trạng thái</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${lookupResult.status === 'valid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                        {lookupResult.status === 'valid' ? 'CÒN HẠN BẢO HÀNH' : 'HẾT HẠN BẢO HÀNH'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Hạn bảo hành</span>
                      <span className="font-bold text-slate-900">{lookupResult.expirationDate}</span>
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
                  <h2 className="text-2xl font-bold mb-6 text-slate-900">Kích Hoạt Thiết Bị Mới</h2>
                  
                  {activateError && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs">
                      {activateError}
                    </div>
                  )}

                  <form onSubmit={handleActivate} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Số Serial Thiết Bị *</label>
                      <input 
                        type="text" 
                        value={actSerial}
                        onChange={(e) => setActSerial(e.target.value)}
                        required
                        placeholder="VD: SN-WARRANTY-100"
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 font-mono uppercase text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Họ và Tên *</label>
                        <input 
                          type="text" 
                          value={actName}
                          onChange={(e) => setActName(e.target.value)}
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full bg-white/80 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-600 transition-colors text-slate-900 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Số Điện Thoại *</label>
                        <input 
                          type="tel" 
                          value={actPhone}
                          onChange={(e) => setActPhone(e.target.value)}
                          required
                          placeholder="0901234567"
                          className="w-full bg-white/80 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-600 transition-colors text-slate-900 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email (Tùy chọn)</label>
                      <input 
                        type="email" 
                        value={actEmail}
                        onChange={(e) => setActEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-sky-600 transition-colors text-slate-900 text-sm"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full py-6 text-base font-bold tracking-wide bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2"
                        disabled={isActivating}
                      >
                        {isActivating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gửi Yêu Cầu Kích Hoạt'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full py-10">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">Kích Hoạt Thành Công!</h3>
                  <p className="text-slate-600 text-sm mb-6 max-w-sm">
                    Thiết bị với Serial <span className="font-mono text-sky-600 font-bold">{actSerial}</span> đã được đăng ký bảo hành chính hãng 12 tháng.
                  </p>
                  <Button onClick={() => setActivateSuccess(false)} className="px-8 bg-sky-600 text-white hover:bg-sky-500 font-bold">
                    Kích Hoạt Thiết Bị Khác
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
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 px-6 selection:bg-sky-500 selection:text-white">
      <Suspense fallback={<div className="text-center pt-20">Đang tải...</div>}>
        <WarrantyComponent />
      </Suspense>
    </main>
  );
}
