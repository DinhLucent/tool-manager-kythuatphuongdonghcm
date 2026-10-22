'use client';

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Building2, 
  Tag, 
  Wrench, 
  AlertTriangle, 
  Network, 
  Calendar,
  HardDrive,
  Globe,
  UserCheck
} from 'lucide-react';
import { KnowledgeDocument, DocType } from '../types';
import { Badge, BadgeTone } from '@/components/Badge';
import { formatFileSize } from '@/lib/utils';

interface DocumentDetailModalProps {
  document: KnowledgeDocument | null;
  onClose: () => void;
}

const docTypeLabels: Record<DocType, { label: string; tone: BadgeTone }> = {
  service_manual: { label: 'Service Manual', tone: 'info' },
  interface_spec: { label: 'Interface Spec (ASTM/HL7)', tone: 'success' },
  troubleshooting_guide: { label: 'Troubleshooting Guide', tone: 'warning' },
  wiring_diagram: { label: 'Wiring & Schematics', tone: 'danger' },
  user_guide: { label: 'User Guide', tone: 'neutral' },
  checksheet: { label: 'Checksheet / QC', tone: 'info' },
  procedure_policy: { label: 'Quy Trình Nghiệp Vụ', tone: 'warning' },
};

export function DocumentDetailModal({ document: doc, onClose }: DocumentDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const typeMeta = docTypeLabels[doc.docType] || { label: doc.docType, tone: 'neutral' };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(doc.documentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge tone={typeMeta.tone}>{typeMeta.label}</Badge>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {doc.department}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                <Building2 className="w-3 h-3 text-slate-500" />
                {doc.manufacturer}
              </span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
                {doc.deviceModel}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {doc.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Mô Tả Tổng Quan
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {doc.summary}
            </p>
          </div>

          {/* Technical Fast Reference */}
          {doc.technicalNotes && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Network className="w-4 h-4 text-sky-600" />
                Thông Số Kỹ Thuật Nhanh (Field Reference)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-sky-50/50 p-3.5 rounded-xl border border-sky-100 text-xs">
                {doc.technicalNotes.baudrate && (
                  <div>
                    <span className="text-slate-500 block text-[11px]">Baudrate:</span>
                    <span className="font-mono font-bold text-sky-900">{doc.technicalNotes.baudrate} bps</span>
                  </div>
                )}
                {doc.technicalNotes.dataBits && (
                  <div>
                    <span className="text-slate-500 block text-[11px]">Data / Parity:</span>
                    <span className="font-mono font-bold text-sky-900">{doc.technicalNotes.dataBits}-{doc.technicalNotes.parity || 'N'}-{doc.technicalNotes.stopBits || '1'}</span>
                  </div>
                )}
                {doc.technicalNotes.ipDefault && (
                  <div>
                    <span className="text-slate-500 block text-[11px]">IP Mặc Định:</span>
                    <span className="font-mono font-bold text-sky-900">{doc.technicalNotes.ipDefault}</span>
                  </div>
                )}
                {doc.technicalNotes.portDefault && (
                  <div>
                    <span className="text-slate-500 block text-[11px]">Cổng Port:</span>
                    <span className="font-mono font-bold text-sky-900">{doc.technicalNotes.portDefault}</span>
                  </div>
                )}
                {doc.technicalNotes.maintenanceCycle && (
                  <div className="col-span-2 sm:col-span-4 pt-1 border-t border-sky-100/80">
                    <span className="text-slate-500 block text-[11px]">Chu kỳ bảo dưỡng:</span>
                    <span className="text-slate-800 font-medium">{doc.technicalNotes.maintenanceCycle}</span>
                  </div>
                )}
                {doc.technicalNotes.cablePinout && (
                  <div className="col-span-2 sm:col-span-4 pt-1">
                    <span className="text-slate-500 block text-[11px]">Sơ đồ cáp / Pinout:</span>
                    <code className="text-[11px] bg-white px-2 py-1 rounded border border-sky-200 text-slate-800 font-mono block mt-0.5">
                      {doc.technicalNotes.cablePinout}
                    </code>
                  </div>
                )}
              </div>

              {/* Warnings */}
              {doc.technicalNotes.importantWarnings && doc.technicalNotes.importantWarnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Lưu Ý Kỹ Thuật Quan Trọng Khi Xử Lý:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1 text-amber-900/90">
                    {doc.technicalNotes.importantWarnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Common Issues */}
          {doc.commonIssues && doc.commonIssues.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-emerald-600" />
                Sự Cố Thường Gặp & Cách Khắc Phục Nhanh
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5">
                {doc.commonIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                    <span className="text-slate-400 font-mono text-[10px] mt-0.5">•</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata & Keywords */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Từ Khóa & Giao Thức Đã Lập Chỉ Mục
            </span>
            <div className="flex flex-wrap gap-1">
              {doc.keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                >
                  <Tag className="w-2.5 h-2.5 text-slate-400" />
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* File location on SharePoint */}
          {doc.sharepointRelativePath && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-0.5 font-mono">
              <span className="font-sans font-bold text-slate-500 block">Vị trí lưu trữ nội bộ trên SharePoint:</span>
              <span className="text-slate-800 break-all select-all">{doc.sharepointRelativePath}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 text-slate-500 text-xs flex-wrap">
            <span className="flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5" />
              {formatFileSize(doc.fileSizeBytes)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              {doc.language.toUpperCase()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {doc.uploadedAt}
            </span>
            {doc.maintainer && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {doc.maintainer}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Đã sao chép link' : 'Sao chép link'}</span>
            </button>
            <a
              href={doc.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <span>Mở trên SharePoint</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
