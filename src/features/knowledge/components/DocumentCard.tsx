'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Tag, 
  Building2, 
  Calendar, 
  HardDrive, 
  Globe, 
  UserCheck, 
  Copy, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { KnowledgeDocument, DocType } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Badge, BadgeTone } from '@/components/Badge';
import { formatFileSize } from '@/lib/utils';

interface DocumentCardProps {
  document: KnowledgeDocument;
  onKeywordClick?: (keyword: string) => void;
  onViewDetails?: (doc: KnowledgeDocument) => void;
}

const docTypeLabels: Record<DocType, { label: string; tone: BadgeTone }> = {
  service_manual: { label: 'Service Manual', tone: 'info' },
  interface_spec: { label: 'Interface Spec', tone: 'success' },
  troubleshooting_guide: { label: 'Troubleshooting', tone: 'warning' },
  wiring_diagram: { label: 'Wiring & Schematics', tone: 'danger' },
  user_guide: { label: 'User Guide', tone: 'neutral' },
  checksheet: { label: 'Checksheet / QC', tone: 'info' },
  procedure_policy: { label: 'Quy Trình', tone: 'warning' },
};

export function DocumentCard({ document: doc, onKeywordClick, onViewDetails }: DocumentCardProps) {
  const [copied, setCopied] = useState(false);
  const typeMeta = docTypeLabels[doc.docType] || { label: doc.docType, tone: 'neutral' };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(doc.documentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] bg-white">
      <CardHeader className="space-y-1.5 p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge tone={typeMeta.tone} size="sm">{typeMeta.label}</Badge>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/80">
            {doc.department}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200/80">
            <Building2 className="w-2.5 h-2.5 text-slate-400" />
            {doc.manufacturer}
          </span>
          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-sky-50 text-sky-800 border border-sky-100">
            {doc.deviceModel}
          </span>
          {doc.isSampleData && (
            <Badge tone="neutral" size="sm" mono className="text-[9px] px-1 py-0 bg-amber-50 text-amber-800 border-amber-200">
              Sample Data
            </Badge>
          )}
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug pt-0.5">
          {doc.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {doc.summary}
        </p>

        {doc.technicalNotes?.baudrate && (
          <div className="text-[10px] bg-sky-50/70 border border-sky-100 rounded px-2 py-0.5 text-sky-900 flex items-center gap-2.5 font-mono">
            <span>Baud: <strong>{doc.technicalNotes.baudrate}</strong></span>
            {doc.technicalNotes.dataBits && (
              <span>Format: <strong>{doc.technicalNotes.dataBits}-{doc.technicalNotes.parity || 'N'}-{doc.technicalNotes.stopBits || '1'}</strong></span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-2 px-3.5 py-2 sm:px-4 sm:py-2.5">
        <div>
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Giao thức & Từ khóa
          </span>
          <div className="flex flex-wrap gap-1">
            {doc.keywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => onKeywordClick?.(kw)}
                className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-600 transition border border-slate-200/60 font-mono"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {kw}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs px-3.5 py-2 sm:px-4 sm:py-2.5 flex-wrap gap-2 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono flex-wrap">
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
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(doc)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/90 transition text-[11px] shadow-2xs"
              title="Xem thông số kỹ thuật chi tiết"
            >
              <SlidersHorizontal className="w-3 h-3 text-slate-500" />
              <span>Chi tiết</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200/90 transition text-[11px] shadow-2xs"
            title="Sao chép liên kết SharePoint"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
            <span>{copied ? 'Đã chép' : 'Copy'}</span>
          </button>

          <a
            href={doc.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-sky-700 hover:bg-sky-800 text-white font-medium shadow-2xs transition text-[11px]"
          >
            <span>SharePoint</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
