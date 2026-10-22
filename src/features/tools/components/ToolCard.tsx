'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  HardDrive, 
  Laptop, 
  Disc3, 
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';
import { ToolRelease, ToolCategory } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Badge, BadgeTone } from '@/components/Badge';
import { formatFileSize } from '@/lib/utils';

interface ToolCardProps {
  tool: ToolRelease;
}

const categoryMeta: Record<ToolCategory, { label: string; tone: BadgeTone }> = {
  ghost_image: { label: 'Bản Ghost Hệ Thống', tone: 'danger' },
  software_installer: { label: 'Bộ Cài Phần Mềm', tone: 'info' },
  lis_bridge: { label: 'LIS Bridge', tone: 'info' },
  serial_driver: { label: 'Driver Cổng COM', tone: 'warning' },
  diagnostic: { label: 'Chẩn Đoán LIS', tone: 'success' },
  utility: { label: 'Tiện Ích Hiện Trường', tone: 'neutral' },
};

export function ToolCard({ tool }: ToolCardProps) {
  const [copied, setCopied] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);

  const handleCopyChecksum = () => {
    if (!tool.sha256Checksum) return;
    navigator.clipboard.writeText(tool.sha256Checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const meta = categoryMeta[tool.category] || { label: tool.category, tone: 'neutral' };
  const isPendingUpload = tool.downloadUrl === '#pending-upload';
  const isLocalDownload = tool.downloadUrl.startsWith('/');
  const isSharepoint = tool.downloadUrl.includes('sharepoint.com');

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 transition shadow-sm bg-white">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge tone={meta.tone}>{meta.label}</Badge>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {tool.department}
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {tool.version}
              </span>
              {tool.storageLocation === 'local' && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  Offline Ready
                </span>
              )}
              {isPendingUpload && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock className="w-2.5 h-2.5 text-amber-600" />
                  Chờ cung cấp file
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
              {tool.name}
            </h3>
            {tool.deviceModel && (
              <p className="text-[11px] font-mono text-sky-800 font-medium">
                Máy áp dụng: {tool.deviceModel}
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {tool.description}
        </p>

        {/* Ghost Note */}
        {tool.ghostNote && (
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-lg p-2.5 text-[11px] text-rose-900 flex items-start gap-2">
            <Disc3 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Đặc tả bản Ghost: </span>
              <span>{tool.ghostNote}</span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        {/* Supported OS */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Hệ Điều Hành Hỗ Trợ
          </span>
          <div className="flex flex-wrap gap-1">
            {tool.supportedOS.map((os) => (
              <span
                key={os}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
              >
                <Laptop className="w-3 h-3 text-slate-500" />
                {os}
              </span>
            ))}
          </div>
        </div>

        {/* SHA-256 Checksum */}
        {tool.sha256Checksum && (
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-slate-500" />
                Mã Kiểm Tra Toàn Vẹn (SHA-256)
              </span>
              <button
                type="button"
                onClick={handleCopyChecksum}
                className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1 transition"
                title="Sao chép mã SHA-256"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-[10px] text-slate-700 break-all bg-white px-2 py-1 rounded border border-slate-200 select-all">
              {tool.sha256Checksum}
            </div>
          </div>
        )}

        {/* Release Notes Accordion */}
        <div className="border-t border-slate-100 pt-2">
          <button
            type="button"
            onClick={() => setNotesExpanded(!notesExpanded)}
            className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 font-medium py-1"
          >
            <span>Ghi chú phiên bản & Hướng dẫn</span>
            {notesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {notesExpanded && (
            <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {tool.releaseNotes}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 bg-slate-50/40">
        <div className="text-slate-500 text-[11px]">
          {tool.fileSizeBytes && tool.fileSizeBytes > 0 ? (
            <span>Dung lượng: <strong>{formatFileSize(tool.fileSizeBytes)}</strong></span>
          ) : (
            <span className="text-slate-400">Chờ nạp file</span>
          )}
          <span className="mx-1.5">•</span>
          <span>{tool.releaseDate}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {tool.sharepointUrl && (
            <a
              href={tool.sharepointUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition text-xs border border-slate-200"
              title="Mở thư mục gốc trên SharePoint"
            >
              <span>SharePoint</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          )}

          {isPendingUpload ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 font-medium cursor-not-allowed text-xs border border-slate-200"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Chờ cung cấp</span>
            </button>
          ) : (
            <a
              href={tool.downloadUrl}
              target={isLocalDownload ? undefined : '_blank'}
              rel={isLocalDownload ? undefined : 'noopener noreferrer'}
              download={isLocalDownload ? true : undefined}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition text-xs"
            >
              {isSharepoint ? (
                <>
                  <span>Mở SharePoint</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Về</span>
                </>
              )}
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
