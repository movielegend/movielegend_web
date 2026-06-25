'use client';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Chính Sách Bảo Mật</h1>
          <p className="text-gray-400">Cập nhật lần cuối: Tháng 6, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Giới Thiệu</h2>
            <p>
              Movie Legend cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin cá nhân của bạn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Thông Tin Chúng Tôi Thu Thập</h2>
            <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Tên, email, số điện thoại khi bạn đăng ký</li>
              <li>Địa chỉ giao hàng và thanh toán</li>
              <li>Thông tin thanh toán (được xử lý an toàn)</li>
              <li>Lịch sử mua hàng và tùy chọn sản phẩm</li>
              <li>Dữ liệu sử dụng website (cookies, IP, thời gian truy cập)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
            <p>Thông tin của bạn được sử dụng để:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Xử lý đơn hàng và giao hàng</li>
              <li>Cung cấp dịch vụ khách hàng</li>
              <li>Gửi thông báo về đơn hàng của bạn</li>
              <li>Cải thiện website và dịch vụ</li>
              <li>Gửi email tiếp thị (nếu bạn đã đăng ký)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Bảo Vệ Thông Tin</h2>
            <p>
              Chúng tôi sử dụng các biện pháp bảo mật tức thời để bảo vệ thông tin của bạn, bao gồm mã hóa SSL và tường lửa. Tuy nhiên, không có phương pháp truyền internet nào hoàn toàn an toàn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Chia Sẻ Thông Tin</h2>
            <p>
              Chúng tôi không bao giờ bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Các đối tác giao hàng để thực hiện đơn hàng</li>
              <li>Các nhà cung cấp thanh toán để xử lý thanh toán</li>
              <li>Khi được yêu cầu bởi pháp luật</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
            <p>
              Website sử dụng cookies để cải thiện trải nghiệm của bạn. Bạn có thể tắt cookies trong cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến chức năng website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Quyền Của Bạn</h2>
            <p>
              Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Liên hệ với chúng tôi tại support@movielegend.vn để thực hiện các quyền này.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Liên Hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi tại support@movielegend.vn hoặc gọi hotline 1800-xxxx.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
