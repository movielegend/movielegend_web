'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'home-cinema',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 selection:bg-movielegend-500 selection:text-black relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(245,179,52,0.1),_transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-movielegend-500 tracking-[0.3em] text-xs font-semibold uppercase mb-4 block">Liên Hệ & Hỗ Trợ</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Chúng Tôi Ở Đây<br/>Để Trợ Giúp</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Bạn cần tư vấn cấu hình rạp chiếu tại gia hay thiết lập giải pháp hiển thị cho doanh nghiệp? Đội ngũ chuyên gia của Movie Legend luôn sẵn sàng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Thông Tin Liên Hệ</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-movielegend-500/10 group-hover:border-movielegend-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-movielegend-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Hotline Tư Vấn</h3>
                    <p className="text-zinc-400 mb-1">Miễn phí cước gọi (8:00 - 22:00)</p>
                    <a href="tel:1900xxxx" className="text-2xl font-bold text-white hover:text-movielegend-500 transition-colors">1900 xxxx</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-movielegend-500/10 group-hover:border-movielegend-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-movielegend-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Hỗ Trợ</h3>
                    <p className="text-zinc-400 mb-1">Chúng tôi sẽ phản hồi trong vòng 24h</p>
                    <a href="mailto:support@movielegend.vn" className="text-lg font-medium text-white hover:text-movielegend-500 transition-colors">support@movielegend.vn</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-movielegend-500/10 group-hover:border-movielegend-500/30 transition-colors">
                    <MapPin className="w-6 h-6 text-movielegend-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trải Nghiệm Trực Tiếp</h3>
                    <p className="text-zinc-400 mb-1">Showroom Flagship Movie Legend</p>
                    <p className="text-lg font-medium text-white">Tầng 1, Lotte Mall West Lake, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-movielegend-500/10 blur-[50px] rounded-full pointer-events-none" />
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-movielegend-500" /> Hỗ Trợ Doanh Nghiệp
              </h3>
              <p className="text-zinc-400 mb-6">
                Chính sách giá đặc biệt và dịch vụ thi công trọn gói cho đại lý, nhà hàng, quán cafe và văn phòng.
              </p>
              <Link href="/solutions">
                <Button variant="outline" className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white">
                  Xem Giải Pháp Doanh Nghiệp
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-8 md:p-12 shadow-2xl relative">
            {!submitted ? (
              <>
                <h2 className="text-3xl font-bold mb-8">Gửi Yêu Cầu Tư Vấn</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Họ và Tên *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Số Điện Thoại *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600"
                        placeholder="Số điện thoại liên hệ"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Email (Không bắt buộc)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600"
                      placeholder="Email của bạn"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Nhu Cầu Của Bạn</label>
                    <select 
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white appearance-none"
                    >
                      <option value="home-cinema">Lắp đặt Rạp chiếu phim tại nhà</option>
                      <option value="business">Giải pháp cho Doanh nghiệp / Quán Cafe</option>
                      <option value="product-info">Tư vấn thông tin Sản phẩm</option>
                      <option value="warranty">Hỗ trợ Bảo hành / Kỹ thuật</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Ghi chú thêm</label>
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#141417] border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-movielegend-500 transition-colors text-white placeholder:text-zinc-600 resize-none"
                      placeholder="Cho chúng tôi biết thêm về không gian hoặc yêu cầu của bạn..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : <><Send className="w-5 h-5" /> Gửi Yêu Cầu Ngay</>}
                  </Button>
                </form>
              </>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">Gửi Thành Công!</h3>
                <p className="text-zinc-400 mb-8 max-w-sm mx-auto text-lg">
                  Cảm ơn bạn đã liên hệ. Chuyên viên tư vấn của Movie Legend sẽ gọi lại cho bạn theo số <strong className="text-white">{formData.phone}</strong> trong thời gian sớm nhất.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)} 
                  variant="outline" 
                  className="rounded-full px-8 border-zinc-700 hover:bg-zinc-800 text-white"
                >
                  Gửi yêu cầu khác
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
