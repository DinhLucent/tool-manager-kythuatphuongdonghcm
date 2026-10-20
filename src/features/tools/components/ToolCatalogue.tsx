'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Wrench, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SAMPLE_TOOLS_DATA } from '../data';
import { ToolCard } from './ToolCard';
import { ToolCategory, SupportedOS } from '../types';

export function ToolCatalogue() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedOS, setSelectedOS] = useState<SupportedOS | 'all'>('all');

  const categories: { key: ToolCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All Categories' },
    { key: 'lis_bridge', label: 'LIS Bridges' },
    { key: 'serial_driver', label: 'Serial & COM Drivers' },
    { key: 'diagnostic', label: 'Diagnostic Tools' },
    { key: 'utility', label: 'Utilities' },
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

  const filteredTools = useMemo(() => {
    return SAMPLE_TOOLS_DATA.filter((tool) => {
      // Search matching
      const matchesSearch = 
        search.trim() === '' ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.slug.toLowerCase().includes(search.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      // OS matching
      const matchesOS =
        selectedOS === 'all' || tool.supportedOS.includes(selectedOS);

      return matchesSearch && matchesCategory && matchesOS;
    });
  }, [search, selectedCategory, selectedOS]);

  return (
    <div className="space-y-6">
      {/* Header & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-sky-600" />
            Engineering Software Catalogue
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Authoritative software distribution for LIS interfaces, serial drivers, and diagnostic test harnesses.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{SAMPLE_TOOLS_DATA.length} Verified Releases</span>
        </div>
      </div>

      {/* Compliance & Integrity Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3 text-xs text-sky-900">
        <ShieldAlert className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Security & Verification Guidelines:</p>
          <p className="text-sky-800 leading-relaxed">
            Prior to deploying any binary on hospital laboratory workstations, confirm that the SHA-256 hash matches the value registered below via PowerShell: <code className="bg-sky-100 px-1.5 py-0.5 rounded text-sky-950 font-mono">Get-FileHash -Algorithm SHA256 &lt;filename&gt;</code>.
          </p>
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
              placeholder="Search by tool name, instrument model (Cobas, Sysmex, Mindray)..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          {/* OS Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">OS:</span>
            <select
              value={selectedOS}
              onChange={(e) => setSelectedOS(e.target.value as SupportedOS | 'all')}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              {osList.map((os) => (
                <option key={os} value={os}>
                  {os === 'all' ? 'All Operating Systems' : os}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
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
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredTools.length} of {SAMPLE_TOOLS_DATA.length} software releases
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-2">
            <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No software matches your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms, changing the category, or selecting &quot;All Operating Systems&quot;.
            </p>
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
