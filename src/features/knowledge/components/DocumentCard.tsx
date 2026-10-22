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
  interface_spec: { label: 'Interface Spec (ASTM/HL7)', tone: 'success' },
  troubleshooting_guide: { label: 'Troubleshooting Guide', tone: 'warning' },
  wiring_diagram: { label: 'Wiring & Schematics', tone: 'danger' },
  user_guide: { label: 'User Guide', tone: 'neutral' },
  checksheet: { label: 'Checksheet / QC', tone: 'info' },
  procedure_policy: { label: 'Quy Trình Nghiệp Vụ', tone: 'warning' },
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
    <Card className="flex flex-col justify-between hover:border-slate-300 transition shadow-sm bg-white">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge tone={typeMeta.tone}>{typeMeta.label}</Badge>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {doc.department}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                <Building2 className="w-3 h-3 text-slate-500" />
                {doc.manufacturer}
              </span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
                {doc.deviceModel}
              </span>
              {doc.isSampleData && (
                <Badge tone="neutral" size="sm" className="bg-amber-50 text-amber-800 border-amber-200 text-[10px]">
                  Sample Data
                </Badge>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
              {doc.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {doc.summary}
        </p>

        {doc.technicalNotes?.baudrate && (
          <div className="text-[11px] bg-sky-50/70 border border-sky-100 rounded-lg px-2.5 py-1 text-sky-900 flex items-center gap-3 font-mono">
            <span>Baud: <strong>{doc.technicalNotes.baudrate}</strong></span>
            {doc.technicalNotes.dataBits && (
              <span>Format: <strong>{doc.technicalNotes.dataBits}-{doc.technicalNotes.parity || 'N'}-{doc.technicalNotes.stopBits || '1'}</strong></span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        {/* Keywords */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Indexed Keywords & Protocols
          </span>
          <div className="flex flex-wrap gap-1">
            {doc.keywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => onKeywordClick?.(kw)}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 transition"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {kw}
              </button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs pt-3 flex-wrap gap-2 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center gap-2 text-slate-500 text-[11px] flex-wrap">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            {formatFileSize(doc.fileSizeBytes)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {doc.language.toUpperCase()}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {doc.uploadedAt}
          </span>
          {doc.maintainer && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 font-medium">
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
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 transition text-xs shadow-2xs"
              title="Xem thông số kỹ thuật chi tiết"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Chi tiết</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 transition text-xs shadow-2xs"
            title="Sao chép liên kết SharePoint"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Đã chép' : 'Copy'}</span>
          </button>

          <a
            href={doc.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition text-xs"
          >
            <span>SharePoint</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
