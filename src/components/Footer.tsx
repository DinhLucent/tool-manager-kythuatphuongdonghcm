import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">HCM Engineering Portal</span>
            <span>•</span>
            <span>Phuong Dong Medical Equipment Co., Ltd.</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero PHI / HIPAA Compliance: Strictly technical & logistics assets</span>
          </div>

          <div>
            <span>Version 1.0.0-starter • 14 Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
