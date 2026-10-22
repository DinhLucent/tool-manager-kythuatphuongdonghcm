'use client';

import React from 'react';
import { 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  FolderGit2, 
  Layers,
  Activity,
  KeyRound
} from 'lucide-react';
import { SAMPLE_TOOLS_DATA } from '../data';
import { ToolCard } from './ToolCard';
import { Card } from '@/components/Card';

const SHAREPOINT_BASE = 'https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC';

const departmentLinks = [
  { code: 'BIORAD', name: 'Bio-Rad Laboratories', desc: 'Phần mềm Evolis, D-100, D-10, IH-Com, PR4100', url: `${SHAREPOINT_BASE}%2FBIORAD` },
  { code: 'HES', name: 'Huyết Học Nihon Kohden', desc: 'Driver MEK-6500, MEK-7300, MEK-9100, MEK-9200', url: `${SHAREPOINT_BASE}%2FHES` },
  { code: 'IC', name: 'Hồi Sức & Thận Baxter', desc: 'Service tool AK 96, AK 98, Prismaflex, Prismax', url: `${SHAREPOINT_BASE}%2FIC` },
  { code: 'CAI', name: 'Sinh Hóa & Nước Tiểu', desc: 'Phần mềm Analyticon Urilyzer, Furuno CA-270/400', url: `${SHAREPOINT_BASE}%2FCAI` },
  { code: 'QIA', name: 'Sinh Học Phân Tử Qiagen', desc: 'Phần mềm Q-Rex Rotor-Gene Q, QIAcube, EZ2', url: `${SHAREPOINT_BASE}%2FQIA` },
  { code: 'MM', name: 'PCR & Robot Hút Mẫu', desc: 'CFX Maestro, phần mềm robot Hamilton Starlet', url: `${SHAREPOINT_BASE}%2FMM` },
  { code: 'BB', name: 'Ngân Hàng Máu Terumo', desc: 'Tài liệu & công cụ Trima Accel, Mirasol', url: `${SHAREPOINT_BASE}%2FBB` },
  { code: 'IMD', name: 'Chẩn Đoán Hình Ảnh', desc: 'Phần mềm in phim y tế Carestream DryView', url: `${SHAREPOINT_BASE}%2FIMD` },
  { code: 'MATC', name: 'Máy Thở Medtronic', desc: 'Công cụ chẩn đoán Puritan Bennett 840/980', url: `${SHAREPOINT_BASE}%2FMATC` },
  { code: 'IT', name: 'Kho IT & LIS Phương Đông', desc: 'Bộ giả lập LIS Server, chẩn đoán cổng COM Đinh Hoàng Sáng', url: `${SHAREPOINT_BASE}%2FIT` },
];

export function ToolCatalogue() {
  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-red-600" />
            Phần Mềm & Công Cụ Kỹ Thuật
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Bộ giả lập máy chủ LIS, script kiểm tra cổng truyền thông và kho phần mềm theo ngành hàng.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 font-mono shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{SAMPLE_TOOLS_DATA.length} công cụ tải trực tiếp</span>
        </div>
      </div>

      {/* Featured: HyperScribe LIS Toolkit & Cổng License Vercel */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-700/80 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b border-slate-700/80">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Đã Public Trên Vercel
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Dự án mô phỏng & kiểm thử LIS (Đinh Hoàng Sáng)
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight mt-1">
                HyperScribe LIS Toolkit (v0.4.7 Lite) & Cổng Cấp License Bản Quyền
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <a
              href="https://lis-license-portal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-xs"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Mở Cổng License Vercel</span>
              <ExternalLink className="w-3 h-3 text-emerald-200" />
            </a>
            <a
              href="https://github.com/DinhLucent/lis-toolkit-releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-600 transition"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Releases</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>1. Phần Mềm Kiểm Thử & Giả Lập LIS (Desktop Windows)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Mô phỏng máy xét nghiệm hai chiều, bắt gói tin (Message Cutter), kiểm tra kết nối qua cổng COM RS-232 hoặc mạng LAN TCP/IP, giải mã khung tin ASTM 1381/1394 và HL7 v2.x (Mindray, Sysmex, Furuno CA400/CA800, Nihon Kohden...).
            </p>
          </div>

          <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <KeyRound className="w-3.5 h-3.5" />
              <span>2. Kích Hoạt Bản Quyền Serverless Miễn Phí (Vercel)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Cổng serverless ký mã hóa Ed25519 tự động. Kỹ sư mở phần mềm &gt; bấm <strong>Export Request</strong> (.hsreq) &gt; truy cập <a href="https://lis-license-portal.vercel.app" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">lis-license-portal.vercel.app</a> kéo thả file để nhận ngay key (.hskey).
            </p>
          </div>
        </div>
      </div>

      {/* Mục 1: Công Cụ Sẵn Có Tải Về Trực Tiếp */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            Công Cụ Đã Sẵn Sàng (Tải Trực Tiếp)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SAMPLE_TOOLS_DATA.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Mục 2: Thư Mục Phần Mềm & Bản Ghost Theo Ngành Hàng Trên SharePoint */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Kho Phần Mềm Theo Ngành Hàng (SharePoint)
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Các bản Ghost (.tib/.gho) sẽ được bổ sung tích lũy sau
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {departmentLinks.map((dept) => (
            <Card key={dept.code} className="p-3 bg-white border-slate-200 hover:border-red-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                    {dept.code}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">SharePoint M365</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  {dept.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {dept.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Layers className="w-3 h-3 text-slate-400" />
                  Ngành Hàng
                </span>
                <a
                  href={dept.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 transition"
                >
                  <span>Mở thư mục</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
