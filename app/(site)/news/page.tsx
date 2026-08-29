import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const fallbackThumbnail = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80';

const fallbackNewsList = [
  {
    id: 1,
    title: 'Top 5 Máy Chiếu 4K Đáng Mua Nhất Cho Rạp Hát Tại Gia 2026',
    slug: 'top-5-may-chieu-4k-2026',
    summary: 'Khám phá các dòng máy chiếu 4K laser cao cấp mang đến hình ảnh sống động và trải nghiệm rạp phim chân thực ngay tại nhà.',
    category: 'Đánh giá',
    createdAt: new Date().toISOString(),
    thumbnail: fallbackThumbnail
  },
  {
    id: 2,
    title: 'Hướng Dẫn Chọn Màn Chiếu ALR Phù Hợp Cho Không Gian Phòng Khách',
    slug: 'huong-dan-chon-man-chieu',
    summary: 'Bí quyết lựa chọn kích thước màn chiếu và chất liệu cản ánh sáng môi trường (ALR) để có trải nghiệm xem phim hoàn hảo.',
    category: 'Tư vấn',
    createdAt: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Giải Pháp Hệ Thống Âm Thanh Dolby Atmos Cho Máy Chiếu Thông Minh',
    slug: 'giai-phap-am-thanh-dolby-atmos',
    summary: 'Tối ưu hóa âm thanh vòm 3D sống động kết hợp với công nghệ chiếu laser 4K đỉnh cao.',
    category: 'Công nghệ',
    createdAt: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  }
];

export default async function NewsPage() {
  let newsList: any[] = [];

  try {
    const rawList = await prisma.news.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
    if (rawList && rawList.length > 0) {
      newsList = serializePrisma(rawList);
    }
  } catch (err) {
    console.error('Failed to load news from DB, using fallback:', err);
  }

  const newsData = newsList.length > 0 ? newsList : fallbackNewsList;

  const news = newsData.map((item: any) => ({
    ...item,
    thumbnail: (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.trim() !== '') 
      ? item.thumbnail 
      : fallbackThumbnail,
    summary: item.summary || item.content?.substring(0, 150) || 'Khám phá thông tin và công nghệ trình chiếu mới nhất từ Movie Legend.',
    category: item.category || 'Tin Tức'
  }));

  const featuredPost = news[0] || fallbackNewsList[0];

  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-24 pb-20 selection:bg-cyan-500 selection:text-white">
      <section className="border-b border-slate-200/60 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-600 font-bold mb-4">Blog & Tin Tức</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Kiến Thức & Xu Hướng</h1>
          <p className="text-lg text-slate-600 font-normal max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về công nghệ trình chiếu, giải pháp rạp hát tại gia và đánh giá sản phẩm chi tiết.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {featuredPost && (
            <Link href={`/news/${featuredPost.slug}`} className="group block relative rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-2xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 min-h-[400px] shadow-xl mb-16">
              <div className="relative h-64 md:h-full w-full">
                <Image 
                  src={featuredPost.thumbnail} 
                  alt={featuredPost.title || 'Tin tức'} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">{featuredPost.category}</span>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 group-hover:text-cyan-600 transition-colors">{featuredPost.title}</h2>
                <p className="text-slate-600 text-sm md:text-base mb-6 font-normal line-clamp-3">{featuredPost.summary}</p>
                <span className="text-xs font-bold text-slate-400">{new Date(featuredPost.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </Link>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((post: any) => (
              <Link href={`/news/${post.slug}`} key={post.id} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-[4/3] rounded-t-3xl overflow-hidden bg-slate-100">
                  <Image 
                    src={post.thumbnail} 
                    alt={post.title || 'Tin tức'} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-2 mb-4 font-normal">{post.summary}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
