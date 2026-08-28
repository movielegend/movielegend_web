'use client';

import React, { useState } from 'react';
import { Plus, Search, ShieldCheck, RefreshCw, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WarrantyManagerProps {
  initialWarranties: any[];
}

export default function WarrantyManager({ initialWarranties }: WarrantyManagerProps) {
  const [warranties, setWarranties] = useState(initialWarranties);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serial, setSerial] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchWarranties = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/warranty-registrations');
      if (res.ok) {
        const data = await res.json();
        setWarranties(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serial || !fullName || !phone) return;

    try {
      setSaving(true);
      const res = await fetch('/api/warranty/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial, fullName, phone })
      });

      if (res.ok) {
        setIsModalOpen(false);
        setSerial('');
        setFullName('');
        setPhone('');
        fetchWarranties();
      }
    } catch (err) {
      console.error('Activation error:', err);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dStr: string) => {
    if (!dStr) return 'N/A';
    return new Date(dStr).toLocaleDateString('vi-VN');
  };

  const filtered = warranties.filter(item => {
    const s = search.toLowerCase();
    const serialStr = item.serialNumber?.serial?.toLowerCase() || '';
    const customerStr = item.customer?.fullName?.toLowerCase() || '';
    const phoneStr = item.customer?.phone?.toLowerCase() || '';
    return serialStr.includes(s) || customerStr.includes(s) || phoneStr.includes(s);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Bảo Hành</h1>
          <p className="text-gray-400">Theo dõi mã Serial Number và danh sách kích hoạt bảo hành.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          <Plus className="w-4 h-4" /> Kích Hoạt Bảo Hành Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm theo Serial, Tên, SĐT..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button onClick={fetchWarranties} variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Số Serial</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Số Điện Thoại</th>
                <th className="px-6 py-4">Sản Phẩm</th>
                <th className="px-6 py-4">Ngày Kích Hoạt</th>
                <th className="px-6 py-4">Hạn Bảo Hành</th>
                <th className="px-6 py-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => {
                const isExpired = item.expiryDate ? new Date(item.expiryDate) < new Date() : false;

                return (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-movielegend-500">{item.serialNumber?.serial || 'N/A'}</td>
                    <td className="px-6 py-4 text-white font-medium">{item.customer?.fullName || 'N/A'}</td>
                    <td className="px-6 py-4">{item.customer?.phone || 'N/A'}</td>
                    <td className="px-6 py-4">{item.serialNumber?.product?.name || 'Máy chiếu MovieLegend'}</td>
                    <td className="px-6 py-4">{formatDate(item.purchaseDate)}</td>
                    <td className="px-6 py-4 text-white">{formatDate(item.expiryDate)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max gap-1 ${
                        !isExpired ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        <ShieldCheck className="w-3 h-3" />
                        {!isExpired ? 'Còn Hạn' : 'Hết Hạn'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    Không tìm thấy dữ liệu bảo hành nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Kích Hoạt Bảo Hành Mới</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleActivateSubmit} className="space-y-4 text-sm">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Số Serial thiết bị *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="VD: SN-WARRANTY-100" 
                  value={serial} 
                  onChange={(e) => setSerial(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Họ tên khách hàng *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Nguyễn Văn A" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Số điện thoại *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="0901234567" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} className="rounded-full text-xs font-bold bg-movielegend-500 text-black hover:bg-amber-400 flex items-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Kích Hoạt
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
