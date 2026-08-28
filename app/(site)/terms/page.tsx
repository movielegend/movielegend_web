'use client';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <span className="text-cyan-600 tracking-[0.3em] text-xs font-bold uppercase mb-3 block">Quy Định & Pháp Lý</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">Điều Khoản & Điều Kiện</h1>
          <p className="text-slate-500 font-medium">Cập nhật lần cuối: Tháng 6, 2026</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-8 text-slate-700 font-normal leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Chấp Nhận Điều Khoản</h2>
            <p>
              Bằng cách truy cập và sử dụng website Movie Legend, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện này.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Sản Phẩm & Dịch Vụ</h2>
            <p>
              Tất cả sản phẩm được cung cấp bởi Movie Legend đều là hàng chính hãng 100%, được kiểm tra chất lượng kỹ lưỡng trước khi bàn giao.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Bảo Hành & Đổi Trả</h2>
            <p>
              Tất cả máy chiếu và thiết bị âm thanh được bảo hành chính hãng 24 tháng. Bạn có thể đổi sản phẩm trong vòng 30 ngày nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Liên Hệ</h2>
            <p>
              Nếu bạn có câu hỏi về điều khoản dịch vụ, hãy gửi email tới <strong className="text-cyan-600">support@movielegend.vn</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
