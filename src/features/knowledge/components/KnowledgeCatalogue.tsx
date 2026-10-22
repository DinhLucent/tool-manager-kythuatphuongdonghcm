'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  FileText, 
  Filter, 
  CheckCircle2, 
  Info, 
  X, 
  Building,
  Terminal,
  ExternalLink
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
    { key: 'troubleshooting_guide', label: 'Troubleshooting' },
    { key: 'procedure_policy', label: 'Quy Trình Nghiệp Vụ' },
    { key: 'checksheet', label: 'Checksheets / QC' },
    { key: 'wiring_diagram', label: 'Wiring & Pinout' },
  ];

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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-700" />
            Tài Liệu Kỹ Thuật & Giao Thức LIS (TSC)
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Service manual, đặc tả truyền thông ASTM/HL7, sơ đồ pinout và quy trình bảo dưỡng các ngành hàng Phương Đông.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200/90 shrink-0 font-mono shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{SAMPLE_DOCUMENTS_DATA.length} tài liệu kỹ thuật</span>
        </div>
      </div>

      {/* SharePoint SSO Notice */}
      <div className="bg-sky-50/80 border border-sky-200/80 rounded-lg p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-950">
        <div className="flex items-start sm:items-center gap-2">
          <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[11px] sm:text-xs text-sky-900 leading-relaxed">
            Kho tài liệu SharePoint TSC yêu cầu đăng nhập tài khoản Microsoft 365 Phương Đông (<code className="bg-sky-100/80 px-1 py-0.2 rounded font-mono text-[10px]">@phuongdong.com.vn</code>) để mở toàn văn.
          </p>
        </div>
        <a 
          href="https://tbytphuongdong.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FCCC%2FTSC"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline whitespace-nowrap inline-flex items-center gap-1 shrink-0"
        >
          <span>Mở thư mục gốc TSC</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Department Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
          <span>Ngành Hàng:</span>
          {selectedDepartment !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className="text-sky-700 hover:text-sky-900 normal-case font-sans"
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
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90'
                }`}
                title={dept.label}
              >
                <span>{dept.shortName}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                  isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-3.5 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-2.5">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo model máy (Evolis, D-100, MEK-9100, AK 96), từ khóa, pinout..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-800 transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Xóa từ khóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Department Filter Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0 flex-1 sm:flex-initial">
              <Building className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value as DepartmentCode | 'all')}
                className="w-full sm:w-auto text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
              >
                {departments.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.shortName === 'Tất cả' ? 'Tất cả Ngành' : `${d.shortName} - ${d.label.slice(0, 24)}...`}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturer Filter */}
            <div className="flex items-center gap-1.5 shrink-0 flex-1 sm:flex-initial">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer | 'all')}
                className="w-full sm:w-auto text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
              >
                {manufacturers.map((m) => (
                  <option key={m} value={m}>
                    {m === 'all' ? 'Tất cả các Hãng' : m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Protocol Tags */}
        <div className="flex items-center gap-1 flex-wrap pt-0.5 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-slate-600 text-[10px] font-mono">
            <Terminal className="w-3 h-3 text-slate-500" />
            Giao thức thường dùng:
          </span>
          {quickProtocols.map((proto) => (
            <button
              key={proto}
              type="button"
              onClick={() => setSearch(proto)}
              className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-600 transition text-[10px] font-mono border border-slate-200/60"
            >
              {proto}
            </button>
          ))}
        </div>

        {/* Document Type Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1">
            {docTypes.map((type) => (
              <button
                key={type.key}
                type="button"
                onClick={() => setSelectedDocType(type.key)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                  selectedDocType === type.key
                    ? 'bg-sky-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
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
              className="text-[11px] text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1 transition"
            >
              <X className="w-3 h-3" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Document Grid */}
      <div className="space-y-3">
        <div className="text-[11px] text-slate-500 font-mono">
          Hiển thị {filteredDocuments.length} / {SAMPLE_DOCUMENTS_DATA.length} tài liệu kỹ thuật
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg border border-slate-200/90 space-y-2 p-4">
            <FileText className="w-6 h-6 text-slate-400 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-800">Không tìm thấy tài liệu phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không có tài liệu nào khớp với từ khóa hoặc bộ lọc hiện tại. Thử xóa từ khóa tìm kiếm hoặc chọn &quot;Tất cả Ngành Hàng&quot;.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3.5">
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
