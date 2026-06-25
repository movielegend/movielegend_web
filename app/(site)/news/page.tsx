import Image from 'next/image';
import Link from 'next/link';

// Mock Data
const categories = ['Tất cả', 'Công nghệ', 'Sản phẩm mới', 'Mẹo & Hướng dẫn', 'Sự kiện'];
const featuredPost = {
  slug: 'xgimi-horizon-ultra-ra-mat',
  title: 'Movie Legend ra mắt siêu phẩm máy chiếu 4K Laser cao cấp',
  excerpt: 'Khám phá thế hệ máy chiếu thông minh mới nhất với công nghệ Dual Light, mang lại chất lượng hình ảnh vô song và trải nghiệm điện ảnh thực sự tại gia.',
  image: 'https://images.unsplash.com/photo-1585672844882-74070a256a42?q=80&w=2000&auto=format&fit=crop',
  date: '15 Tháng 10, 2023',
  category: 'Sản phẩm mới',
};

const posts = [
  {
    id: 1,
    slug: 'huong-dan-chon-may-chieu-gia-dinh',
    title: 'Bí quyết chọn máy chiếu lý tưởng cho phòng khách của bạn',
    excerpt: 'Những yếu tố quan trọng cần cân nhắc khi lựa chọn máy chiếu gia đình: độ sáng, độ phân giải, và tỷ lệ phóng.',
    image: 'https://images.unsplash.com/photo-1540914124281-342587941fa9?q=80&w=800&auto=format&fit=crop',
    date: '10 Tháng 10, 2023',
    category: 'Mẹo & Hướng dẫn',
  },
  {
    id: 2,
    slug: 'uu-diem-cua-cong-nghe-laser',
    title: 'Tại sao công nghệ chiếu Laser đang thống trị thị trường?',
    excerpt: 'Tuổi thọ cao, màu sắc rực rỡ và tiết kiệm điện năng - tìm hiểu lý do máy chiếu Laser là khoản đầu tư xứng đáng.',
    image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=800&auto=format&fit=crop',
    date: '05 Tháng 10, 2023',
    category: 'Công nghệ',
  },
  {
    id: 3,
    slug: 'trien-lam-av-show-2023',
    title: 'Movie Legend tham gia triển lãm thiết bị nghe nhìn lớn nhất năm',
    excerpt: 'Đến và trải nghiệm trực tiếp các giải pháp trình chiếu hàng đầu của chúng tôi tại sự kiện công nghệ mong đợi nhất.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    date: '28 Tháng 9, 2023',
    category: 'Sự kiện',
  },
  {
    id: 4,
    slug: 'cach-bao-quan-may-chieu',
    title: '5 mẹo kéo dài tuổi thọ bóng đèn máy chiếu',
    excerpt: 'Những thao tác đơn giản nhưng hiệu quả để máy chiếu của bạn luôn hoạt động bền bỉ và giữ được chất lượng hình ảnh tốt nhất.',
    image: 'https://images.unsplash.com/photo-1582736113944-77ce546fbd0c?q=80&w=800&auto=format&fit=crop',
    date: '20 Tháng 9, 2023',
    category: 'Mẹo & Hướng dẫn',
  },
  {
    id: 5,
    slug: 'review-movie-legend-s6',
    title: 'Đánh giá chi tiết: Movie Legend S6 có đáng mua?',
    excerpt: 'Cùng các chuyên gia công nghệ mổ xẻ những ưu nhược điểm của dòng máy chiếu di động bán chạy nhất hiện nay.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    date: '15 Tháng 9, 2023',
    category: 'Công nghệ',
  },
  {
    id: 6,
    slug: 'setup-phong-chieu-phim-tai-nha',
    title: 'Xây dựng rạp chiếu phim mini tại nhà với ngân sách dưới 20 triệu',
    excerpt: 'Hướng dẫn từ A đến Z cách setup âm thanh, ánh sáng và máy chiếu để có trải nghiệm xem phim hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    date: '10 Tháng 9, 2023',
    category: 'Mẹo & Hướng dẫn',
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 selection:bg-movielegend-500 selection:text-black">
      {/* Header Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tin Tức & Sự Kiện</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Cập nhật những thông tin mới nhất về công nghệ, sản phẩm và các mẹo hay để tối ưu hóa trải nghiệm giải trí của bạn.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                idx === 0 
                  ? 'bg-white text-black' 
                  : 'bg-[#141417] text-gray-400 hover:text-white hover:bg-[#202024] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
        <Link href={`/news/${featuredPost.slug}`} className="group block relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="relative h-[300px] md:h-full overflow-hidden">
            <Image 
              src={featuredPost.image} 
              alt={featuredPost.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-movielegend-500 text-sm font-semibold tracking-wider uppercase">{featuredPost.category}</span>
              <span className="text-gray-500 text-sm">{featuredPost.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-movielegend-500 transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 line-clamp-3">
              {featuredPost.excerpt}
            </p>
            <div className="inline-flex items-center text-white font-medium group-hover:text-movielegend-500 transition-colors">
              Đọc tiếp
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* Post Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.id} className="group flex flex-col">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a] border border-white/10">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white">
                  {post.category}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-gray-500 text-sm mb-3">{post.date}</span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-movielegend-500 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white hover:text-black transition-colors">
            Xem Thêm Bài Viết
          </button>
        </div>
      </section>
    </main>
  );
}
