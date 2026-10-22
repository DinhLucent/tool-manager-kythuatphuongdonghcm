import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-3.5">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Image
              src="/brand-favicon-circle.png"
              alt="Logo Phương Đông"
              width={18}
              height={18}
              className="size-4.5 object-contain"
            />
            <span className="font-semibold text-slate-900">Kỹ Thuật Phương Đông</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Đội Kỹ Thuật Miền Trung & Miền Nam</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-center text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Cổng Thông Tin Kỹ Thuật Nội Bộ • Zero PHI</span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            <span>© 2026 Phương Đông Medical</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
