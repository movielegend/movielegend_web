'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  Image as ImageIcon,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  X
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Khách hàng', icon: Users },
  { href: '/admin/warranty', label: 'Bảo hành', icon: ShieldCheck },
  { href: '/admin/news', label: 'Tin tức', icon: FileText },
  { href: '/admin/banners', label: 'Banner & Media', icon: ImageIcon },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex selection:bg-movielegend-500/30">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#050505]/95 backdrop-blur-2xl border-r border-white/[0.05] transform transition-all duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-20' : 'w-60'} lg:static lg:flex lg:flex-col h-screen shadow-[4px_0_24px_rgba(0,0,0,0.5)] lg:shadow-none`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/[0.05] shrink-0">
          <Link href="/admin" className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-8' : 'w-full'}`}>
            <div className="w-8 h-8 rounded-lg bg-movielegend-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,179,52,0.3)]">
              <span className="text-black font-bold text-lg">M</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-wider uppercase text-white whitespace-nowrap">
                Movie<span className="text-movielegend-500">Legend</span>
              </span>
            )}
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-thin">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(`${link.href}/`));
            const Icon = link.icon;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-movielegend-500 bg-white/[0.03] border border-white/[0.05] shadow-[0_0_15px_rgba(245,179,52,0.02)]' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.02] border border-transparent hover:border-white/[0.02]'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? link.label : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-movielegend-500/10 to-transparent opacity-50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center justify-center ${isActive ? 'text-movielegend-500' : 'text-gray-400 group-hover:text-movielegend-400 transition-colors'}`}>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && <div className="absolute inset-0 bg-movielegend-500/20 blur-md rounded-full" />}
                </div>
                {!isCollapsed && (
                  <span className={`font-medium z-10 ${isActive ? 'text-white' : ''}`}>
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/[0.05] shrink-0">
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 border border-transparent hover:border-rose-500/10 ${isCollapsed ? 'justify-center' : ''}`} 
            title={isCollapsed ? "Đăng xuất" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen bg-[#050505]">
        {/* Topbar */}
        <header className="h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 md:px-8 shrink-0 z-30 relative">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <button 
              className="hidden lg:flex text-gray-500 hover:text-white transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden md:flex items-center bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-full px-4 py-2.5 focus-within:border-movielegend-500/40 focus-within:bg-white/[0.03] focus-within:shadow-[0_0_15px_rgba(245,179,52,0.05)] transition-all duration-300 w-80 group">
              <Search className="w-4 h-4 text-gray-500 group-focus-within:text-movielegend-500 transition-colors mr-3" />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
              />
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-movielegend-500 rounded-full shadow-[0_0_8px_rgba(245,179,52,0.8)] border border-[#050505]"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>
            
            <button className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-full border border-transparent hover:border-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-movielegend-600 to-movielegend-400 p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
                  <span className="text-movielegend-500 font-bold text-xs">AD</span>
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white leading-tight">Admin</p>
                <p className="text-[11px] text-gray-500 leading-tight mt-0.5">Quản trị viên</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin relative">
          <div className="absolute top-0 left-1/4 w-1/2 h-96 bg-movielegend-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
