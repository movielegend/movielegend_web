'use client';

import React from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const news = [
  { id: 1, title: 'Top 5 Máy Chiếu Dành Cho Gia Đình Tốt Nhất 2024', category: 'Review Sản Phẩm', author: 'Admin', date: '2023-10-25', status: 'Published', views: 1250 },
  { id: 2, title: 'Hướng Dẫn Lắp Đặt Màn Chiếu Tại Nhà', category: 'Thủ Thuật', author: 'Editor', date: '2023-10-20', status: 'Draft', views: 0 },
  { id: 3, title: 'Movie Legend Khai Trương Showroom Mới', category: 'Tin Tức Công Ty', author: 'Admin', date: '2023-10-15', status: 'Published', views: 340 },
];

export default function AdminNewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tin Tức & Blog</h1>
          <p className="text-gray-400">Quản lý bài viết, chuyên mục và nội dung SEO.</p>
        </div>
        <Button className="rounded-full flex items-center gap-2">
          <Plus className="w-4 h-4" /> Viết Bài Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80 focus-within:border-movielegend-500/50 transition-colors">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button className="rounded-lg text-sm bg-transparent border border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Lọc
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Tiêu Đề</th>
                <th className="px-6 py-4">Chuyên Mục</th>
                <th className="px-6 py-4">Tác Giả</th>
                <th className="px-6 py-4">Ngày Đăng</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4">Lượt Xem</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate" title={item.title}>{item.title}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.author}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.views}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
          <p>Hiển thị 1-3 của 24 bài viết</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
}