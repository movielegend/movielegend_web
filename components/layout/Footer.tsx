import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl pt-20 pb-12 border-t border-slate-200/60 text-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[0.2em] uppercase mb-6 text-slate-900">
                Movie<span className="text-sky-600">Legend</span>
              </h3>
              <p className="text-slate-600 font-normal max-w-sm mb-8 text-sm leading-relaxed">
                Hệ thống phân phối máy chiếu và giải pháp trình chiếu cao cấp, mang đến trải nghiệm rạp hát tại gia chân thực nhất.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors font-bold text-xs">FB</Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors font-bold text-xs">IG</Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors font-bold text-xs">YT</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Sản Phẩm</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/products?category=home-cinema" className="hover:text-sky-600 transition-colors">Home Cinema</Link></li>
              <li><Link href="/products?category=portable" className="hover:text-sky-600 transition-colors">Portable</Link></li>
              <li><Link href="/products?category=laser-tv" className="hover:text-sky-600 transition-colors">Laser TV</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-sky-600 transition-colors">Phụ kiện</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Hỗ Trợ</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/support" className="hover:text-sky-600 transition-colors">Trung tâm hỗ trợ</Link></li>
              <li><Link href="/warranty" className="hover:text-sky-600 transition-colors">Tra cứu bảo hành</Link></li>
              <li><Link href="/warranty/activate" className="hover:text-sky-600 transition-colors">Kích hoạt bảo hành</Link></li>
              <li><Link href="/contact" className="hover:text-sky-600 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Công Ty</h4>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li><Link href="/about" className="hover:text-sky-600 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/news" className="hover:text-sky-600 transition-colors">Tin tức & Sự kiện</Link></li>
              <li><Link href="/dealers" className="hover:text-sky-600 transition-colors">Hệ thống đại lý</Link></li>
              <li><Link href="/careers" className="hover:text-sky-600 transition-colors">Tuyển dụng</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} MovieLegend. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-sky-600">Chính sách bảo mật</Link>
            <Link href="/terms" className="hover:text-sky-600">Điều khoản dịch vụ</Link>
            <Link href="/sitemap" className="hover:text-sky-600">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}