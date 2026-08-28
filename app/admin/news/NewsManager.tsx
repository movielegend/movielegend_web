'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsManagerProps {
  initialNews: any[];
}

export default function NewsManager({ initialNews }: NewsManagerProps) {
  const [newsList, setNewsList] = useState(initialNews);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingNews(null);
    setTitle('');
    setSlug('');
    setContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingNews(item);
    setTitle(item.title || '');
    setSlug(item.slug || '');
    setContent(item.content || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setSaving(true);
      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const body = { title, slug: generatedSlug, content };

      let res;
      if (editingNews) {
        res = await fetch(`/api/news/${editingNews.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      } else {
        res = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchNews();
      }
    } catch (err) {
      console.error('Save news error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNewsList(newsList.filter(n => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  const filtered = newsList.filter(n => {
    const s = search.toLowerCase();
    return (n.title?.toLowerCase() || '').includes(s) || (n.slug?.toLowerCase() || '').includes(s);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản Lý Tin Tức & Blog</h1>
          <p className="text-gray-400">Danh sách bài viết tin tức và kinh nghiệm xem phim.</p>
        </div>
        <Button onClick={openAddModal} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          <Plus className="w-4 h-4" /> Viết Bài Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button onClick={fetchNews} variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Tải lại
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Tiêu Đề</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Ngày Tạo</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-md truncate">{item.title}</td>
                  <td className="px-6 py-4 font-mono text-xs text-movielegend-500">{item.slug}</td>
                  <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
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
                  <td colSpan={4} className="text-center py-12 text-gray-500">
                    Chưa có bài viết nào.
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
          <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 text-left">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingNews ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Tiêu đề bài viết *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Top 5 máy chiếu gia đình tốt nhất..." 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Slug URL</label>
                <input 
                  type="text" 
                  placeholder="top-5-may-chieu-gia-dinh" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Nội dung bài viết *</label>
                <textarea 
                  required 
                  rows={6} 
                  placeholder="Nhập nội dung chi tiết bài viết..." 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-movielegend-500 resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                  Hủy
                </Button>
                <Button type="submit" disabled={saving} className="rounded-full text-xs font-bold bg-movielegend-500 text-black hover:bg-amber-400 flex items-center gap-2">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {editingNews ? 'Cập Nhật' : 'Đăng Bài'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
