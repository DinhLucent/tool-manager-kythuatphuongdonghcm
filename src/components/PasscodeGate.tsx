'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { TechnicalLogo } from './TechnicalLogo';

const VALID_PASSCODE = 'KYTHUAT2026';
const STORAGE_KEY = 'hcm_engineering_passcode_auth';

interface PasscodeGateProps {
  children: React.ReactNode;
}

export function PasscodeGate({ children }: PasscodeGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái xác thực từ localStorage khi nạp trang
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === VALID_PASSCODE) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Lắng nghe sự kiện khóa thủ công từ Navbar
    const handleLockEvent = () => {
      localStorage.removeItem(STORAGE_KEY);
      setIsAuthenticated(false);
      setPasscode('');
      setError(null);
    };

    window.addEventListener('hcm-portal-lock', handleLockEvent);
    return () => window.removeEventListener('hcm-portal-lock', handleLockEvent);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const normalizedInput = passcode.trim().toUpperCase();

    if (!normalizedInput) {
      setError('Vui lòng nhập passcode.');
      setIsSubmitting(false);
      return;
    }

    if (normalizedInput === VALID_PASSCODE) {
      localStorage.setItem(STORAGE_KEY, VALID_PASSCODE);
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Passcode không chính xác.');
    }
    setIsSubmitting(false);
  };

  // Tránh flash nội dung trước khi hydration xong
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">
        <div className="flex items-center gap-2 text-xs font-mono">
          <TechnicalLogo className="w-5 h-5 text-sky-400 animate-pulse" />
          <span>Đang nạp hệ thống kỹ thuật...</span>
        </div>
      </div>
    );
  }

  // Đã xác thực thành công -> hiển thị toàn bộ trang web
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Chưa xác thực -> màn hình khóa kỹ thuật tối giản
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-sm">
        {/* Khung Card Xác Thực Kỹ Thuật */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-sky-950/80 text-sky-400 border border-sky-800/60 flex items-center justify-center shadow-inner">
              <TechnicalLogo className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
                HCM Engineering Portal
                <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-sky-900/60 text-sky-300 border border-sky-700/50">
                  TSC
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                Phuong Dong Medical • Xác thực nội bộ
              </p>
            </div>
          </div>

          {/* Form Nhập Passcode */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="portal-passcode" className="block text-[11px] font-medium text-slate-300">
                Mã Truy Cập Hệ Thống
              </label>
              <div className="relative">
                <input
                  id="portal-passcode"
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(null);
                  }}
                  autoFocus
                  placeholder="Nhập passcode..."
                  className="w-full pl-3 pr-9 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mã' : 'Hiện mã'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 px-2.5 py-2 rounded bg-rose-950/60 border border-rose-800/60 text-rose-300 text-[11px] animate-in fade-in duration-150">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Mở Khóa Hệ Thống</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Zero PHI</span>
            </span>
            <span>Khoa / Phòng TSC</span>
          </div>
        </div>

        {/* Ghi chú chân trang */}
        <p className="text-center text-[10px] text-slate-600 font-mono mt-3">
          Thiết bị y tế Phương Đông • TP. Hồ Chí Minh
        </p>
      </div>
    </div>
  );
}

/**
 * Hàm tiện ích cho phép khóa nhanh phiên làm việc từ bất kỳ đâu (ví dụ nút Khóa ở Navbar)
 */
export function lockPortal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hcm-portal-lock'));
  }
}
