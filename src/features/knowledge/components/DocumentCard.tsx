'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Building2, 
  Calendar, 
  Copy, 
  Check, 
  FolderOpen
} from 'lucide-react';
import { KnowledgeDocument, DocType } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Badge, BadgeTone } from '@/components/Badge';

interface DocumentCardProps {
  document: KnowledgeDocument;
  onKeywordClick?: (keyword: string) => void;
}

const docTypeLabels: Record<DocType, { label: string; tone: BadgeTone }> = {
  service_manual: { label: 'Service Manual', tone: 'danger' },
  interface_spec: { label: 'LIS Protocol', tone: 'info' },
  troubleshooting_guide: { label: 'Bảo Trì & Mã Lỗi', tone: 'warning' },
  wiring_diagram: { label: 'Sơ Đồ Kết Nối', tone: 'danger' },
  user_guide: { label: 'HDSD', tone: 'neutral' },
  checksheet: { label: 'Checksheet', tone: 'info' },
  procedure_policy: { label: 'Quy Trình Chuẩn', tone: 'warning' },
};

export function DocumentCard({ document: doc, onKeywordClick }: DocumentCardProps) {
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
    <Card className="flex flex-col justify-between hover:border-red-300 transition-all shadow-xs bg-white border-slate-200">
      <CardHeader className="space-y-2 p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
            {doc.department}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            <Building2 className="w-2.5 h-2.5 text-slate-400" />
            {doc.manufacturer}
          </span>
          <Badge tone={typeMeta.tone} size="sm">{typeMeta.label}</Badge>
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">
            {doc.deviceModel}
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug pt-0.5">
          {doc.title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          {doc.summary}
        </p>
      </CardHeader>

      <CardContent className="space-y-2 px-3.5 py-1.5 sm:px-4">
        <div className="flex flex-wrap gap-1">
          {doc.keywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => onKeywordClick?.(kw)}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-600 transition border border-slate-200 font-mono"
            >
              #{kw}
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs px-3.5 py-2.5 sm:px-4 flex-wrap gap-2 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>Cập nhật: {doc.uploadedAt}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-1 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
            title="Sao chép liên kết SharePoint"
            aria-label="Sao chép liên kết"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={doc.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-medium transition text-xs shadow-xs"
            title="Mở thư mục tài liệu trong SharePoint Phương Đông"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Mở SharePoint</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
