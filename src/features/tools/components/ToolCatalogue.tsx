'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  FileText, 
  Building, 
  Disc3, 
  X
} from 'lucide-react';
import { SAMPLE_TOOLS_DATA } from '../data';
import { ToolCard } from './ToolCard';
import { ToolCategory, SupportedOS } from '../types';
import { DepartmentCode } from '@/features/knowledge/types';

export function ToolCatalogue() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode | 'all'>('all');
  const [selectedOS, setSelectedOS] = useState<SupportedOS | 'all'>('all');

  const departments: { key: DepartmentCode | 'all'; label: string; shortName: string }[] = [
    { key: 'all', label: 'Tất cả Ngành Hàng', shortName: 'Tất cả' },
    { key: 'BIORAD', label: 'BIORAD (Sinh hóa - Miễn dịch & Truyền máu)', shortName: 'BIORAD' },
    { key: 'HES', label: 'HES (Huyết học & Đông máu)', shortName: 'HES' },
    { key: 'IC', label: 'IC (Thận nhân tạo Baxter & ICU)', shortName: 'IC' },
    { key: 'CAI', label: 'CAI (Sinh hóa & Nước tiểu)', shortName: 'CAI' },
    { key: 'QIA', label: 'QIA (Qiagen Sinh học phân tử)', shortName: 'QIA' },
    { key: 'IT', label: 'IT & LIS Server Suite', shortName: 'IT' },
    { key: 'GENERAL', label: 'Công Cụ Dùng Chung', shortName: 'DÙNG CHUNG' },
  ];

  const categories: { key: ToolCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả phần mềm' },
    { key: 'ghost_image', label: 'Bản Ghost Hệ Thống' },
    { key: 'diagnostic', label: 'Chẩn đoán & Test LIS' },
    { key: 'lis_bridge', label: 'LIS Bridge Middleware' },
    { key: 'serial_driver', label: 'Driver Moxa & COM' },
    { key: 'utility', label: 'Tiện ích hiện trường' },
  ];

  const osList: (SupportedOS | 'all')[] = [
    'all',
    'Windows 10',
    'Windows 11',
    'Windows Server 2019+',
    'Windows 7/8 (Legacy)',
    'Linux x64',
    'macOS',
  ];

  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SAMPLE_TOOLS_DATA.length };
    for (const tool of SAMPLE_TOOLS_DATA) {
      counts[tool.department] = (counts[tool.department] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    return SAMPLE_TOOLS_DATA.filter((tool) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = 
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.slug.toLowerCase().includes(q) ||
        (tool.deviceModel && tool.deviceModel.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const matchesDepartment =
        selectedDepartment === 'all' || tool.department === selectedDepartment;

      const matchesOS =
        selectedOS === 'all' || tool.supportedOS.includes(selectedOS);

      return matchesSearch && matchesCategory && matchesDepartment && matchesOS;
    });
  }, [search, selectedCategory, selectedDepartment, selectedOS]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDepartment('all');
    setSelectedOS('all');
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'all' ||
    selectedDepartment !== 'all' ||
    selectedOS !== 'all';

  return (
    <div className="space-y-4">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/90 pb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-700" />
            Phần Mềm, Tiện Ích & Bản Ghost Ngành Hàng
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Bộ cài LIS Server, driver cổng COM Moxa và bản Ghost máy chẩn đoán offline sẵn sàng cho kỹ sư đi bệnh viện.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200/90 shrink-0 font-mono shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{SAMPLE_TOOLS_DATA.length} chương trình & ghost</span>
        </div>
      </div>

      {/* Offline Storage Notice */}
      <div className="bg-sky-50/80 border border-sky-200/80 rounded-lg p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-sky-950">
        <div className="flex items-start gap-2.5">
          <HardDrive className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold flex items-center gap-1.5 flex-wrap">
              <span>Quản Trị Phần Mềm & File Ghost Hiện Trường:</span>
              <span className="inline-flex items-center gap-1 px-1 py-0.2 rounded bg-sky-100 text-sky-900 font-mono text-[10px]">
                <Disc3 className="w-3 h-3 text-rose-600" />
                Bản Ghost theo máy
              </span>
            </div>
            <p className="text-sky-900/90 leading-relaxed text-[11px]">
              Phần mềm được phân loại theo ngành hàng. Các gói tiện ích chẩn đoán LIS (<code className="bg-sky-100/80 px-1 py-0.2 rounded font-mono font-semibold text-[10px]">Software.zip 123 MB</code>) và script kiểm tra cổng COM/ASTM được lưu trữ cục bộ kèm mã kiểm tra toàn vẹn SHA-256.
            </p>
          </div>
        </div>
        <a
          href="/downloads/README_ENGINEERING_TOOLS.md"
          target="_blank"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-sky-300 text-sky-800 hover:bg-sky-100 font-semibold transition shrink-0 self-start sm:self-auto text-[11px] shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Hướng dẫn kỹ thuật</span>
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
              Xem tất cả
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

      {/* Filter and Search Controls */}
      <div className="bg-white p-3 sm:p-3.5 rounded-lg border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-2.5">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên phần mềm, máy áp dụng (Evolis, MEK-9100, Immulite, Moxa, Ghost)..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 focus:bg-white text-slate-800 transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Xóa từ khóa"
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

            {/* OS Selector */}
            <div className="flex items-center gap-1.5 shrink-0 flex-1 sm:flex-initial">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value as SupportedOS | 'all')}
                className="w-full sm:w-auto text-xs py-1.5 px-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
              >
                {osList.map((os) => (
                  <option key={os} value={os}>
                    {os === 'all' ? 'Tất cả hệ điều hành' : os}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                  selectedCategory === cat.key
                    ? 'bg-sky-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
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

      {/* Results Count & Grid */}
      <div className="space-y-3">
        <div className="text-[11px] text-slate-500 font-mono">
          Hiển thị {filteredTools.length} / {SAMPLE_TOOLS_DATA.length} chương trình & bản ghost
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg border border-slate-200/90 space-y-2 p-4">
            <Cpu className="w-6 h-6 text-slate-400 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-800">Không tìm thấy phần mềm phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn &quot;Tất cả Ngành Hàng&quot;.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
