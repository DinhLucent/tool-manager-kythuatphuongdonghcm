import React from 'react';
import { ShieldCheck, HardDrive } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/90 mt-auto py-3.5">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-slate-800">HCM Engineering Portal</span>
            <span className="text-slate-300">•</span>
            <span>Phương Đông Medical</span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="text-slate-400 font-mono hidden md:inline">SharePoint TSC Sync</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Zero PHI / HIPAA Compliance: Strictly technical & logistics assets</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <HardDrive className="w-3 h-3 text-slate-400" />
            <span>v1.2.0 • 14 Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
