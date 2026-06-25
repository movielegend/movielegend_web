import type { Metadata } from 'next';
import Script from 'next/script';
import "./globals.css";

export const metadata: Metadata = {
  title: 'MovieLegend Việt Nam – Máy chiếu cao cấp, trải nghiệm điện ảnh',
  description: 'MovieLegend Việt Nam mang đến máy chiếu Laser 4K, màn chiếu và dịch vụ lắp đặt cao cấp cho không gian gia đình và doanh nghiệp.',
  metadataBase: new URL('https://movielegend.vn'),
  openGraph: {
    title: 'MovieLegend Việt Nam – Máy chiếu Công nghệ cao',
    description: 'Máy chiếu Laser 4K MovieLegend cho trải nghiệm rạp chiếu phim tại gia cao cấp.',
    type: 'website',
    url: 'https://movielegend.vn',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514832030580-c42e5b114bea?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'MovieLegend máy chiếu cao cấp'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieLegend Việt Nam',
    description: 'Máy chiếu Laser 4K MovieLegend cho giải trí tại gia và doanh nghiệp.',
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        {children}
      </body>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[]; t=b.createElement(e); t.async=!0; t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', 'YOUR_PIXEL_ID'); fbq('track', 'PageView');`}
      </Script>
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXX');`}
      </Script>
      <Script id="zalo-livechat" strategy="afterInteractive">
        {`// Zalo Live Chat placeholder: thêm mã Zalo tại đây khi triển khai.`}
      </Script>
    </html>
  );
}
