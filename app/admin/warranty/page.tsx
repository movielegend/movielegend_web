'use client';

import React from 'react';
import { Plus, Search, Filter, Edit, ShieldCheck, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const warranties = [
  { id: 'WR-10023', serial: 'SN2309XGIMI001', customer: 'Nguyễn Văn A', product: 'Máy Chiếu BEECUBE Xtreme II', activationDate: '2023-01-15', expiryDate: '2024-01-15', status: 'Còn hạn' },
  { id: 'WR-10024', serial: 'SN2309XGIMI002', customer: 'Trần Thị B', product: 'Movie Legend S6', activationDate: '2022-05-20', expiryDate: '2023-05-20', status: 'Hết hạn' },
  { id: 'WR-10025', serial: 'SN2309XGIMI003', customer: 'Lê Văn C', product: 'Màn chiếu quang học 100 inch', activationDate: '2023-10-10', expiryDate: '2024-10-10', status: 'Còn hạn' },
];

export default function AdminWarrantyPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bảo Hành</h1>
          <p className="text-gray-400">Quản lý mã Serial và kích hoạt bảo hành.</p>
        </div>
        <Button className="rounded-full flex items-center gap-2">
          <Plus className="w-4 h-4" /> Kích Hoạt Mới
        </Button>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-[#141417] border border-white/10 rounded-lg px-3 py-2 w-full sm:w-80 focus-within:border-movielegend-500/50 transition-colors">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm Serial, tên khách hàng..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
            />
          </div>
          <Button variant="outline" className="rounded-lg text-sm bg-transparent border-white/10 text-gray-300 hover:text-white hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Lọc
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#141417] text-gray-300 font-medium">
              <tr>
                <th className="px-6 py-4">Mã BH</th>
                <th className="px-6 py-4">Số Serial</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Sản Phẩm</th>
                <th className="px-6 py-4">Ngày Kích Hoạt</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {warranties.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.id}</td>
                  <td className="px-6 py-4 font-mono text-movielegend-500">{item.serial}</td>
                  <td className="px-6 py-4">{item.customer}</td>
                  <td className="px-6 py-4">{item.product}</td>
                  <td className="px-6 py-4">
                    <div>{item.activationDate}</div>
                    <div className="text-xs text-gray-500">Đến: {item.expiryDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max gap-1 ${
                      item.status === 'Còn hạn' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-movielegend-500 hover:bg-movielegend-500/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
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
          <p>Hiển thị 1-3 của 1,250 bản ghi</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
}