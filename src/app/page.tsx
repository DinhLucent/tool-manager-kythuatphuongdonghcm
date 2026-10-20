import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Wrench, 
  CalendarCheck, 
  MessageSquareCode, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Download, 
  Activity,
  Layers
} from 'lucide-react';
import { Card, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';

export default function HomePage() {
  const features = [
    {
      title: 'Knowledge Base',
      description: 'Indexed repository of medical laboratory instrument manuals, wiring schematics, and ASTM 1394 / HL7 v2.x protocol specifications.',
      href: '/knowledge',
      icon: BookOpen,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50',
      badge: 'Catalogue',
      stats: '15+ Service Manuals',
      cta: 'Search Documents',
    },
    {
      title: 'Engineering Tools',
      description: 'Verified distribution for internal LIS connection software, COM port virtualizers, and hardware diagnostics with SHA-256 integrity checksums.',
      href: '/tools',
      icon: Wrench,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      badge: 'Downloads',
      stats: '6 Software Packages',
      cta: 'Browse Software',
    },
    {
      title: 'Tool & Equipment Booking',
      description: 'Shared field equipment custody system. Checkout Moxa converters, optical calibrators, and multimeters with double-booking prevention.',
      href: '/booking',
      icon: CalendarCheck,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      badge: 'Logistics',
      stats: '6 Equipment Items',
      cta: 'Manage Bookings',
    },
    {
      title: 'Technical Chat',
      description: 'Beta technical assistant placeholder for rapid troubleshooting error codes and pinout queries without loading the portal infrastructure.',
      href: '/chat',
      icon: MessageSquareCode,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      badge: 'Beta',
      stats: 'Diagnostic Templates',
      cta: 'Open Beta UI',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 rounded-2xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            Internal Engineering Workspace • Ho Chi Minh City Team
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            HCM Engineering Portal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Consolidated operational hub for 14 field and integration engineers. Access verified LIS software releases, instrument manuals, and track shared diagnostic hardware custody.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero PHI / HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-400" /> LIS / ASTM / HL7 Standards
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" /> Modular Feature Architecture
            </span>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Engineering Workspaces</h2>
            <p className="text-xs text-slate-500">Select a feature to access tools, manuals, or equipment custody.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:border-sky-300 hover:shadow-md transition group flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${feature.iconBg} ${feature.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge tone={feature.badge === 'Beta' ? 'warning' : 'neutral'}>
                      {feature.badge}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition flex items-center gap-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{feature.stats}</span>
                    <Link
                      href={feature.href}
                      className="inline-flex items-center gap-1 font-semibold text-sky-600 group-hover:text-sky-700 transition"
                    >
                      {feature.cta}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Team Guidelines Card */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
            Engineering Team Protocol Notice
          </h3>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li><strong>Always record equipment checkouts</strong> prior to taking instruments (Fluke meters, Moxa cables, calibrators) to hospital sites.</li>
            <li><strong>Verify SHA-256 checksums</strong> before installing LIS communication bridges on laboratory PC hosts.</li>
            <li><strong>Do not upload patient data</strong> or test result files into the portal or search bar.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
