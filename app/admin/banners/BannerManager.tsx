'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check, Loader2, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerManagerProps {
  initialBanners: any[];
}

export default function BannerManager({ initialBanners }: BannerManagerProps) {
  const [banners, setBanners] = useState(initialBanners);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('#');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/banners');
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle('');
    setImageUrl('');
    setLink('#');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (b: any) => {
    setEditingBanner(b);
    setTitle(b.title || '');
    setImageUrl(b.imageUrl || '');
    setLink(b.link || '#');
    setIsActive(b.isActive !== undefined ? b.isActive : true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    try {
      setSaving(true);
      const body = { title, imageUrl, link, isActive };

      let res;
      if (editingBanner) {
        res = await fetch(`/api/banners/${editingBanner.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        res = await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchBanners();
      }
    } catch (err) {
      console.error('Save banner error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa banner này?')) return;
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBanners(banners.filter(b => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = banners.filter(b => (b.title?.toLowerCase() || '').includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Banners & Quảng Cáo</h1>
          <p className="text-gray-400">Banner hiển thị ngoài trang chủ và các mục sản phẩm.</p>
        </div>
        <Button onClick={openAddModal} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          <Plus className="w-4 h-4" /> Thêm Banner Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm banner..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button onClick={fetchBanners} variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Hình Ảnh</th>
                <th className="px-6 py-4">Tiêu Đề</th>
                <th className="px-6 py-4">Liên Kết</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((banner) => (
                <tr key={banner.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-24 h-12 rounded-lg bg-black overflow-hidden border border-white/10 relative">
                      {banner.imageUrl && (
                        <img src={banner.imageUrl} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{banner.title}</td>
                  <td className="px-6 py-4 font-mono text-xs text-movielegend-500">{banner.link || '#'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      banner.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {banner.isActive ? 'Hoạt động' : 'Tạm ẩn'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(banner)}
                        className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(banner.id)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    Chưa có banner nào.
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
                {editingBanner ? 'Chỉnh Sửa Banner' : 'Thêm Banner Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Tiêu đề banner *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Khuyến mãi mùa hè 2026" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">URL Hình ảnh *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="https://..." 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Đường dẫn liên kết (Link)</label>
                <input 
                  type="text" 
                  placeholder="/products" 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-[#141417] text-movielegend-500 focus:ring-0"
                />
                <label htmlFor="isActive" className="text-sm text-gray-300">Hiển thị banner trên website</label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} className="rounded-full text-xs font-bold bg-movielegend-500 text-black hover:bg-amber-400 flex items-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {editingBanner ? 'Cập Nhật' : 'Tạo Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
