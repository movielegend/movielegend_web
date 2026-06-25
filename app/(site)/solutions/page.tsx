import Image from 'next/image';
import Link from 'next/link';

const solutions = [
  {
    id: 'gia-dinh',
    title: 'Giải Pháp Gia Đình',
    description: 'Biến phòng khách hoặc phòng ngủ của bạn thành rạp chiếu phim tại gia với hình ảnh 4K sắc nét và âm thanh sống động.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1600&auto=format&fit=crop',
    features: ['Máy chiếu siêu gần', 'Màn chiếu quang học', 'Tích hợp Android TV', 'Hệ thống âm thanh vòm'],
    color: 'from-blue-900/40',
  },
  {
    id: 'doanh-nghiep',
    title: 'Giải Pháp Doanh Nghiệp',
    description: 'Nâng tầm các buổi thuyết trình và hội họp với thiết bị trình chiếu độ sáng cao, rõ nét ngay cả trong môi trường nhiều ánh sáng.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
    features: ['Độ sáng 5000+ ANSI Lumens', 'Kết nối không dây', 'Hoạt động 24/7', 'Quản lý từ xa'],
    color: 'from-gray-700/40',
  },
  {
    id: 'giao-duc',
    title: 'Giải Pháp Giáo Dục',
    description: 'Công cụ tương tác và trình chiếu lý tưởng cho lớp học hiện đại, giúp bài giảng sinh động và dễ hiểu hơn.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop',
    features: ['Máy chiếu tương tác', 'Màn chiếu lớn', 'Tuổi thọ đèn cao', 'Bảo vệ mắt'],
    color: 'from-emerald-900/40',
  },
  {
    id: 'nha-hang-cafe',
    title: 'Nhà Hàng & Cafe',
    description: 'Thu hút khách hàng bằng những màn trình chiếu bóng đá, sự kiện thể thao hoặc không gian điện ảnh độc đáo.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
    features: ['Màn chiếu ngoài trời', 'Độ bền cao', 'Chống bụi', 'Âm thanh công suất lớn'],
    color: 'from-orange-900/40',
  }
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 selection:bg-movielegend-500 selection:text-black">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto py-16 md:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent_70%)] pointer-events-none" />
        <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase mb-6 block">Movie Legend Solutions</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">Giải Pháp Trình Chiếu<br className="hidden md:block"/> Chuyên Nghiệp</h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light">
          Từ rạp hát tại gia sang trọng đến không gian hội nghị doanh nghiệp, chúng tôi cung cấp hệ sinh thái thiết bị trình chiếu tối ưu cho mọi nhu cầu.
        </p>
      </section>

      {/* Solutions List */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {solutions.map((solution, index) => (
          <div key={solution.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} to-transparent z-10 opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-40`} />
                <Image 
                  src={solution.image} 
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{solution.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-4 pt-4 pb-8">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-[#141417] border border-white/10 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-movielegend-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={`/contact?solution=${solution.id}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Nhận Tư Vấn Cụ Thể
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto mt-32 text-center bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-movielegend-500/20 blur-[100px] rounded-full pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Bạn Cần Giải Pháp Tùy Chỉnh?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Đội ngũ kỹ sư của Movie Legend luôn sẵn sàng khảo sát tận nơi và thiết kế hệ thống trình chiếu phù hợp nhất với không gian và ngân sách của bạn.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-movielegend-500 text-black font-bold text-base hover:bg-movielegend-400 transition-colors shadow-[0_0_40px_rgba(245,179,52,0.3)] hover:shadow-[0_0_60px_rgba(245,179,52,0.5)]"
            >
              Liên Hệ Khảo Sát
            </Link>
         </div>
      </section>
    </main>
  );
}
