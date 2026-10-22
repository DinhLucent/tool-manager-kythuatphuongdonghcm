'use client';

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Building2, 
  Hash, 
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
  interface_spec: { label: 'Interface Spec', tone: 'success' },
  troubleshooting_guide: { label: 'Troubleshooting', tone: 'warning' },
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border border-slate-200/90 w-full max-w-xl max-h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-doc-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/70">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge tone={typeMeta.tone} size="sm">{typeMeta.label}</Badge>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                {doc.department}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.2 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                <Building2 className="w-2.5 h-2.5 text-slate-400" />
                {doc.manufacturer}
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-sky-50 text-sky-800 border border-sky-100">
                {doc.deviceModel}
              </span>
            </div>
            <h2 id="modal-doc-title" className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {doc.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* Summary */}
          <div>
            <h4 className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Mô Tả Tổng Quan
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
              {doc.summary}
            </p>
          </div>

          {/* Technical Fast Reference */}
          {doc.technicalNotes && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Network className="w-3.5 h-3.5 text-sky-700" />
                Thông Số Kỹ Thuật Nhanh (Field Reference)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-sky-50/50 p-2.5 rounded border border-sky-100 text-[11px]">
                {doc.technicalNotes.baudrate && (
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">Baudrate:</span>
                    <span className="font-mono font-bold text-sky-950">{doc.technicalNotes.baudrate} bps</span>
                  </div>
                )}
                {doc.technicalNotes.dataBits && (
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">Data / Parity:</span>
                    <span className="font-mono font-bold text-sky-950">{doc.technicalNotes.dataBits}-{doc.technicalNotes.parity || 'N'}-{doc.technicalNotes.stopBits || '1'}</span>
                  </div>
                )}
                {doc.technicalNotes.ipDefault && (
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">IP Mặc Định:</span>
                    <span className="font-mono font-bold text-sky-950">{doc.technicalNotes.ipDefault}</span>
                  </div>
                )}
                {doc.technicalNotes.portDefault && (
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono">Cổng Port:</span>
                    <span className="font-mono font-bold text-sky-950">{doc.technicalNotes.portDefault}</span>
                  </div>
                )}
                {doc.technicalNotes.maintenanceCycle && (
                  <div className="col-span-2 sm:col-span-4 pt-1 border-t border-sky-100">
                    <span className="text-slate-500 block text-[10px] font-mono">Chu kỳ bảo dưỡng:</span>
                    <span className="text-slate-800 font-medium">{doc.technicalNotes.maintenanceCycle}</span>
                  </div>
                )}
                {doc.technicalNotes.cablePinout && (
                  <div className="col-span-2 sm:col-span-4 pt-1">
                    <span className="text-slate-500 block text-[10px] font-mono">Sơ đồ cáp / Pinout:</span>
                    <code className="text-[10px] bg-white px-2 py-0.5 rounded border border-sky-200 text-slate-800 font-mono block mt-0.5">
                      {doc.technicalNotes.cablePinout}
                    </code>
                  </div>
                )}
              </div>

              {/* Warnings */}
              {doc.technicalNotes.importantWarnings && doc.technicalNotes.importantWarnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-[11px] text-amber-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Lưu Ý Kỹ Thuật Quan Trọng:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-0.5 text-amber-900/90 text-[11px]">
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
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-emerald-700" />
                Sự Cố Thường Gặp & Cách Khắc Phục
              </h4>
              <div className="bg-slate-50 border border-slate-200/90 rounded p-2.5 text-[11px] space-y-1">
                {doc.commonIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-1 text-slate-700">
                    <span className="text-slate-400 font-mono text-[9px] mt-0.5">•</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata & Keywords */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
              Từ Khóa & Giao Thức Đã Lập Chỉ Mục
            </span>
            <div className="flex flex-wrap gap-1">
              {doc.keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono"
                >
                  <Hash className="w-2.5 h-2.5 text-slate-400" />
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* File location on SharePoint */}
          {doc.sharepointRelativePath && (
            <div className="bg-slate-50 p-2 rounded border border-slate-200/80 text-[10px] text-slate-600 space-y-0.5 font-mono">
              <span className="font-sans font-semibold text-slate-500 block text-[10px]">Đường dẫn SharePoint nội bộ:</span>
              <span className="text-slate-800 break-all select-all">{doc.sharepointRelativePath}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono flex-wrap">
            <span className="flex items-center gap-0.5">
              <HardDrive className="w-3 h-3 text-slate-400" />
              {formatFileSize(doc.fileSizeBytes)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Globe className="w-3 h-3 text-slate-400" />
              {doc.language.toUpperCase()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              {doc.uploadedAt}
            </span>
            {doc.maintainer && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-slate-700 font-sans font-medium">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  {doc.maintainer}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/90 transition shadow-2xs"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép link'}</span>
            </button>
            <a
              href={doc.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-2xs transition"
            >
              <span>Mở SharePoint</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
