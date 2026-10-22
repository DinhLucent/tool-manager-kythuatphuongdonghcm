import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, FileText, Cpu, ClipboardCheck, Wrench, ShieldAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Đặt Tool — Kỹ Thuật Phương Đông',
  description: 'Phân hệ đăng ký mượn trả tool kỹ thuật và thiết bị đo kiểm đang trong kế hoạch chuẩn bị triển khai.',
};

export default function BookingPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 space-y-4">
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-6 sm:p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono font-semibold">
              <Clock className="w-3 h-3" />
              <span>Kế Hoạch Triển Khai • Sắp Ra Mắt</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 pt-1">
              Phân Hệ Đặt Tool Kỹ Thuật
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Đội Kỹ Thuật Phương Đông • Miền Trung & Miền Nam
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Hệ thống số hóa quy trình đăng ký mượn trả tool và thiết bị đo kiểm dùng chung (đồng hồ vạn năng Fluke, bộ chuyển đổi cổng Moxa, bộ kìm bấm cos chuyên dụng) đang trong giai đoạn hoàn thiện danh mục tài sản thực tế và quy trình bàn giao.
          </p>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-left space-y-1.5 max-w-md mx-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Wrench className="w-3.5 h-3.5 text-red-600" />
              <span>Danh mục dự kiến quản lý:</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Bộ chuyển đổi USB-to-Serial Moxa UPort 1150 (RS-232/422/485)</li>
              <li>Đồng hồ vạn năng True-RMS kiểm tra tiếp địa và điện áp Lab</li>
              <li>Bộ dụng cụ bấm cáp DB9, DB25, RJ45 và máy test thông mạch</li>
              <li>Kính lọc quang chuẩn kiểm tra bước sóng quang học máy xét nghiệm</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition shadow-xs w-full sm:w-auto justify-center"
            >
              <FileText className="w-4 h-4" />
              <span>Tra Cứu Tài Liệu Kỹ Thuật</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition w-full sm:w-auto justify-center"
            >
              <Cpu className="w-4 h-4" />
              <span>Kho Phần Mềm & Script</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Trang Chủ</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
