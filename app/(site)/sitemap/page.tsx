'use client';

import Link from 'next/link';

const sitemap = [
  {
    title: 'Sản Phẩm',
    links: [
      { label: 'Tất cả sản phẩm', href: '/products' },
      { label: 'Máy chiếu gia đình', href: '/products?category=gia-dinh' },
      { label: 'Máy chiếu doanh nghiệp', href: '/products?category=doanh-nghiep' },
      { label: 'Máy chiếu mini', href: '/products?category=mini' },
      { label: 'Phụ kiện', href: '/products?category=phu-kien' }
    ]
  },
  {
    title: 'Giải Pháp',
    links: [
      { label: 'Giải pháp gia đình', href: '/solutions' },
      { label: 'Giải pháp doanh nghiệp', href: '/solutions' },
      { label: 'Giải pháp thương mại', href: '/solutions' }
    ]
  },
  {
    title: 'Hỗ Trợ',
    links: [
      { label: 'Liên hệ', href: '/contact' },
      { label: 'Hỗ trợ', href: '/support' },
      { label: 'Bảo hành', href: '/warranty' },
      { label: 'Đại lý', href: '/dealers' }
    ]
  },
  {
    title: 'Về Chúng Tôi',
    links: [
      { label: 'Về Movie Legend', href: '/about' },
      { label: 'Tin tức', href: '/news' },
      { label: 'Tuyển dụng', href: '/careers' }
    ]
  },
  {
    title: 'Tài Khoản',
    links: [
      { label: 'Đăng nhập', href: '/login' },
      { label: 'Đăng ký', href: '/register' },
      { label: 'Tài khoản của tôi', href: '/account' },
      { label: 'Giỏ hàng', href: '/cart' }
    ]
  },
  {
    title: 'Pháp Lý',
    links: [
      { label: 'Điều khoản & điều kiện', href: '/terms' },
      { label: 'Chính sách bảo mật', href: '/privacy' }
    ]
  }
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16 text-center">
          <span className="text-cyan-600 tracking-[0.3em] text-xs font-bold uppercase mb-3 block">Danh Mục Điều Hướng</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">Sơ Đồ Trang Web</h1>
          <p className="text-slate-600 font-normal text-lg max-w-xl mx-auto">Tìm thấy nhanh chóng mọi dịch vụ và trang nội dung của Movie Legend tại đây.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemap.map((section, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 mb-4 border-b border-slate-200/60 pb-3">{section.title}</h2>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href}
                      className="text-slate-600 hover:text-cyan-600 font-bold transition-colors text-sm flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
