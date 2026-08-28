'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerManagerProps {
  initialCustomers: any[];
}

export default function CustomerManager({ initialCustomers }: CustomerManagerProps) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCustomer(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditingCustomer(c);
    setFullName(c.fullName || '');
    setPhone(c.phone || '');
    setEmail(c.email || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    try {
      setSaving(true);
      const body = { fullName, phone, email };

      let res;
      if (editingCustomer) {
        res = await fetch(`/api/customers/${editingCustomer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        res = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchCustomers();
      }
    } catch (err) {
      console.error('Save customer error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;
    try {
      const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCustomers(customers.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (p: number) => {
    return p.toLocaleString('vi-VN') + ' đ';
  };

  const filtered = customers.filter(c => {
    const s = search.toLowerCase();
    return (c.fullName?.toLowerCase() || '').includes(s) ||
      (c.phone?.toLowerCase() || '').includes(s) ||
      (c.email?.toLowerCase() || '').includes(s);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Khách Hàng</h1>
          <p className="text-gray-400">Danh sách khách hàng và thống kê tổng chi tiêu.</p>
        </div>
        <Button onClick={openAddModal} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          <Plus className="w-4 h-4" /> Thêm Khách Hàng Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm theo tên, SĐT, Email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button onClick={fetchCustomers} variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Số Điện Thoại</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Số Đơn</th>
                <th className="px-6 py-4">Tổng Chi Tiêu</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((customer) => {
                const ordersArr = customer.orders || [];
                const totalSpent = ordersArr.reduce((acc: number, o: any) => acc + Number(o.totalAmount || 0), 0);

                return (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{customer.fullName}</td>
                    <td className="px-6 py-4 font-mono text-movielegend-500">{customer.phone}</td>
                    <td className="px-6 py-4">{customer.email || 'N/A'}</td>
                    <td className="px-6 py-4 text-center font-bold text-white">{ordersArr.length}</td>
                    <td className="px-6 py-4 font-bold text-white">{formatPrice(totalSpent)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(customer)}
                          className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    Không tìm thấy khách hàng nào.
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
              <h2 className="text-xl font-bold text-white">
                {editingCustomer ? 'Chỉnh Sửa Khách Hàng' : 'Thêm Khách Hàng Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Họ và tên *</label>
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
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} className="rounded-full text-xs font-bold bg-movielegend-500 text-black hover:bg-amber-400 flex items-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {editingCustomer ? 'Cập Nhật' : 'Tạo Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
