import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kỹ Thuật Phương Đông — Miền Trung & Miền Nam',
  description: 'Cổng thông tin kỹ thuật hiện trường, tra cứu tài liệu kỹ thuật, phần mềm công cụ và quản lý thiết bị kiểm chuẩn y tế Đội Kỹ Thuật Phương Đông (Miền Trung & Miền Nam).',
  icons: {
    icon: [{ url: '/brand-favicon-circle.png', type: 'image/png', sizes: '64x64' }],
    apple: '/brand-mark-teal.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans text-xs sm:text-sm selection:bg-red-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
