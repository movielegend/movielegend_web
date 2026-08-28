'use client';

import React, { useState } from 'react';
import { Save, Check, Loader2, Globe, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingManagerProps {
  initialSettings: any[];
}

export default function SettingManager({ initialSettings }: SettingManagerProps) {
  const settingsMap: Record<string, string> = {};
  initialSettings.forEach(s => {
    settingsMap[s.key] = s.value;
  });

  const [siteName, setSiteName] = useState(settingsMap['SiteName'] || 'MovieLegend VN');
  const [hotline, setHotline] = useState(settingsMap['Hotline'] || '1900 xxxx');
  const [email, setEmail] = useState(settingsMap['Email'] || 'contact@movielegend.vn');
  const [address, setAddress] = useState(settingsMap['Address'] || 'Hà Nội, Việt Nam');
  const [metaTitle, setMetaTitle] = useState(settingsMap['MetaTitle'] || 'MovieLegend - Máy chiếu 4K & Rạp hát tại gia');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSavedSuccess(false);

      const itemsToSave = [
        { key: 'SiteName', value: siteName },
        { key: 'Hotline', value: hotline },
        { key: 'Email', value: email },
        { key: 'Address', value: address },
        { key: 'MetaTitle', value: metaTitle },
      ];

      for (const item of itemsToSave) {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save settings error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Cài Đặt Hệ Thống</h1>
          <p className="text-gray-400">Cấu hình thông tin chung và tham số hệ thống trên website.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-full flex items-center gap-2 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {savedSuccess ? 'Đã Lưu Thành Công!' : 'Lưu Thay Đổi'}
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Thông tin cài đặt đã được lưu thành công vào Cơ sở dữ liệu.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4">
          <Globe className="w-5 h-5 text-movielegend-500" /> Thông Tin Website Tổng Quan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Tên thương hiệu Website</label>
            <input 
              type="text" 
              value={siteName} 
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-movielegend-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Số Hotline liên hệ</label>
            <input 
              type="text" 
              value={hotline} 
              onChange={(e) => setHotline(e.target.value)}
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-movielegend-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Email liên hệ chính</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-movielegend-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Tiêu đề SEO Mặc định (Meta Title)</label>
            <input 
              type="text" 
              value={metaTitle} 
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-movielegend-500"
            />
          </div>
        </div>

        <div className="text-sm">
          <label className="text-xs text-gray-400 block mb-1">Địa chỉ Showroom / Văn phòng</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#141417] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-movielegend-500"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving} className="rounded-full px-8 py-3 bg-movielegend-500 text-black hover:bg-amber-400 font-bold">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Lưu Thay Đổi'}
          </Button>
        </div>
      </form>
    </div>
  );
}
