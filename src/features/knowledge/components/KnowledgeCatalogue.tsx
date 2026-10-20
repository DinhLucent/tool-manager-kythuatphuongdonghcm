'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Info,
  X
} from 'lucide-react';
import { SAMPLE_DOCUMENTS_DATA } from '../data';
import { DocumentCard } from './DocumentCard';
import { DocType, Manufacturer } from '../types';

export function KnowledgeCatalogue() {
  const [search, setSearch] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | 'all'>('all');
  const [selectedDocType, setSelectedDocType] = useState<DocType | 'all'>('all');

  const manufacturers: (Manufacturer | 'all')[] = [
    'all',
    'Roche',
    'Sysmex',
    'Beckman Coulter',
    'Mindray',
    'Abbott',
    'Moxa',
    'General Standard',
  ];

  const docTypes: { key: DocType | 'all'; label: string }[] = [
    { key: 'all', label: 'All Document Types' },
    { key: 'service_manual', label: 'Service Manuals' },
    { key: 'interface_spec', label: 'Interface Specs (ASTM/HL7)' },
    { key: 'troubleshooting_guide', label: 'Troubleshooting Guides' },
    { key: 'wiring_diagram', label: 'Wiring & Schematics' },
    { key: 'user_guide', label: 'User Guides' },
  ];

  const handleKeywordClick = (keyword: string) => {
    setSearch(keyword);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedManufacturer('all');
    setSelectedDocType('all');
  };

  const filteredDocuments = useMemo(() => {
    return SAMPLE_DOCUMENTS_DATA.filter((doc) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        doc.title.toLowerCase().includes(q) ||
        doc.deviceModel.toLowerCase().includes(q) ||
        doc.manufacturer.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesManufacturer =
        selectedManufacturer === 'all' || doc.manufacturer === selectedManufacturer;

      const matchesDocType =
        selectedDocType === 'all' || doc.docType === selectedDocType;

      return matchesSearch && matchesManufacturer && matchesDocType;
    });
  }, [search, selectedManufacturer, selectedDocType]);

  const hasActiveFilters = search !== '' || selectedManufacturer !== 'all' || selectedDocType !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-sky-600" />
            Technical Document & Protocol Catalogue
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Service manuals, wiring schematics, and ASTM/HL7 interface specifications for hospital laboratory devices.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{SAMPLE_DOCUMENTS_DATA.length} Indexed Manuals</span>
        </div>
      </div>

      {/* RAG Notice / Roadmap indicator */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-slate-700">
        <Info className="w-4 h-4 text-slate-500 shrink-0" />
        <p>
          <strong>Fast Keyword Indexing:</strong> Full-text keyword and metadata search are active. AI-assisted semantic search and RAG vector indexing will be integrated in Phase 2.
        </p>
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
              placeholder="Search by instrument model (Cobas c501, XN-550, BC-5380), keyword or protocol..."
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

          {/* Manufacturer Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">Brand:</span>
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value as Manufacturer | 'all')}
              className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              {manufacturers.map((m) => (
                <option key={m} value={m}>
                  {m === 'all' ? 'All Manufacturers' : m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Document Type Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
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
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Document Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredDocuments.length} of {SAMPLE_DOCUMENTS_DATA.length} technical manuals
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No documents found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No technical manuals match your filter parameters. Try clearing the search keyword or selecting &quot;All Manufacturers&quot;.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onKeywordClick={handleKeywordClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
