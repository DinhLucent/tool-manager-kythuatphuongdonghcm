'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Send, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Cable, 
  Lock, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/Badge';
import { Card, CardContent } from '@/components/Card';

export function ChatPlaceholder() {
  const plannedCapabilities = [
    {
      title: 'Tra Cứu Mã Lỗi & Sự Cố Máy',
      description: 'Tổng hợp mã cảnh báo từ cẩm nang Service Manual các dòng Bio-Rad (Evolis, D-100), Nihon Kohden (MEK), Baxter (AK98, Prismaflex), Qiagen... và gợi ý hướng khắc phục tại chỗ.',
      icon: Cpu,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50 border-red-200',
    },
    {
      title: 'Giải Mã Giao Thức LIS ASTM / HL7',
      description: 'Phân tích cấu trúc khung tin ASTM 1381/1394, gói tin HL7 ORU-R01, hỗ trợ tính mã kiểm tra Checksum Modulo 256 và hướng dẫn bắt tay (handshake) cổng nối tiếp.',
      icon: FileText,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200',
    },
    {
      title: 'Sơ Đồ Cáp COM & Cấu Hình Moxa',
      description: 'Tra cứu nhanh sơ đồ hàn chân cáp DB9/RJ45 (Null Modem, Loopback), thông số baudrate/parity và hướng dẫn cài đặt driver bộ chuyển đổi Moxa UPort.',
      icon: Cable,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Thanh tiêu đề trang */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tổng quan</span>
            </Link>
            <span className="text-slate-300">/</span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-600" />
              Trợ Lý Kỹ Thuật AI (Chatbot)
            </h1>
            <Badge tone="warning" size="sm" mono>
              Chưa Triển Khai
            </Badge>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Bản xem trước giới thiệu tính năng trợ lý AI hỗ trợ kỹ sư y sinh Phương Đông tra cứu hiện trường.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 font-mono">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Trạng thái: Tạm khóa (Disabled)</span>
        </div>
      </div>

      {/* Banner Giới Thiệu Tính Năng */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5 text-xs text-amber-950 space-y-2">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-bold text-sm text-amber-900">
              Giới Thiệu Tính Năng Trợ Lý AI Kỹ Thuật (Sắp Ra Mắt)
            </h2>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Tính năng AI Chatbot hiện đang được xây dựng dữ liệu tri thức nội bộ và tinh chỉnh mô hình ngoại tuyến an toàn (nguyên tắc Zero PHI). 
              Giao diện dưới đây nhằm mục đích <strong>giới thiệu trước định hướng công cụ</strong> cho toàn thể đội ngũ kỹ sư Miền Trung & Miền Nam. 
              Hệ thống hiện <strong>chưa kích hoạt nhận tin nhắn</strong>.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-amber-200/60 flex items-center gap-1.5 text-[11px] text-amber-900 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>Cam kết bảo mật Zero PHI: Mô hình chỉ phản hồi thông tin kỹ thuật, không lưu trữ thông tin bệnh nhân hay kết quả xét nghiệm.</span>
        </div>
      </div>

      {/* 3 Năng Lực Cốt Lõi Dự Kiến */}
      <div>
        <h3 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2.5">
          Các Năng Lực Dự Kiến Hỗ Trợ Kỹ Sư
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {plannedCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Card key={cap.title} className="bg-white border-slate-200 shadow-2xs">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${cap.iconBg} shrink-0`}>
                      <Icon className={`w-4 h-4 ${cap.iconColor}`} />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug">
                      {cap.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Khung Giao Diện Minh Họa (Disabled Preview) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="font-mono font-semibold text-slate-700">Khung Trò Chuyện Xem Trước (Preview Only)</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 text-slate-600">
            Chưa Kích Hoạt
          </span>
        </div>

        {/* Nội dung tin nhắn mẫu minh họa */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/40 min-h-[180px]">
          {/* Tin nhắn hệ thống */}
          <div className="flex gap-2.5 max-w-xl text-xs">
            <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center shrink-0 text-slate-600">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs text-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-slate-500">
                <span>[MÔ PHỎNG PHẢN HỒI KHI KÍCH HOẠT]</span>
              </div>
              <p className="text-xs leading-relaxed">
                Xin chào kỹ sư Phương Đông. Khi tính năng được kích hoạt, tôi có thể hỗ trợ bạn tra cứu:
              </p>
              <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 pt-1">
                <li>Sơ đồ chân cáp Null Modem DB9 cho máy Bio-Rad Evolis / D-100</li>
                <li>Mã lỗi E-03, E-12 máy huyết học Nihon Kohden MEK-9100</li>
                <li>Công thức tính checksum bản tin ASTM 1381 truyền sang máy chủ LIS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Khung nhập liệu bị Disable */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled
              placeholder="[TẠM KHÓA] Tính năng Chatbot đang trong giai đoạn giới thiệu, chưa mở nhận tin nhắn..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed select-none"
            />
            <button
              type="button"
              disabled
              title="Tính năng chưa được triển khai"
              className="px-3.5 py-2.5 rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed select-none flex items-center gap-1 text-xs font-semibold"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>* Khung trò chuyện đang bị vô hiệu hóa vì tính năng chưa được triển khai chính thức.</span>
            <Link href="/knowledge" className="text-red-600 hover:underline font-medium">
              Vào tra cứu tài liệu →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
