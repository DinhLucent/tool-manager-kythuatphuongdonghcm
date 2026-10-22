'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Laptop, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import { ToolRelease } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { formatFileSize } from '@/lib/utils';

interface ToolCardProps {
  tool: ToolRelease;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [copied, setCopied] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);

  const handleCopyChecksum = () => {
    if (!tool.sha256Checksum) return;
    navigator.clipboard.writeText(tool.sha256Checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col justify-between hover:border-red-300 transition-all shadow-xs bg-white border-slate-200">
      <CardHeader className="space-y-2 p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
            {tool.department}
          </span>
          <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
            {tool.version}
          </span>
          {tool.storageLocation === 'local' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Tải Trực Tiếp
            </span>
          )}
          {tool.storageLocation === 'github' && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              <CheckCircle2 className="w-3 h-3 text-purple-600" />
              Bản Cài Windows (.exe)
            </span>
          )}
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          {tool.description}
        </p>

        {tool.sha256Checksum && (
          <div className="flex items-center justify-between text-[10px] font-mono bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-600">
            <span className="truncate mr-2 font-mono" title={tool.sha256Checksum}>
              SHA-256: {tool.sha256Checksum.slice(0, 16)}...
            </span>
            <button
              type="button"
              onClick={handleCopyChecksum}
              className="text-slate-500 hover:text-red-600 shrink-0 p-0.5"
              title="Sao chép toàn bộ mã SHA-256"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-2 px-3.5 py-1.5 sm:px-4">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Laptop className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Hệ điều hành: {tool.supportedOS.join(', ')}</span>
        </div>

        {tool.releaseNotes && (
          <div>
            <button
              type="button"
              onClick={() => setNotesExpanded(!notesExpanded)}
              className="text-[11px] text-red-600 hover:text-red-700 font-medium flex items-center gap-0.5"
            >
              <span>{notesExpanded ? 'Thu gọn ghi chú' : 'Xem ghi chú kỹ thuật'}</span>
              {notesExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {notesExpanded && (
              <pre className="mt-1 text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded p-2 whitespace-pre-wrap leading-relaxed">
                {tool.releaseNotes}
              </pre>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs px-3.5 py-2.5 sm:px-4 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[10px] font-mono text-slate-500">
          Dung lượng: {formatFileSize(tool.fileSizeBytes)}
        </span>

        <div className="flex items-center gap-1.5">
          {tool.sharepointUrl && (
            <a
              href={tool.sharepointUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition"
              title="Mở thư mục lưu trữ trên SharePoint"
            >
              <ExternalLink className="w-3 h-3 text-slate-500" />
              <span>SharePoint</span>
            </a>
          )}

          <a
            href={tool.downloadUrl}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Về</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
