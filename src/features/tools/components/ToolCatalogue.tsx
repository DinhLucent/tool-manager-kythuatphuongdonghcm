'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Wrench, 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  Building, 
  Disc3, 
  Sparkles,
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
    { key: 'GENERAL', label: 'Công Cụ Kỹ Thuật Dùng Chung', shortName: 'DÙNG CHUNG' },
  ];

  const categories: { key: ToolCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả loại phần mềm' },
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

  // Counts by department
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
    <div className="space-y-6">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-sky-600" />
            Kho Phần Mềm, Chương Trình & Bản Ghost Ngành Hàng
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Phân loại chương trình theo từng ngành hàng, tích lũy công cụ chẩn đoán LIS Server, driver cổng COM và chuẩn bị sẵn các bản Ghost máy.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{SAMPLE_TOOLS_DATA.length} Chương trình & Công cụ</span>
        </div>
      </div>

      {/* Offline Readiness & Ghost Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-sky-900">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <span>Định Hướng Quản Trị Phần Mềm Thực Địa:</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-sky-100 text-sky-900 font-normal">
                <Disc3 className="w-3 h-3 text-rose-600" />
                Hỗ trợ Bản Ghost theo máy
              </span>
            </p>
            <p className="text-sky-800 leading-relaxed">
              Các chương trình và bản Ghost được phân loại theo từng ngành hàng. Công cụ chẩn đoán LIS Server quan trọng (<code className="bg-sky-100 px-1 py-0.5 rounded font-mono font-bold">Software.zip 123 MB</code> của anh Sáng) và các script kiểm tra COM/ASTM đã được chọn lọc, đánh giá khối lượng và lưu trữ cục bộ sẵn sàng cho kỹ sư tải về khi đi bệnh viện. Các công cụ dùng chung khác sẽ được bổ sung dần theo kế hoạch.
            </p>
          </div>
        </div>
        <a
          href="/downloads/README_ENGINEERING_TOOLS.md"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-sky-300 text-sky-800 hover:bg-sky-100/80 font-semibold transition shrink-0 self-start sm:self-auto shadow-2xs"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Hướng Dẫn Kỹ Thuật</span>
        </a>
      </div>

      {/* Department Quick Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Chọn Ngành Hàng (Department / Product Line):</span>
          {selectedDepartment !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className="text-sky-600 hover:text-sky-800 normal-case"
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

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên phần mềm, máy áp dụng (Evolis, MEK-9100, Immulite, Moxa, Ghost)..."
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

          {/* OS Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">HĐH:</span>
            <select
              value={selectedOS}
              onChange={(e) => setSelectedOS(e.target.value as SupportedOS | 'all')}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              {osList.map((os) => (
                <option key={os} value={os}>
                  {os === 'all' ? 'Tất cả hệ điều hành' : os}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat.key
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
              className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" />
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Hiển thị {filteredTools.length} trên tổng số {SAMPLE_TOOLS_DATA.length} chương trình & bản ghost
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-2">
            <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">Không tìm thấy phần mềm phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc chọn &quot;Tất cả Ngành Hàng&quot;.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
