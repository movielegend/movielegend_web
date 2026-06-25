import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-movielegend-500">Tìm kiếm sản phẩm</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Tìm máy chiếu phù hợp với nhu cầu của bạn</h1>
          <p className="mt-6 text-slate-300 leading-8">
            Chức năng tìm kiếm sẽ giúp bạn lọc theo công nghệ, giá, loại máy và mục đích sử dụng. Tạm thời bạn có thể truy cập danh sách sản phẩm và chọn trực tiếp.
          </p>
          <div className="mt-10">
            <Link href="/products">
              <Button>Khám phá sản phẩm</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
