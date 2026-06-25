export interface Product {
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  originalPrice: string;
  price: string;
  installment: string;
  image: string;
  gallery: string[];
  video: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  faq: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    slug: 'ml-laser-4k-pro',
    name: 'ML Laser 4K Pro',
    category: 'Máy chiếu gia đình',
    rating: 4.9,
    reviews: 128,
    originalPrice: '42.900.000₫',
    price: '38.900.000₫',
    installment: '0% qua 12 tháng',
    image: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-home-cinema-room-with-projection-584-large.mp4',
    description: 'ML Laser 4K Pro là máy chiếu Laser cao cấp dành cho phòng chiếu tại gia với độ sáng 3.500 ANSI Lm, HDR10 và độ phân giải 4K mượt mà.',
    specs: [
      { label: 'Độ sáng', value: '3.500 ANSI Lm' },
      { label: 'Độ phân giải', value: '4K UHD' },
      { label: 'Công nghệ', value: 'Laser + HDR10' },
      { label: 'Hệ điều hành', value: 'Android TV' },
      { label: 'Âm thanh', value: 'Dolby Audio' }
    ],
    faq: [
      { question: 'ML Laser 4K Pro có hỗ trợ 4K thực không?', answer: 'Máy chiếu hỗ trợ 4K UHD và giải mã hình ảnh sắc nét với công nghệ Laser.' },
      { question: 'Thời gian bảo hành bao lâu?', answer: 'Sản phẩm bảo hành chính hãng 36 tháng cùng dịch vụ hậu mãi toàn quốc.' }
    ],
    relatedSlugs: ['ml-home-cinema-x', 'ml-mini-stream']
  },
  {
    slug: 'ml-home-cinema-x',
    name: 'ML Home Cinema X',
    category: 'Máy chiếu doanh nghiệp',
    rating: 4.8,
    reviews: 94,
    originalPrice: '29.900.000₫',
    price: '27.500.000₫',
    installment: '0% qua 9 tháng',
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-office-meeting-presentation-5060-large.mp4',
    description: 'ML Home Cinema X dành cho không gian doanh nghiệp và phòng họp cao cấp, mang đến trình chiếu sắc nét và kết nối đa dạng.',
    specs: [
      { label: 'Độ sáng', value: '2.800 ANSI Lm' },
      { label: 'Độ phân giải', value: '4K UHD' },
      { label: 'Công nghệ', value: 'Laser + Dolby' },
      { label: 'Hệ điều hành', value: 'Google TV' },
      { label: 'Kết nối', value: 'HDMI, USB, Bluetooth' }
    ],
    faq: [
      { question: 'Có thể trình chiếu cho phòng họp lớn không?', answer: 'Có, sản phẩm phù hợp cho các phòng họp và không gian đa năng với độ sáng cao.' },
      { question: 'Hỗ trợ kết nối không dây như thế nào?', answer: 'Hỗ trợ Wi-Fi, Bluetooth và chia sẻ nội dung đa thiết bị.' }
    ],
    relatedSlugs: ['ml-laser-4k-pro', 'ml-mini-stream']
  },
  {
    slug: 'ml-mini-stream',
    name: 'ML Mini Stream',
    category: 'Máy chiếu mini',
    rating: 4.7,
    reviews: 76,
    originalPrice: '18.900.000₫',
    price: '16.900.000₫',
    installment: '0% qua 6 tháng',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-portable-projector-display-5409-large.mp4',
    description: 'ML Mini Stream là máy chiếu di động cho mọi không gian, kết nối nhanh và trình chiếu linh hoạt với thiết kế nhỏ gọn.',
    specs: [
      { label: 'Độ sáng', value: '1.800 ANSI Lm' },
      { label: 'Độ phân giải', value: 'Full HD' },
      { label: 'Công nghệ', value: 'LED/ Laser Hybrid' },
      { label: 'Hệ điều hành', value: 'Android TV' },
      { label: 'Pin', value: 'Trực tiếp Ổn định' }
    ],
    faq: [
      { question: 'Sản phẩm có dễ mang theo không?', answer: 'Rất dễ mang theo, trọng lượng nhẹ và thiết kế nhỏ gọn.' },
      { question: 'Có thể phát trực tiếp nội dung từ điện thoại không?', answer: 'Có, hỗ trợ chia sẻ không dây với điện thoại và laptop.' }
    ],
    relatedSlugs: ['ml-laser-4k-pro', 'ml-home-cinema-x']
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products.filter((item) => product.relatedSlugs.includes(item.slug));
}
