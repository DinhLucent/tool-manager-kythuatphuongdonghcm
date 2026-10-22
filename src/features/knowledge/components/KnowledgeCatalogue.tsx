'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ExternalLink, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Info,
  FolderOpen
} from 'lucide-react';
import { SAMPLE_DOCUMENTS_DATA } from '../data';
import { DepartmentCode, Manufacturer, DocType } from '../types';
import { DocumentCard } from './DocumentCard';

const departments: { key: DepartmentCode | 'all'; label: string; shortName: string }[] = [
  { key: 'all', label: 'Tất cả ngành hàng', shortName: 'Tất cả' },
  { key: 'BIORAD', label: 'Bio-Rad (Sinh Hóa - Miễn Dịch)', shortName: 'Bio-Rad' },
  { key: 'HES', label: 'Huyết Học & Đông Máu (Nihon Kohden)', shortName: 'Huyết Học' },
  { key: 'IC', label: 'Hồi Sức & Thận Nhân Tạo (Baxter)', shortName: 'Thận / Hồi Sức' },
  { key: 'CAI', label: 'Sinh Hóa & Nước Tiểu (Analyticon / Furuno)', shortName: 'Sinh Hóa / NT' },
  { key: 'QIA', label: 'Sinh Học Phân Tử (Qiagen)', shortName: 'Qiagen' },
  { key: 'MM', label: 'PCR & Tự Động Hóa (CFX96 / Hamilton)', shortName: 'PCR / Robot' },
  { key: 'BB', label: 'Ngân Hàng Máu (Terumo BCT)', shortName: 'Ngân Hàng Máu' },
  { key: 'IMD', label: 'Chẩn Đoán Hình Ảnh (Carestream)', shortName: 'Hình Ảnh' },
  { key: 'MATC', label: 'Thiết Bị Hồi Sức (Medtronic)', shortName: 'Máy Thở / ICU' },
  { key: 'IT', label: 'Mạng & LIS Phòng Xét Nghiệm', shortName: 'Mạng / LIS' },
  { key: 'GENERAL', label: 'Quy Trình & Biểu Mẫu Kỹ Thuật', shortName: 'Quy Trình' },
];

export function KnowledgeCatalogue() {
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode | 'all'>('all');

  // Thống kê số lượng tài liệu theo ngành hàng
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SAMPLE_DOCUMENTS_DATA.length };
    SAMPLE_DOCUMENTS_DATA.forEach((doc) => {
      counts[doc.department] = (counts[doc.department] || 0) + 1;
    });
    return counts;
  }, []);

  // Lọc danh mục tài liệu
  const filteredDocuments = useMemo(() => {
    return SAMPLE_DOCUMENTS_DATA.filter((doc) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.deviceModel.toLowerCase().includes(q) ||
        doc.manufacturer.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesDepartment =
        selectedDepartment === 'all' || doc.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [search, selectedDepartment]);

  return (
    <div className="space-y-4">
      {/* Tiêu đề trang */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            Tài Liệu Kỹ Thuật — Kỹ Thuật Phương Đông
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Danh mục tài liệu hướng dẫn kỹ thuật, service manual và giao thức LIS phân loại theo các ngành hàng.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 font-mono shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{SAMPLE_DOCUMENTS_DATA.length} danh mục ngành hàng</span>
        </div>
      </div>

      {/* Thông báo kết nối SharePoint M365 */}
      <div className="bg-red-50/70 border border-red-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-red-950">
        <div className="flex items-start sm:items-center gap-2">
          <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs text-slate-700 leading-relaxed">
            Kho tài liệu SharePoint yêu cầu đăng nhập tài khoản Microsoft 365 Phương Đông (<code className="bg-white px-1 py-0.5 rounded border border-red-200 font-mono text-[11px] text-red-700">@phuongdong.com.vn</code>) để mở toàn văn.
          </p>
        </div>
        <a 
          href="https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-red-600 hover:text-red-700 underline whitespace-nowrap inline-flex items-center gap-1 shrink-0"
        >
          <span>Mở kho tài liệu gốc SharePoint</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Bộ lọc ngành hàng (Chips cuộn ngang) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
          <span>Ngành Hàng:</span>
          {selectedDepartment !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className="text-red-600 hover:text-red-700 normal-case font-sans"
            >
              Xem tất cả ngành hàng
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {departments.map((dept) => {
            const isSelected = selectedDepartment === dept.key;
            const count = departmentCounts[dept.key] || 0;
            return (
              <button
                key={dept.key}
                type="button"
                onClick={() => setSelectedDepartment(dept.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-2xs font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
                title={dept.label}
              >
                <span>{dept.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo thiết bị (Evolis, D-100, MEK-9100, AK 96, Qiagen, Urilyzer...)..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:bg-white text-slate-900 transition"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Xóa từ khóa"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Danh sách thẻ tài liệu */}
      {filteredDocuments.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border border-slate-200 text-slate-500 space-y-2">
          <FolderOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            Không tìm thấy tài liệu phù hợp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedDepartment('all');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 border border-red-200 transition"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onKeywordClick={(kw) => setSearch(kw)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
