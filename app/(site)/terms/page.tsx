'use client';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Điều Khoản & Điều Kiện</h1>
          <p className="text-gray-400">Cập nhật lần cuối: Tháng 6, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Chấp Nhận Điều Khoản</h2>
            <p>
              Bằng cách truy cập và sử dụng website Movie Legend, bạn đồng ý bị ràng buộc bởi các điều khoản và điều kiện này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Sử Dụng Đúng Mục Đích</h2>
            <p>
              Bạn đồng ý sử dụng website này chỉ cho các mục đích hợp pháp và theo những cách không vi phạm quyền của bất kỳ ai hoặc hạn chế việc sử dụng website bởi bất kỳ ai khác. Hành vi cấm bao gồm:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Qu騷rassing hoặc gây hại cho những người khác</li>
              <li>Gửi nội dung thô tục hoặc xúc phạm</li>
              <li>Cố gắng truy cập trái phép vào hệ thống</li>
              <li>Phát tán phần mềm độc hại</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Sản Phẩm & Dịch Vụ</h2>
            <p>
              Tất cả sản phẩm được cung cấp bởi Movie Legend đều được kiểm tra chất lượng kỹ lưỡng. Chúng tôi không chịu trách nhiệm cho bất kỳ lỗi hoặc hạn chế nào trong quá trình sử dụng.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Bảo Hành & Trả Lại</h2>
            <p>
              Tất cả sản phẩm được bảo hành trong 2 năm từ ngày mua. Bảo hành không bao gồm những hư hỏng do sử dụng không đúng cách hoặc tai nạn. Bạn có thể trả lại sản phẩm trong 30 ngày nếu không hài lòng.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Giá Cả & Thanh Toán</h2>
            <p>
              Giá cả của sản phẩm có thể thay đổi mà không cần thông báo trước. Thanh toán phải được thực hiện đầy đủ trước khi giao hàng. Movie Legend chấp nhận các hình thức thanh toán chuyển khoản, thẻ tín dụng và tiền mặt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Giao Hàng</h2>
            <p>
              Chúng tôi giao hàng tại các địa chỉ được cung cấp bởi khách hàng. Movie Legend không chịu trách nhiệm cho các hư hỏng xảy ra trong quá trình vận chuyển nếu do lỗi của nhà vận chuyển.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Giới Hạn Trách Nhiệm</h2>
            <p>
              Trong mọi trường hợp, Movie Legend sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, đặc biệt hoặc hệ quả nào phát sinh từ việc sử dụng website hoặc sản phẩm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Thay Đổi Điều Khoản</h2>
            <p>
              Movie Legend có quyền thay đổi các điều khoản này bất cứ lúc nào. Việc sử dụng tiếp tục website sau khi thay đổi coi như bạn đã chấp nhận các điều khoản mới.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Liên Hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi tại support@movielegend.vn hoặc gọi hotline 1800-xxxx.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
