'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Cpu, 
  ClipboardCheck, 
  Bot,
  Menu, 
  X,
  Gauge,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TechnicalLogo } from './TechnicalLogo';

const navItems = [
  { href: '/knowledge', label: 'Tài Liệu Kỹ Thuật', icon: FileText, desc: 'Service Manual & Sơ đồ cáp' },
  { href: '/tools', label: 'Phần Mềm & Công Cụ', icon: Cpu, desc: 'LIS Server & Script Checksum' },
  { href: '/booking', label: 'Đặt Tool', icon: ClipboardCheck, badge: 'Sắp ra mắt', desc: 'Kế hoạch triển khai' },
  { href: '/chat', label: 'Chat Kỹ Thuật', icon: Bot, badge: 'Sắp ra mắt', desc: 'Trợ lý tra cứu mã lỗi' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-800 border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 gap-3">
          {/* Logo & Portal Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-2xs group-hover:bg-red-100 transition shrink-0">
                <TechnicalLogo className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-red-600 transition leading-tight">
                  Kỹ Thuật Phương Đông
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Miền Trung & Miền Nam
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap',
                pathname === '/'
                  ? 'bg-red-50 text-red-700 font-semibold border border-red-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <Gauge className={cn('w-3.5 h-3.5', pathname === '/' ? 'text-red-600' : 'text-slate-400')} />
              <span>Tổng Quan</span>
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap',
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold border border-red-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-red-600' : 'text-slate-400')} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200/80">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Lock Portal + Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('hcm_engineering_passcode_auth');
                  window.location.reload();
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 transition"
              title="Khóa cổng thông tin (yêu cầu passcode khi truy cập lại)"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Khóa Cổng</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
              aria-label="Chuyển đổi menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-3 pt-2 pb-3 space-y-1 shadow-md animate-in fade-in slide-in-from-top-1 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
              pathname === '/'
                ? 'bg-red-50 text-red-700 font-semibold border border-red-200'
                : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            <Gauge className="w-4 h-4 text-red-600" />
            <span>Tổng Quan</span>
          </Link>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium',
                  isActive
                    ? 'bg-red-50 text-red-700 font-semibold border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-red-600' : 'text-slate-500')} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{item.desc}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
