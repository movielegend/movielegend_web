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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 pt-32 pb-24 selection:bg-sky-500 selection:text-white relative">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-sky-600 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Liên Hệ & Hỗ Trợ</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Chúng Tôi Ở Đây<br/>Để Trợ Giúp</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-normal">
            Bạn cần tư vấn cấu hình rạp chiếu tại gia hay thiết lập giải pháp hiển thị cho doanh nghiệp? Đội ngũ chuyên gia của Movie Legend luôn sẵn sàng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-8 text-slate-900">Thông Tin Liên Hệ</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6 text-sky-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Hotline Tư Vấn</h3>
                    <p className="text-slate-600 mb-1 text-sm">Miễn phí cước gọi (8:00 - 22:00)</p>
                    <a href="tel:1900xxxx" className="text-2xl font-black text-sky-600 hover:text-sky-700 transition-colors">1900 xxxx</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6 text-sky-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Email Hỗ Trợ</h3>
                    <p className="text-slate-600 mb-1 text-sm">Chúng tôi sẽ phản hồi trong vòng 24h</p>
                    <a href="mailto:support@movielegend.vn" className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors">support@movielegend.vn</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6 text-sky-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Trải Nghiệm Trực Tiếp</h3>
                    <p className="text-slate-600 mb-1 text-sm">Showroom Flagship Movie Legend</p>
                    <p className="text-lg font-bold text-slate-900">Tầng 1, Lotte Mall West Lake, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/80 relative overflow-hidden shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <MessageSquare className="w-6 h-6 text-sky-600" /> Hỗ Trợ Doanh Nghiệp
              </h3>
              <p className="text-slate-600 mb-6 font-normal">
                Chính sách giá đặc biệt và dịch vụ thi công trọn gói cho đại lý, nhà hàng, quán cafe và văn phòng.
              </p>
              <Link href="/solutions">
                <Button variant="outline" className="rounded-full border-slate-300 hover:bg-slate-900 hover:text-white text-slate-900 font-bold">
                  Xem Giải Pháp Doanh Nghiệp
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/80 p-8 md:p-12 shadow-xl relative">
            {!submitted ? (
              <>
                <h2 className="text-3xl font-black mb-8 text-slate-900">Gửi Yêu Cầu Tư Vấn</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Họ và Tên *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
                        placeholder="Nhập tên của bạn"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Số Điện Thoại *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
                        placeholder="Số điện thoại liên hệ"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email (Không bắt buộc)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400"
                      placeholder="Email của bạn"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Nhu Cầu Của Bạn</label>
                    <select 
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 appearance-none"
                    >
                      <option value="home-cinema">Lắp đặt Rạp chiếu phim tại nhà</option>
                      <option value="business">Giải pháp cho Doanh nghiệp / Quán Cafe</option>
                      <option value="product-info">Tư vấn thông tin Sản phẩm</option>
                      <option value="warranty">Hỗ trợ Bảo hành / Kỹ thuật</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">Ghi chú thêm</label>
                    <textarea 
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white/80 border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-sky-600 transition-colors text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="Cho chúng tôi biết thêm về không gian hoặc yêu cầu của bạn..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base font-bold tracking-wide rounded-full flex items-center justify-center gap-2 bg-sky-600 text-white hover:bg-sky-500 shadow-lg shadow-sky-600/25"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : <><Send className="w-5 h-5" /> Gửi Yêu Cầu Ngay</>}
                  </Button>
                </form>
              </>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-black mb-4 text-slate-900">Gửi Thành Công!</h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto text-lg font-normal">
                  Cảm ơn bạn đã liên hệ. Chuyên viên tư vấn của Movie Legend sẽ gọi lại cho bạn theo số <strong className="text-sky-600">{formData.phone}</strong> trong thời gian sớm nhất.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)} 
                  variant="outline" 
                  className="rounded-full px-8 border-slate-300 hover:bg-slate-900 hover:text-white text-slate-900 font-bold"
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
