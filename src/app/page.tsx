import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Cpu, 
  ClipboardCheck, 
  Terminal, 
  ArrowRight, 
  ShieldCheck, 
  Binary, 
  HardDrive,
  ExternalLink 
} from 'lucide-react';
import { Card, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { TechnicalLogo } from '@/components/TechnicalLogo';

export default function HomePage() {
  const features = [
    {
      title: 'Kho Tài Liệu Kỹ Thuật (TSC)',
      description: 'Chỉ mục Service Manual, sơ đồ mạch, sơ đồ chân cáp RS-232 và đặc tả giao thức ASTM 1381/1394, HL7 v2.x cho các dòng máy xét nghiệm Phương Đông.',
      href: '/knowledge',
      icon: FileText,
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-50 border border-sky-100',
      badge: 'SharePoint Sync',
      stats: '15+ Service Manuals',
      cta: 'Tra Cứu Tài Liệu',
    },
    {
      title: 'Phần Mềm & Bản Ghost Máy',
      description: 'Bộ cài LIS Bridge, công cụ kiểm tra cổng COM, driver Moxa và file Ghost theo dòng máy với mã kiểm tra toàn vẹn SHA-256.',
      href: '/tools',
      icon: Cpu,
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-50 border border-indigo-100',
      badge: 'Offline Ready',
      stats: '6 Software Packages',
      cta: 'Tải Bộ Cài Đặt',
    },
    {
      title: 'Thiết Bị & Dụng Cụ Đi Viện',
      description: 'Sổ theo dõi bàn giao, mượn và hoàn trả thiết bị kiểm chuẩn hiện trường: bộ chuyển đổi Moxa, đồng hồ đo Fluke, bộ cân chỉnh quang học.',
      href: '/booking',
      icon: ClipboardCheck,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50 border border-emerald-100',
      badge: 'Kho Thiết Bị',
      stats: '6 Equipment Items',
      cta: 'Quản Lý Mượn Trả',
    },
    {
      title: 'Trợ Lý Kỹ Thuật (Chat Beta)',
      description: 'Hỗ trợ tra cứu nhanh mã lỗi máy xét nghiệm và gợi ý sơ đồ chân cáp nối tiếp RS-232 trong chế độ ngoại tuyến.',
      href: '/chat',
      icon: Terminal,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50 border border-amber-100',
      badge: 'Beta Prototype',
      stats: 'Diagnostic Templates',
      cta: 'Mở Khung Tra Cứu',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Technical Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-50 border border-sky-200/80 text-sky-800 text-[10px] font-mono font-semibold uppercase tracking-wider">
              <TechnicalLogo className="w-3 h-3 text-sky-600" />
              Field Engineering Hub • HCM Team
            </span>
            <span className="font-mono text-[10px] text-slate-400 hidden xs:inline">
              14 Engineers
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
            <span>SEC: Zero PHI</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">ONLINE</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            HCM Technical & Field Engineering Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Cổng thông tin kỹ thuật hiện trường cho đội ngũ kỹ sư Phương Đông tại TP.HCM. Tra cứu cẩm nang thiết bị y tế, tải phần mềm LIS/Ghost máy và quản lý thiết bị kiểm định.
          </p>
        </div>

        {/* Feature Badges Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-600 font-mono">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero PHI</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80">
            <Binary className="w-3.5 h-3.5 text-sky-600" />
            <span>ASTM 1381/1394 & HL7 v2.x</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80">
            <HardDrive className="w-3.5 h-3.5 text-indigo-600" />
            <span>Phần Mềm & Driver Cục Bộ</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80 text-sky-700">
            <ExternalLink className="w-3 h-3" />
            <span>SharePoint TSC Direct Sync</span>
          </span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>Phân Hệ Nghiệp Vụ Hiện Trường</span>
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">4 Phân Hệ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <CardContent className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${feature.iconBg} ${feature.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">
                        {feature.title}
                      </h3>
                    </div>
                    <Badge 
                      tone={feature.badge === 'Beta Prototype' ? 'warning' : 'neutral'}
                      size="sm"
                      mono
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[10px] text-slate-500 font-medium">
                      {feature.stats}
                    </span>
                    <Link
                      href={feature.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition"
                    >
                      <span>{feature.cta}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Guidelines */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5 sm:p-4 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2 uppercase tracking-wider text-[11px] font-mono">
          <Terminal className="w-3.5 h-3.5 text-slate-600" />
          <span>Quy Định Tác Nghiệp Kỹ Thuật Hiện Trường</span>
        </div>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>Cập nhật tình trạng mượn trả trên hệ thống trước khi điều chuyển thiết bị đo kiểm khỏi văn phòng.</li>
          <li>Đối chiếu mã kiểm tra SHA-256 trước khi nạp phần mềm hoặc file Ghost vào máy tính thiết bị.</li>
          <li>Tuân thủ nguyên tắc Zero PHI: không lưu trữ thông tin bệnh nhân, mã hồ sơ bệnh án hoặc dữ liệu xét nghiệm.</li>
        </ul>
      </div>
    </div>
  );
}
