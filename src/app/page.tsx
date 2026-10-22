import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Cpu, 
  ClipboardCheck, 
  Bot,
  ArrowRight, 
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/Card';
import { SAMPLE_DOCUMENTS_DATA } from '@/features/knowledge/data';
import { SAMPLE_TOOLS_DATA } from '@/features/tools/data';

export default function HomePage() {
  const docCount = SAMPLE_DOCUMENTS_DATA.length;
  const toolCount = SAMPLE_TOOLS_DATA.length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Tiêu đề & Liên kết SharePoint trực tiếp */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Đội Kỹ Thuật Phương Đông — Miền Trung & Miền Nam
            </h1>
            <p className="text-xs text-slate-500">
              Cổng tra cứu tài liệu SharePoint và tải công cụ phần mềm phục vụ hiện trường bệnh viện
            </p>
          </div>
        </div>
        <a
          href="https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 hover:text-red-600 font-medium border border-slate-200 transition shrink-0"
          title="Mở thư mục gốc trong SharePoint Phương Đông"
        >
          <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>Kho Gốc SharePoint</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Lưới 4 Phân Hệ: 2 cột x 2 hàng cân đối, thoáng rộng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Module 1: Tài Liệu Kỹ Thuật (Active) */}
        <Card className="bg-white border-slate-200 hover:border-red-300 transition-all shadow-xs flex flex-col justify-between group">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {docCount} Ngành Hàng
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition">
                  Tài Liệu Kỹ Thuật
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Cẩm nang bảo trì (Service Manual), đặc tả kết nối LIS ASTM/HL7 và sơ đồ cáp theo từng ngành hàng thiết bị y tế.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-600 pt-1">
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Bio-Rad</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Nihon Kohden</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Baxter</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Kho SharePoint CCC</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/knowledge"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition shadow-xs"
              >
                <span>Tra Cứu Tài Liệu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Module 2: Phần Mềm & Công Cụ (Active) */}
        <Card className="bg-white border-slate-200 hover:border-red-300 transition-all shadow-xs flex flex-col justify-between group">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                  <Cpu className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {toolCount} Bộ Cài Sẵn
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition">
                  Phần Mềm & Công Cụ
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  HyperScribe LIS Toolkit v0.4.7 (kèm cổng License Vercel), bộ giả lập LIS Server và các script kiểm tra.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-600 pt-1">
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">HyperScribe LIS</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Cổng Vercel</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">ASTM / HL7</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/tools"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition shadow-xs"
              >
                <span>Kho Phần Mềm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Module 3: Đặt Tool (Sắp Ra Mắt) */}
        <Card className="bg-white border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between group">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <ClipboardCheck className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Sắp Ra Mắt
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">
                  Đặt Tool
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Hệ thống số hóa mượn trả dụng cụ & thiết bị đo kiểm dùng chung đang trong kế hoạch chuẩn bị danh mục và quy trình.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 pt-1">
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Fluke 179</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Moxa UPort</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Bộ Kìm Bấm</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/booking"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                <span>Xem Kế Hoạch Triển Khai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Module 4: Chat Kỹ Thuật (Sắp Ra Mắt) */}
        <Card className="bg-white border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between group">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Bot className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Sắp Ra Mắt
                </span>
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">
                  Chat Kỹ Thuật
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Trợ lý AI hỗ trợ tra cứu nhanh mã lỗi máy xét nghiệm, giải mã khung tin ASTM/HL7 và sơ đồ cáp COM.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 pt-1">
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Mã Lỗi Máy</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">ASTM / HL7</span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded">Zero PHI</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/chat"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                <span>Xem Giới Thiệu Tính Năng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
