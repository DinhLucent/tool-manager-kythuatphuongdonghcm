'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  Cpu, 
  ClipboardCheck, 
  Terminal, 
  Menu, 
  X,
  Gauge,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/Badge';
import { TechnicalLogo } from '@/components/TechnicalLogo';
import { lockPortal } from '@/components/PasscodeGate';

const navItems = [
  { href: '/knowledge', label: 'Tài Liệu TSC', icon: FileText },
  { href: '/tools', label: 'Phần Mềm & Ghost', icon: Cpu },
  { href: '/booking', label: 'Thiết Bị Đi Viện', icon: ClipboardCheck },
  { href: '/chat', label: 'Technical Chat', icon: Terminal, badge: 'Beta' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-13 sm:h-14">
          {/* Logo & Portal Brand */}
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-sky-700 text-white flex items-center justify-center border border-sky-800/40 shadow-2xs group-hover:bg-sky-800 transition">
                <TechnicalLogo className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                  HCM Engineering
                  <span className="text-[9px] font-mono font-semibold uppercase px-1 py-0.2 rounded bg-sky-100 text-sky-800 border border-sky-200/70">
                    TSC
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden xs:block">
                  Phuong Dong Medical • Field Ops
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition',
                pathname === '/'
                  ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              <Gauge className="w-3.5 h-3.5 text-slate-500" />
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
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition',
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge tone="warning" size="sm" mono className="text-[9px] px-1 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Team Indicator & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 pl-2.5 border-l border-slate-200 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800">14 Kỹ Sư</span>
                <span className="text-slate-400 font-mono ml-1">HCM</span>
              </div>
              <button
                type="button"
                onClick={() => lockPortal()}
                title="Khóa cổng nội bộ"
                className="ml-1 p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition"
                aria-label="Khóa phiên làm việc"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-transparent focus:border-slate-300"
              aria-label="Chuyển đổi menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 px-3 pt-2 pb-3 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-medium',
              pathname === '/'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Gauge className="w-4 h-4 text-slate-500" />
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
                  'flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium',
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-100'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge tone="warning" size="sm" mono>
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-2.5">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Đội Ngũ Kỹ Thuật HCM
            </span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                lockPortal();
              }}
              className="flex items-center gap-1 text-[11px] text-rose-600 font-medium hover:underline"
            >
              <Lock className="w-3 h-3" />
              <span>Khóa Cổng</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
