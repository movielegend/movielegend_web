import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-sky-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-sky-600 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Về Movie Legend</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Mang Trải Nghiệm Rạp Phim Về Ngôi Nhà Bạn</h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed">
            Movie Legend là đơn vị đi đầu trong việc cung cấp các thiết bị máy chiếu thông minh 4K, hệ thống âm thanh cao cấp và giải pháp rạp chiếu phim gia đình trọn gói tại Việt Nam.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-video lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/80">
            <Image 
              src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
              alt="Movie Legend Story"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-slate-600 leading-relaxed font-normal">
              Chúng tôi tin rằng giải trí tại gia không chỉ là việc xem một bộ phim, mà là khoảnh khắc kết nối cảm xúc giữa gia đình và bạn bè.
            </p>
            <p className="text-slate-600 leading-relaxed font-normal">
              Với sứ mệnh đó, Movie Legend không ngừng mang về những công nghệ trình chiếu đột phá nhất như Dual Light Laser, độ phân giải 4K Dolby Vision, cùng âm thanh Harman Kardon đỉnh cao.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { value: '10.000+', label: 'Khách hàng tin tưởng' },
            { value: '100%', label: 'Sản phẩm chính hãng' },
            { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
            { value: '5★', label: 'Đánh giá hài lòng' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-slate-200/80 p-8 text-center shadow-lg">
              <div className="text-3xl md:text-5xl font-black text-sky-600 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
