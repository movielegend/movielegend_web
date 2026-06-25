import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-[0.2em] uppercase mb-6">MovieLegend</h3>
              <p className="text-gray-400 font-light max-w-sm mb-8">
                Hệ thống phân phối máy chiếu và giải pháp trình chiếu cao cấp, mang đến trải nghiệm rạp hát tại gia chân thực nhất.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">FB</Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">IG</Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">YT</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Sản Phẩm</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><Link href="/products?category=home-cinema" className="hover:text-white transition-colors">Home Cinema</Link></li>
              <li><Link href="/products?category=portable" className="hover:text-white transition-colors">Portable</Link></li>
              <li><Link href="/products?category=laser-tv" className="hover:text-white transition-colors">Laser TV</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-white transition-colors">Phụ kiện</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Hỗ Trợ</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><Link href="/support" className="hover:text-white transition-colors">Trung tâm hỗ trợ</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition-colors">Tra cứu bảo hành</Link></li>
              <li><Link href="/warranty/activate" className="hover:text-white transition-colors">Kích hoạt bảo hành</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Công Ty</h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Tin tức & Sự kiện</Link></li>
              <li><Link href="/dealers" className="hover:text-white transition-colors">Hệ thống đại lý</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} MovieLegend. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-gray-300">Điều khoản dịch vụ</Link>
            <Link href="/sitemap" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}