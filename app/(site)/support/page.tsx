'use client';

import Link from 'next/link';
import { ChevronDown, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'Làm cách nào để bảo hành sản phẩm?',
    answer: 'Tất cả sản phẩm Movie Legend đều có bảo hành 2 năm. Bạn có thể kích hoạt bảo hành trên trang https://movielegend.vn/warranty hoặc liên hệ hotline 1800-xxxx.'
  },
  {
    question: 'Tôi có thể trả lại sản phẩm trong bao lâu?',
    answer: 'Chúng tôi cho phép trả lại hoặc đổi sản phẩm trong 30 ngày từ ngày mua, miễn là sản phẩm còn nguyên vẹn và chưa qua sử dụng quá mức.'
  },
  {
    question: 'Có dịch vụ lắp đặt không?',
    answer: 'Có, chúng tôi cung cấp dịch vụ lắp đặt tại nhà miễn phí cho các sản phẩm cao cấp. Liên hệ team tư vấn để được hỗ trợ.'
  },
  {
    question: 'Giá trị máy chiếu thay đổi như thế nào theo thời gian?',
    answer: 'Máy chiếu được sản xuất bởi Movie Legend có tuổi thọ từ 3-5 năm với bảo trì đúng cách. Chúng tôi cung cấp dịch vụ bảo trì định kỳ.'
  },
  {
    question: 'Có chương trình khuyến mãi nào không?',
    answer: 'Chúng tôi thường xuyên có các chương trình khuyến mãi theo mùa. Theo dõi website hoặc đăng ký email để không bỏ lỡ các ưu đãi.'
  }
];

const contactOptions = [
  { icon: Phone, label: 'Hotline', value: '1800-xxxx', detail: 'Hỗ trợ 24/7' },
  { icon: Mail, label: 'Email', value: 'support@movielegend.vn', detail: 'Trả lời trong 2 giờ' },
  { icon: MapPin, label: 'Địa chỉ', value: 'Hà Nội, TP.HCM', detail: 'Showroom trên cả nước' },
  { icon: Clock, label: 'Giờ mở cửa', value: '9:00 - 21:00', detail: 'Cả ngày chủ nhật' }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button 
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-[#0a0a0a] border border-white/5 rounded-xl p-6 hover:border-movielegend-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-movielegend-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <p className="text-gray-400 text-sm mt-4">{answer}</p>}
    </button>
  );
}

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="text-center mb-12">
          <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase">Hỗ Trợ Khách Hàng</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">Chúng Tôi Ở Đây Để Giúp Bạn</h1>
          <p className="text-gray-400 text-lg">Liên hệ với chúng tôi bất cứ lúc nào, chúng tôi sẵn sàng hỗ trợ 24/7</p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOptions.map((option, i) => {
            const Icon = option.icon;
            return (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 text-center hover:border-movielegend-500/30 transition-colors">
                <Icon className="w-8 h-8 text-movielegend-500 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-2">{option.label}</p>
                <p className="font-semibold text-white mb-1">{option.value}</p>
                <p className="text-xs text-gray-500">{option.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Câu Hỏi Thường Gặp</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-5xl bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Không Tìm Thấy Câu Trả Lời?</h2>
        <p className="text-gray-400 mb-8">Hãy liên hệ trực tiếp với đội support của chúng tôi</p>
        <Link href="/contact">
          <Button>Liên Hệ Support</Button>
        </Link>
      </section>
    </main>
  );
}
