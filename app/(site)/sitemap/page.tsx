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
      { label: 'Giải pháp giáo dục', href: '/solutions' },
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
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Blog', href: '/news' }
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
      { label: 'Chính sách bảo mật', href: '/privacy' },
      { label: 'Chính sách hoàn lại', href: '/support' }
    ]
  }
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Sơ Đồ Trang Web</h1>
          <p className="text-gray-400">Tìm tất cả các trang của Movie Legend tại đây</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemap.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-white mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-movielegend-500 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Other Pages */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Các Trang Khác</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Trang chủ', href: '/' },
              { label: 'Tìm kiếm', href: '/search' },
              { label: 'Wishlist', href: '/wishlist' },
              { label: 'Sitemap XML', href: '/sitemap.xml' }
            ].map((link, i) => (
              <Link 
                key={i}
                href={link.href}
                className="text-gray-400 hover:text-movielegend-500 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
