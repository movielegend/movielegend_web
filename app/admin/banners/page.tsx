'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import Image from 'next/image';

const mockBanners = [
  { id: 'BN-001', title: 'Khuyến mãi mùa hè 2024', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop', position: 'Trang chủ', status: 'Hoạt động', order: 1, date: '15/06/2024' },
  { id: 'BN-002', title: 'Máy chiếu Laser 4K Mới', image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop', position: 'Danh mục sản phẩm', status: 'Hoạt động', order: 2, date: '12/06/2024' },
  { id: 'BN-003', title: 'Giải pháp âm thanh rạp hát', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop', position: 'Trang chủ', status: 'Tạm ẩn', order: 3, date: '10/06/2024' },
  { id: 'BN-004', title: 'Lắp đặt tận nhà miễn phí', image: 'https://images.unsplash.com/photo-1540228232483-1b64a7024923?q=80&w=1974&auto=format&fit=crop', position: 'Khuyến mãi', status: 'Hoạt động', order: 4, date: '05/06/2024' },
  { id: 'BN-005', title: 'Khai trương Showroom mới', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop', position: 'Tin tức', status: 'Hoạt động', order: 5, date: '01/06/2024' },
];

export default function BannersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Tất cả');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Banner & Media</h1>
          <p className="text-sm text-gray-400">Quản lý hình ảnh, banner quảng cáo trên website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-movielegend-500 hover:bg-movielegend-400 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,179,52,0.3)] hover:shadow-[0_0_20px_rgba(245,179,52,0.5)] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm Banner Mới
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[20px] border border-white/[0.05] p-4 flex flex-col md:flex-row gap-4 justify-between items-center"
      >
        <div className="flex items-center gap-2 bg-[#141417] p-1 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto scrollbar-none">
          {['Tất cả', 'Trang chủ', 'Danh mục', 'Khuyến mãi', 'Tin tức'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-movielegend-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm kiếm banner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#141417] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-movielegend-500/50 focus:bg-white/[0.02] transition-all"
            />
          </div>
          <button className="p-2 bg-[#141417] hover:bg-white/10 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-all shrink-0">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[24px] border border-white/[0.05] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium w-16">
                  <ArrowUpDown className="w-4 h-4 hover:text-white cursor-pointer" />
                </th>
                <th scope="col" className="px-6 py-4 font-medium">Hình ảnh & Tiêu đề</th>
                <th scope="col" className="px-6 py-4 font-medium">Vị trí hiển thị</th>
                <th scope="col" className="px-6 py-4 font-medium">Trạng thái</th>
                <th scope="col" className="px-6 py-4 font-medium">Ngày tạo</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {mockBanners.map((banner, i) => (
                <tr key={banner.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                    {banner.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-12 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0 group-hover:border-movielegend-500/50 transition-colors">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={banner.image} 
                          alt={banner.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium hover:text-movielegend-500 cursor-pointer transition-colors line-clamp-1">{banner.title}</span>
                        <span className="text-[11px] text-gray-500 mt-0.5">{banner.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-gray-300 border border-white/10">
                      {banner.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {banner.status === 'Hoạt động' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                        Hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
                        Tạm ẩn
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                    {banner.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white/5 hover:bg-movielegend-500/20 text-gray-400 hover:text-movielegend-500 rounded-lg transition-colors border border-transparent hover:border-movielegend-500/30" title="Chỉnh sửa">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-500 rounded-lg transition-colors border border-transparent hover:border-rose-500/30" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors ml-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-white/[0.05] flex items-center justify-between text-sm text-gray-500">
          <span>Hiển thị 1 đến 5 của 5 kết quả</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-white/5 rounded-md hover:bg-white/10 text-white transition-colors cursor-not-allowed opacity-50">Trước</button>
            <button className="px-3 py-1 bg-movielegend-500/20 border border-movielegend-500/30 text-movielegend-500 rounded-md">1</button>
            <button className="px-3 py-1 bg-white/5 rounded-md hover:bg-white/10 text-white transition-colors cursor-not-allowed opacity-50">Sau</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
