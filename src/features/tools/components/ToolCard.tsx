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
  Cpu, 
  Laptop,
  AlertCircle
} from 'lucide-react';
import { ToolRelease } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Badge, BadgeTone } from '@/components/Badge';
import { formatDateTime, formatFileSize } from '@/lib/utils';

interface ToolCardProps {
  tool: ToolRelease;
}

const categoryMeta: Record<string, { label: string; tone: BadgeTone }> = {
  lis_bridge: { label: 'LIS Bridge', tone: 'info' },
  serial_driver: { label: 'COM / Serial Driver', tone: 'warning' },
  diagnostic: { label: 'Diagnostics', tone: 'success' },
  utility: { label: 'Utility', tone: 'neutral' },
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

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 transition shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge tone={meta.tone}>{meta.label}</Badge>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {tool.version}
              </span>
              {tool.isSampleData && (
                <Badge tone="neutral" size="sm" className="bg-amber-50 text-amber-800 border-amber-200 text-[10px]">
                  Sample Data
                </Badge>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
              {tool.name}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {tool.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        {/* Supported OS */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Supported Operating Systems
          </span>
          <div className="flex flex-wrap gap-1.5">
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
                SHA-256 Integrity Hash
              </span>
              <button
                type="button"
                onClick={handleCopyChecksum}
                className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1 transition"
                title="Copy SHA-256 hash"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-[10px] text-slate-700 break-all bg-white px-2 py-1 rounded border border-slate-200">
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
            <span>Release Notes & Changelog</span>
            {notesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {notesExpanded && (
            <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {tool.releaseNotes}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs pt-3">
        <div className="text-slate-500 text-[11px]">
          <span>Size: <strong>{formatFileSize(tool.fileSizeBytes)}</strong></span>
          <span className="mx-1.5">•</span>
          <span>Released: {tool.releaseDate}</span>
        </div>

        <a
          href={tool.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </a>
      </CardFooter>
    </Card>
  );
}
