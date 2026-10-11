'use client';

import React, { useState, useMemo } from 'react';
import { getAllGCCs } from '@/lib/data';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { SourceList } from '@/components/SourceList';
import { 
  Building2, 
  Search, 
  MapPin, 
  ExternalLink, 
  Globe2, 
  Briefcase, 
  Users, 
  Calendar,
  Filter
} from 'lucide-react';
import Fuse from 'fuse.js';

export default function ExplorerPage() {
  const allGCCs = useMemo(() => getAllGCCs(), []);
  const [viewMode, setViewMode] = useState<'entity' | 'site'>('entity');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Normalised 8-sector taxonomy
  const standardSectors = [
    'All',
    'Technology',
    'BFSI',
    'Healthcare/Life Sciences',
    'Automotive/ER&D',
    'Manufacturing/ER&D',
    'Retail/CPG',
    'Semiconductors',
    'Professional Services'
  ];

  // Flattened site-level view items
  const allSites = useMemo(() => {
    const list: any[] = [];
    allGCCs.forEach((g) => {
      if (g.campuses && g.campuses.length > 0) {
        g.campuses.forEach((c) => {
          list.push({
            id: `${g.id}_site_${c.city.toLowerCase()}`,
            parentEntityId: g.id,
            name: c.centerName || `${g.name} (${c.city})`,
            parentCompany: g.parentCompany,
            parentCountry: g.parentCountry,
            parentSector: g.parentSector,
            city: c.city,
            state: c.state,
            microMarket: c.microMarket,
            headcountBand: g.headcountBand,
            yearEstablished: g.yearEstablished,
            functions: g.functions,
            operatingModel: g.operatingModel,
            sources: g.sources,
            confidence: g.confidence,
            campuses: [c],
            totalUnitsInIndia: g.totalUnitsInIndia,
          });
        });
      } else {
        list.push(g);
      }
    });
    return list;
  }, [allGCCs]);

  const activeDataset = viewMode === 'entity' ? allGCCs : allSites;

  const cities = useMemo(() => ['All', ...Array.from(new Set(activeDataset.map((g) => g.city)))], [activeDataset]);
  const countries = useMemo(() => ['All', ...Array.from(new Set(activeDataset.map((g) => g.parentCountry)))], [activeDataset]);

  const fuse = useMemo(() => {
    return new Fuse(activeDataset, {
      keys: ['name', 'parentCompany', 'city', 'parentSector', 'functions', 'microMarket'],
      threshold: 0.3,
    });
  }, [activeDataset]);

  const filteredGCCs = useMemo(() => {
    let result = activeDataset;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    if (selectedCity !== 'All') {
      result = result.filter((g) => g.city === selectedCity);
    }

    if (selectedSector !== 'All') {
      result = result.filter((g) => g.parentSector === selectedSector);
    }

    if (selectedCountry !== 'All') {
      result = result.filter((g) => g.parentCountry === selectedCountry);
    }

    return result;
  }, [activeDataset, searchQuery, selectedCity, selectedSector, selectedCountry, fuse]);

  const activeRecord = useMemo(() => {
    return activeDataset.find((g) => g.id === selectedRecordId) || filteredGCCs[0] || null;
  }, [activeDataset, selectedRecordId, filteredGCCs]);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Building2 className="w-3.5 h-3.5" />
          <span>Entity Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          Verified Indian GCC Registry
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          Comprehensive directory of confirmed Global Capability Centres operating across India, cross-verified with Ministry of Corporate Affairs (MCA) filings and official corporate disclosures.
        </p>
      </div>

      {/* View Mode Toggle Strip: Entity vs Site */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-[#14171A]">Granularity Resolution</span>
          <p className="text-[11px] text-[#5E646A]">
            Toggle between parent legal entities (30 profiled) and distinct city campuses (33 physical sites).
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-[#DCD7CE] p-1 bg-[#FDFBF7]">
          <button
            type="button"
            onClick={() => setViewMode('entity')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === 'entity'
                ? 'bg-[#16423C] text-white shadow-xs'
                : 'text-[#5E646A] hover:text-[#14171A]'
            }`}
          >
            Parent Entities ({allGCCs.length})
          </button>
          <button
            type="button"
            onClick={() => setViewMode('site')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === 'site'
                ? 'bg-[#16423C] text-white shadow-xs'
                : 'text-[#5E646A] hover:text-[#14171A]'
            }`}
          >
            Physical Sites ({allSites.length})
          </button>
        </div>
      </div>

      {/* Rippling Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
        <div className="sm:col-span-1 relative">
          <Search className="w-4 h-4 text-[#8B929A] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, tech..."
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg pl-9 pr-3 py-2 text-xs text-[#14171A] placeholder-[#8B929A] focus:outline-none focus:border-[#16423C] transition"
          />
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-xs text-[#4A5056] focus:outline-none focus:border-[#16423C] transition"
          >
            {cities.map((c) => (
              <option key={c} value={c}>City: {c}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-xs text-[#4A5056] focus:outline-none focus:border-[#16423C] transition"
          >
            {standardSectors.map((s) => (
              <option key={s} value={s}>Sector: {s}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-xs text-[#4A5056] focus:outline-none focus:border-[#16423C] transition"
          >
            {countries.map((c) => (
              <option key={c} value={c}>Origin: {c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Layout: Table on Left, Detail Pane on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table View */}
        <div className="lg:col-span-7 bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-xs">
          <div className="divide-y divide-[#E8E5DE] max-h-[680px] overflow-y-auto">
            {filteredGCCs.length === 0 ? (
              <div className="p-12 text-center text-[#8B929A] text-xs">
                No matching GCC records found for the applied filters.
              </div>
            ) : (
              filteredGCCs.map((item) => {
                const isSelected = activeRecord?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRecordId(item.id)}
                    className={`p-4 transition cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#F7F5F0] border-l-4 border-[#16423C]'
                        : 'hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm text-[#14171A]">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#5E646A]">
                          {item.parentCompany} • <span className="font-mono text-[11px]">{item.parentCountry}</span>
                        </div>
                      </div>
                      <ConfidenceBadge level={item.confidence} />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#5E646A]">
                      <span className="flex items-center gap-1 font-medium text-[#14171A]">
                        <MapPin className="w-3 h-3 text-[#16423C]" />
                        {item.city}
                      </span>
                      <span>•</span>
                      <span>{item.parentSector}</span>
                      <span>•</span>
                      <span>Est. {item.yearEstablished}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {item.functions.map((fn: string) => (
                        <span
                          key={fn}
                          className="px-2 py-0.5 rounded bg-[#F0EDE6] text-[10px] text-[#4A5056] font-medium"
                        >
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Entity Audit Drawer */}
        <div className="lg:col-span-5 sticky top-24">
          {activeRecord ? (
            <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-6">
              <div className="space-y-1.5 border-b border-[#E8E5DE] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F0EDE6] text-[#5E646A]">
                    ID: {activeRecord.id}
                  </span>
                  <ConfidenceBadge level={activeRecord.confidence} />
                </div>
                <h2 className="text-xl font-bold text-[#14171A] font-editorial leading-tight">
                  {activeRecord.name}
                </h2>
                <div className="text-xs text-[#5E646A]">
                  Wholly owned subsidiary of <strong>{activeRecord.parentCompany}</strong> ({activeRecord.parentCountry})
                </div>
              </div>

              {/* Data attributes grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] text-xs">
                <div>
                  <span className="text-[#8B929A] block text-[10px] uppercase">Primary Hub</span>
                  <span className="text-[#14171A] font-semibold">{activeRecord.city}, {activeRecord.state}</span>
                </div>
                <div>
                  <span className="text-[#8B929A] block text-[10px] uppercase">Campus Centers</span>
                  <span className="text-[#14171A] font-semibold">{activeRecord.campuses.map((c: any) => `${c.city} (${c.microMarket})`).join(' • ')}</span>
                </div>
                <div>
                  <span className="text-[#8B929A] block text-[10px] uppercase">Operating Model</span>
                  <span className="text-[#14171A] font-semibold capitalize">{activeRecord.operatingModel}</span>
                </div>
                <div>
                  <span className="text-[#8B929A] block text-[10px] uppercase">Headcount Scale</span>
                  <span className="text-[#16423C] font-semibold">{activeRecord.headcountBand} staff</span>
                </div>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider text-[10px]">
                  Core Capabilities & Mandates
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRecord.functions.map((fn: string) => (
                    <span
                      key={fn}
                      className="px-2.5 py-1 rounded-md bg-[#F0EDE6] text-xs text-[#4A5056] font-medium"
                    >
                      {fn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Source Audits */}
              <div className="pt-2 border-t border-[#E8E5DE]">
                <SourceList sources={activeRecord.sources} />
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white border border-[#E8E5DE] rounded-xl text-center text-[#8B929A] text-xs">
              Select any GCC record from the table to inspect primary source audits.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
