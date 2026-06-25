'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

const chartData = [
  { label: 'T2', value: 30 },
  { label: 'T3', value: 45 },
  { label: 'T4', value: 25 },
  { label: 'T5', value: 60 },
  { label: 'T6', value: 75 },
  { label: 'T7', value: 90 },
  { label: 'CN', value: 65 },
];

export default function AdminDashboardClient({ statsData, recentOrdersData }: { statsData: any, recentOrdersData: any[] }) {
  const [chartFilter, setChartFilter] = useState('7 Ngày');

  const stats = [
    { title: 'Tổng Doanh Thu', value: statsData.revenue, icon: DollarSign, trend: '+12.5%', color: 'emerald', hex: '#10b981' },
    { title: 'Đơn Hàng Mới', value: statsData.orders, icon: ShoppingCart, trend: '+8.2%', color: 'movielegend', hex: '#F5B334' },
    { title: 'Khách Hàng', value: statsData.customers, icon: Users, trend: '+4.3%', color: 'blue', hex: '#3b82f6' },
    { title: 'Sản Phẩm', value: statsData.products, icon: Package, trend: '0%', color: 'purple', hex: '#a855f7' },
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'emerald': return 'text-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'movielegend': return 'text-movielegend-500 bg-movielegend-500/10 shadow-[0_0_15px_rgba(245,179,52,0.2)]';
      case 'blue': return 'text-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case 'purple': return 'text-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getBorderGlow = (color: string) => {
    switch(color) {
      case 'emerald': return 'group-hover:border-emerald-500/30';
      case 'movielegend': return 'group-hover:border-movielegend-500/30';
      case 'blue': return 'group-hover:border-blue-500/30';
      case 'purple': return 'group-hover:border-purple-500/30';
      default: return 'group-hover:border-gray-500/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Hoàn thành':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Hoàn thành</span>;
      case 'Đang xử lý':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-movielegend-500/10 text-movielegend-500 border border-movielegend-500/20">Đang xử lý</span>;
      case 'Đã hủy':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Tổng quan</h1>
          <p className="text-sm text-gray-400">Theo dõi các chỉ số hoạt động kinh doanh hôm nay.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl text-sm font-medium transition-all text-white">
            Tải báo cáo
          </button>
          <button className="px-4 py-2 bg-movielegend-500 hover:bg-movielegend-400 text-black rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,179,52,0.3)] hover:shadow-[0_0_20px_rgba(245,179,52,0.5)] flex items-center gap-2">
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={index} 
              className={`group bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[20px] border border-white/[0.05] p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-[#0a0a0a] hover:shadow-xl ${getBorderGlow(stat.color)}`}
            >
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: stat.hex }}
              />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-2.5 rounded-xl ${getColorClasses(stat.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-gray-400 bg-white/5'}`}>
                  {stat.trend}
                  {stat.trend.startsWith('+') && <TrendingUp className="w-3.5 h-3.5 ml-1" />}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">{stat.title}</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-6 relative overflow-hidden flex flex-col"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
            <div>
              <h2 className="text-lg font-bold text-white">Biểu đồ doanh thu</h2>
              <p className="text-sm text-gray-400 mt-1">Chi tiết doanh thu theo thời gian thực</p>
            </div>
            <div className="flex bg-[#141417] p-1 rounded-xl border border-white/5">
              {['7 Ngày', '30 Ngày', '3 Tháng', '12 Tháng'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setChartFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    chartFilter === filter 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-h-[250px] w-full relative z-10 flex items-end justify-between px-2 sm:px-4 gap-2 sm:gap-6 mt-4">
            {/* Y-axis labels (decorative) */}
            <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[10px] text-gray-600 font-medium py-2">
              <span>100M</span>
              <span>75M</span>
              <span>50M</span>
              <span>25M</span>
              <span>0</span>
            </div>
            
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none z-0 ml-8">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="w-full border-b border-white/[0.03] border-dashed" />
              ))}
            </div>

            {/* Bars */}
            <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-4 pl-8 relative z-10 py-4">
              {chartData.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
                  <div className="w-full h-[200px] flex items-end relative">
                    <div 
                      className="w-full bg-white/5 rounded-t-md relative overflow-hidden transition-all duration-500 group-hover:bg-white/10" 
                      style={{ height: '100%' }}
                    >
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${data.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, type: "spring" }}
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-movielegend-600 to-movielegend-400 rounded-t-md opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-xs font-medium px-2 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl pointer-events-none">
                      {data.value}M đ
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 group-hover:text-movielegend-400 transition-colors">{data.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-1 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[24px] border border-white/[0.05] p-6 relative overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-lg font-bold text-white">Đơn mới nhất</h2>
            <button className="text-movielegend-500 text-sm hover:underline flex items-center gap-1 font-medium">
              Xem tất cả <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 space-y-1 relative z-10 -mx-2">
            {recentOrdersData.map((order) => (
              <div key={order.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-movielegend-500 group-hover:bg-movielegend-500/10 transition-colors shrink-0">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm line-clamp-1">{order.customer}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-movielegend-500">{order.id}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="text-[11px] text-gray-500">{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <p className="font-semibold text-white text-sm">{order.total}</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full width table for Data */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[24px] border border-white/[0.05] overflow-hidden"
      >
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white">Giao dịch gần đây</h2>
            <p className="text-sm text-gray-400 mt-1">Danh sách các đơn hàng và trạng thái hiện tại.</p>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Mã Đơn</th>
                <th scope="col" className="px-6 py-4 font-medium">Khách hàng</th>
                <th scope="col" className="px-6 py-4 font-medium">Ngày đặt</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Tổng tiền</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {recentOrdersData.map((order, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-movielegend-500">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{order.customer}</span>
                      <span className="text-xs text-gray-500">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-white">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {getStatusBadge(order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
