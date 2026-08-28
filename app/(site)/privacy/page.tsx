'use client';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-cyan-500 selection:text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <span className="text-cyan-600 tracking-[0.3em] text-xs font-bold uppercase mb-3 block">Chính Sách & Quy Định</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">Chính Sách Bảo Mật</h1>
          <p className="text-slate-500 font-medium">Cập nhật lần cuối: Tháng 6, 2026</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-8 text-slate-700 font-normal leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">1. Giới Thiệu</h2>
            <p>
              Movie Legend cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin cá nhân của bạn khi trải nghiệm sản phẩm và dịch vụ của chúng tôi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
            <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Tên, email, số điện thoại khi bạn đăng ký tài khoản hoặc gửi yêu cầu tư vấn</li>
              <li>Địa chỉ giao hàng và địa điểm lắp đặt thiết bị</li>
              <li>Thông tin thanh toán (được xử lý an toàn bảo mật cao)</li>
              <li>Lịch sử mua hàng và tùy chọn sản phẩm yêu thích</li>
              <li>Dữ liệu sử dụng website (cookies, IP, thời gian truy cập)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
            <p>Thông tin của bạn được sử dụng để:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Xử lý đơn hàng, thi công và giao hàng đến tận nhà</li>
              <li>Cung cấp dịch vụ chăm sóc khách hàng và bảo hành điện trợ</li>
              <li>Gửi thông báo cập nhật về trạng thái đơn hàng</li>
              <li>Cải thiện website và chất lượng sản phẩm</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Bảo Vệ Thông Tin</h2>
            <p>
              Chúng tôi sử dụng các biện pháp bảo mật tức thời để bảo vệ thông tin của bạn, bao gồm mã hóa SSL và hệ thống tường lửa đa lớp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-4">5. Liên Hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi tại <strong className="text-cyan-600">support@movielegend.vn</strong> hoặc gọi hotline <strong className="text-slate-900">1800-xxxx</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
