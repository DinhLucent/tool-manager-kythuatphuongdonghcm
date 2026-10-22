'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  CheckCircle2, 
  Info, 
  X, 
  Building,
  Sparkles
} from 'lucide-react';
import { SAMPLE_DOCUMENTS_DATA } from '../data';
import { DocumentCard } from './DocumentCard';
import { DocumentDetailModal } from './DocumentDetailModal';
import { DocType, Manufacturer, DepartmentCode, KnowledgeDocument } from '../types';

export function KnowledgeCatalogue() {
  const [search, setSearch] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | 'all'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode | 'all'>('all');
  const [selectedDocType, setSelectedDocType] = useState<DocType | 'all'>('all');
  const [selectedDocForModal, setSelectedDocForModal] = useState<KnowledgeDocument | null>(null);

  const manufacturers: (Manufacturer | 'all')[] = [
    'all',
    'Bio-Rad',
    'Nihon Kohden',
    'Baxter',
    'Qiagen',
    'Analyticon',
    'Terumo BCT',
    'Fujifilm',
    'Medtronic',
    'Carestream',
    'Hamilton',
    'Moxa',
    'Phuong Dong General',
  ];

  const departments: { key: DepartmentCode | 'all'; label: string; shortName: string }[] = [
    { key: 'all', label: 'Tất cả Ngành Hàng', shortName: 'Tất cả' },
    { key: 'BIORAD', label: 'BIORAD (HbA1c, ELISA, Gelcard)', shortName: 'BIORAD' },
    { key: 'HES', label: 'HES (Huyết học & Đông máu)', shortName: 'HES' },
    { key: 'IC', label: 'IC (Thận nhân tạo Baxter & ICU)', shortName: 'IC' },
    { key: 'CAI', label: 'CAI (Sinh hóa & Nước tiểu)', shortName: 'CAI' },
    { key: 'QIA', label: 'QIA (Qiagen Sinh học phân tử)', shortName: 'QIA' },
    { key: 'MM', label: 'MM (Real-time PCR & Robot hút)', shortName: 'MM' },
    { key: 'BB', label: 'BB (Ngân hàng máu Terumo)', shortName: 'BB' },
    { key: 'IMD', label: 'IMD (CĐHA & Dàn mổ)', shortName: 'IMD' },
    { key: 'MATC', label: 'MATC (Hồi sức & Máy thở)', shortName: 'MATC' },
    { key: 'IT', label: 'IT & LIS Bridge', shortName: 'IT' },
    { key: 'GENERAL', label: 'Vận Hành & Quy Trình', shortName: 'CHUNG' },
  ];

  const docTypes: { key: DocType | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả tài liệu' },
    { key: 'interface_spec', label: 'Interface Specs (ASTM/HL7)' },
    { key: 'service_manual', label: 'Service Manuals' },
    { key: 'troubleshooting_guide', label: 'Troubleshooting Guides' },
    { key: 'procedure_policy', label: 'Quy Trình Nghiệp Vụ' },
    { key: 'checksheet', label: 'Checksheets & QC' },
    { key: 'wiring_diagram', label: 'Wiring & Schematics' },
  ];

  // Quick protocol tags for 1-click search
  const quickProtocols = [
    'ASTM 1381',
    'HL7 v2.x',
    'Serial RS-232',
    'CRRT',
    'HbA1c',
    'Part Order',
    'Checksheet',
    'Moxa',
  ];

  const handleKeywordClick = (keyword: string) => {
    setSearch(keyword);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedManufacturer('all');
    setSelectedDepartment('all');
    setSelectedDocType('all');
  };

  // Department counts
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SAMPLE_DOCUMENTS_DATA.length };
    for (const doc of SAMPLE_DOCUMENTS_DATA) {
      counts[doc.department] = (counts[doc.department] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredDocuments = useMemo(() => {
    return SAMPLE_DOCUMENTS_DATA.filter((doc) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        doc.title.toLowerCase().includes(q) ||
        doc.deviceModel.toLowerCase().includes(q) ||
        doc.manufacturer.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        (doc.maintainer && doc.maintainer.toLowerCase().includes(q)) ||
        doc.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesManufacturer =
        selectedManufacturer === 'all' || doc.manufacturer === selectedManufacturer;

      const matchesDepartment =
        selectedDepartment === 'all' || doc.department === selectedDepartment;

      const matchesDocType =
        selectedDocType === 'all' || doc.docType === selectedDocType;

      return matchesSearch && matchesManufacturer && matchesDepartment && matchesDocType;
    });
  }, [search, selectedManufacturer, selectedDepartment, selectedDocType]);

  const hasActiveFilters = 
    search !== '' || 
    selectedManufacturer !== 'all' || 
    selectedDepartment !== 'all' || 
    selectedDocType !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-600" />
            Bản Đồ Tài Liệu Kỹ Thuật & Giao Thức LIS (TSC)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Tra cứu Service manual, đặc tả truyền thông ASTM/HL7, sơ đồ pinout và quy trình bảo dưỡng các ngành hàng Phương Đông.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{SAMPLE_DOCUMENTS_DATA.length} Tài liệu kỹ thuật</span>
        </div>
      </div>

      {/* SharePoint SSO Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-sky-600 shrink-0" />
          <p>
            <strong>Kho tài liệu SharePoint TSC:</strong> Kết nối trực tiếp vào Microsoft 365 Phương Đông. Kỹ sư mở file sẽ dùng quyền truy cập tài khoản nội bộ (`@phuongdong.com.vn`).
          </p>
        </div>
        <a 
          href="https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline whitespace-nowrap hidden sm:inline-block"
        >
          Mở Thư Mục Gốc TSC &rarr;
        </a>
      </div>

      {/* Department Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Chọn Nhanh Ngành Hàng (Product Lines):</span>
          {selectedDepartment !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className="text-sky-600 hover:text-sky-800 normal-case"
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
                title={dept.label}
              >
                <span>{dept.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-sky-700 text-sky-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo model máy (Evolis, D-100, MEK-9100, AK 96, Rotor-Gene Q), từ khóa, pinout hoặc kỹ sư..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Building className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">Ngành:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value as DepartmentCode | 'all')}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              {departments.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Manufacturer Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">Hãng:</span>
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer | 'all')}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              {manufacturers.map((m) => (
                <option key={m} value={m}>
                  {m === 'all' ? 'Tất cả các Hãng' : m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Protocol Suggestion Tags */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-slate-600 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Tìm nhanh theo giao thức:
          </span>
          {quickProtocols.map((proto) => (
            <button
              key={proto}
              type="button"
              onClick={() => setSearch(proto)}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 transition text-[11px] font-mono"
            >
              {proto}
            </button>
          ))}
        </div>

        {/* Document Type Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {docTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                onClick={() => setSelectedDocType(type.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedDocType === type.key
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" />
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Document Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Hiển thị {filteredDocuments.length} trên tổng số {SAMPLE_DOCUMENTS_DATA.length} tài liệu kỹ thuật
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">Không tìm thấy tài liệu phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không có tài liệu nào khớp với từ khóa hoặc bộ lọc hiện tại. Thử xóa từ khóa tìm kiếm hoặc chọn &quot;Tất cả Ngành Hàng&quot;.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onKeywordClick={handleKeywordClick}
                onViewDetails={(item) => setSelectedDocForModal(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detailed Technical Specs Modal */}
      <DocumentDetailModal
        document={selectedDocForModal}
        onClose={() => setSelectedDocForModal(null)}
      />
    </div>
  );
}
