'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Share2, 
  Mail, 
  Palette,
  Save,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

const tabs = [
  { id: 'info', label: 'Thông tin Website', icon: Globe },
  { id: 'seo', label: 'Cấu hình SEO', icon: Search },
  { id: 'social', label: 'Mạng xã hội', icon: Share2 },
  { id: 'contact', label: 'Liên hệ & Hỗ trợ', icon: Mail },
  { id: 'appearance', label: 'Giao diện', icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('info');

  const renderContent = () => {
    switch(activeTab) {
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Tên website</label>
                <input type="text" defaultValue="MovieLegend Việt Nam" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Slogan</label>
                <input type="text" defaultValue="Huyền thoại điện ảnh tại gia" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email liên hệ chính</label>
                <input type="email" defaultValue="contact@movielegend.vn" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Hotline chính</label>
                <input type="text" defaultValue="0987 654 321" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-300">Địa chỉ văn phòng / Showroom</label>
                <input type="text" defaultValue="Tòa nhà ABC, 123 Đường XYZ, Quận 1, TP. Hồ Chí Minh" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
            </div>
          </motion.div>
        );
      case 'seo':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Title (Tiêu đề SEO)</label>
              <input type="text" defaultValue="MovieLegend Việt Nam - Máy chiếu Laser 4K Cao Cấp" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              <p className="text-[11px] text-gray-500">Tiêu đề xuất hiện trên tab trình duyệt và kết quả tìm kiếm Google (tối đa 60 ký tự).</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Description (Mô tả SEO)</label>
              <textarea rows={3} defaultValue="MovieLegend Việt Nam mang đến máy chiếu Laser 4K, màn chiếu và dịch vụ lắp đặt cao cấp cho không gian gia đình và doanh nghiệp." className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors resize-none"></textarea>
              <p className="text-[11px] text-gray-500">Mô tả ngắn gọn về nội dung website (khoảng 150-160 ký tự).</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Meta Keywords</label>
              <input type="text" defaultValue="máy chiếu 4k, máy chiếu laser, movielegend, rạp chiếu phim tại gia" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Open Graph Image (Ảnh chia sẻ mạng xã hội)</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-movielegend-500/10 transition-colors group-hover:text-movielegend-500">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-movielegend-500" />
                </div>
                <p className="text-sm font-medium text-white mb-1">Click để tải ảnh lên</p>
                <p className="text-xs text-gray-500">Kích thước khuyến nghị: 1200x630px. Định dạng: JPG, PNG, WEBP.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'social':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {[
              { label: 'Facebook Page URL', value: 'https://facebook.com/movielegendvn' },
              { label: 'YouTube Channel URL', value: 'https://youtube.com/@movielegendvn' },
              { label: 'TikTok Profile URL', value: 'https://tiktok.com/@movielegend.vn' },
              { label: 'Zalo OA / Phone', value: 'https://zalo.me/123456789' }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{item.label}</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="url" defaultValue={item.value} className="w-full bg-[#141417] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email nhận thông báo đơn hàng</label>
                <input type="email" defaultValue="orders@movielegend.vn" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
                <p className="text-[11px] text-gray-500">Email quản trị viên nhận thông báo khi có đơn hàng mới.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email bộ phận bảo hành</label>
                <input type="email" defaultValue="support@movielegend.vn" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
                <p className="text-[11px] text-gray-500">Email tiếp nhận yêu cầu bảo hành từ khách hàng.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Hotline hỗ trợ kỹ thuật</label>
                <input type="text" defaultValue="1900 1234" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Thời gian làm việc</label>
                <input type="text" defaultValue="8:00 - 20:00 (Thứ 2 - Chủ Nhật)" className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-movielegend-500/50 transition-colors" />
              </div>
            </div>
          </motion.div>
        );
      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Logo Website chính</label>
                <div className="bg-[#141417] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
                  <div className="w-48 h-16 bg-black flex items-center justify-center rounded-lg border border-white/5">
                    <span className="text-xl font-bold text-white tracking-widest">Movie<span className="text-movielegend-500">Legend</span></span>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors border border-white/10">
                    Thay đổi Logo
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Favicon</label>
                <div className="bg-[#141417] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-movielegend-500 flex items-center justify-center rounded-xl shadow-lg">
                    <span className="text-2xl font-bold text-black">M</span>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors border border-white/10">
                    Thay đổi Favicon
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Cài đặt hệ thống</h1>
          <p className="text-sm text-gray-400">Quản lý cấu hình chung, thông tin liên hệ và giao diện website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-movielegend-500 hover:bg-movielegend-400 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,179,52,0.3)] hover:shadow-[0_0_20px_rgba(245,179,52,0.5)] flex items-center gap-2">
            <Save className="w-4 h-4" />
            Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-start mt-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive 
                    ? 'bg-movielegend-500/10 text-movielegend-500 border border-movielegend-500/20 shadow-[0_0_15px_rgba(245,179,52,0.05)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-6 sm:p-8 min-h-[500px]">
          <h2 className="text-lg font-bold text-white mb-6 pb-4 border-b border-white/[0.05]">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
