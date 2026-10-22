'use client';

import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { TechnicalLogo } from './TechnicalLogo';

const PASSCODE = 'KYTHUAT2026';
const STORAGE_KEY = 'hcm_engineering_passcode_auth';

interface PasscodeGateProps {
  children: React.ReactNode;
}

export function PasscodeGate({ children }: PasscodeGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
    const authStatus = localStorage.getItem(STORAGE_KEY);
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim().toUpperCase();

    if (cleaned === PASSCODE) {
      localStorage.setItem(STORAGE_KEY, 'authenticated');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mã passcode không chính xác. Vui lòng kiểm tra lại.');
    }
  };

  // Prevent flash before hydration
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
        {/* Brand Icon */}
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 mx-auto flex items-center justify-center mb-4">
          <TechnicalLogo className="w-8 h-8 text-red-600" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
          <span>KỸ THUẬT PHƯƠNG ĐÔNG</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Cổng Thông Tin Kỹ Thuật Phương Đông
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 mb-6 leading-relaxed">
          Hệ thống tra cứu tài liệu và phần mềm nội bộ dành cho Đội Kỹ thuật khu vực Miền Trung và Miền Nam.
        </p>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Passcode bảo vệ *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập passcode..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white font-mono tracking-wider transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition shadow-xs"
          >
            <span>Mở Cổng Kỹ Thuật</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Bảo mật nội bộ • Đội Kỹ Thuật Miền Trung & Miền Nam</span>
        </div>
      </div>
    </div>
  );
}
export default PasscodeGate;
