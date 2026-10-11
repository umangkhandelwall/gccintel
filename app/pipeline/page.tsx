'use client';

import React, { useState } from 'react';
import { getAllPipelineSignals } from '@/lib/data';
import { SourceList } from '@/components/SourceList';
import { 
  Radio, 
  MapPin, 
  Building2, 
  Calendar, 
  Search, 
  ArrowUpRight 
} from 'lucide-react';

export default function PipelinePage() {
  const signals = getAllPipelineSignals();
  const [filterCity, setFilterCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['All', ...Array.from(new Set(signals.map((s) => s.targetCity)))];

  const filteredSignals = signals.filter((s) => {
    const matchesCity = filterCity === 'All' || s.targetCity === filterCity;
    const matchesSearch = 
      s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.targetCluster.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Radio className="w-3.5 h-3.5" />
          <span>2026 Pipeline Signals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          Recent Entrants & 2026 Pipeline Signals
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          Tracking global multinationals in active setup, commercial leasing, or initial operational ramp in India during 2026. Every record is verified against public state MoUs, newsroom announcements, or registered leasing transactions.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8B929A] shrink-0 ml-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, sector, or micro-cluster..."
            className="w-full bg-transparent text-xs text-[#14171A] placeholder-[#8B929A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5E646A] font-medium">Location Hub:</span>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-1.5 text-xs text-[#14171A] focus:outline-none focus:border-[#16423C]"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Signals List View */}
      <div className="space-y-4">
        {filteredSignals.map((item) => {
          // Calculate signal age in months relative to Oct 2026
          const signalYear = parseInt(item.signalDate.split('-')[0], 10);
          const signalMonth = parseInt(item.signalDate.split('-')[1], 10);
          const ageMonths = (2026 - signalYear) * 12 + (10 - signalMonth);
          const signalAgeText = ageMonths <= 1 ? 'Current month' : `${ageMonths} months ago`;

          return (
            <div
              key={item.id}
              className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-4 hover:border-[#C4BFB5] transition"
            >
              {/* Headline bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E5DE] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#14171A] tracking-tight">
                      {item.companyName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                      Status: {item.signalStatus}
                    </span>
                  </div>
                  <div className="text-xs text-[#5E646A] mt-0.5">
                    HQ: <span className="text-[#14171A]">{item.headquarters}</span> • Sector: <span className="text-[#14171A]">{item.sector}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-[#8B929A] block text-[10px] uppercase font-medium">Signal Age & Detection</span>
                  <span className="text-[#14171A] font-mono flex items-center sm:justify-end gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#F0EDE6] text-[10px] font-medium text-[#16423C]">
                      {signalAgeText}
                    </span>
                    <Calendar className="w-3 h-3 text-[#5E646A]" />
                    {item.signalDate}
                  </span>
                </div>
              </div>

            {/* Metrics breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg text-xs">
              <div>
                <span className="text-[#8B929A] block text-[10px] uppercase">Target Hub</span>
                <span className="text-[#14171A] font-bold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#16423C] shrink-0" />
                  {item.targetCity}, {item.targetState}
                </span>
              </div>
              <div>
                <span className="text-[#8B929A] block text-[10px] uppercase">Micro-Market</span>
                <span className="text-[#14171A] font-semibold block mt-0.5 truncate">{item.targetCluster}</span>
              </div>
              <div>
                <span className="text-[#8B929A] block text-[10px] uppercase">Committed Capital</span>
                <span className="text-[#16423C] font-bold block mt-0.5">{item.investmentAnnounced}</span>
              </div>
              <div>
                <span className="text-[#8B929A] block text-[10px] uppercase">Projected Headcount</span>
                <span className="text-[#14171A] font-semibold block mt-0.5">{item.projectedHeadcount}</span>
              </div>
            </div>

            {/* Lead indicator & Workloads */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#5E646A] font-medium">Detection Indicator: </span>
                <span className="text-[#14171A] font-medium">{item.leadIndicator}</span>
              </div>

              <div>
                <span className="text-[#5E646A] font-medium">ROC Incorporation Evidence: </span>
                <span className="text-[#5E646A] font-mono text-[11px]">{item.filingEvidence}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[#5E646A] text-[11px]">Core Mandates:</span>
                {item.keyWorkloads.map((w, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#F0EDE6] text-[#4A5056] rounded text-[11px]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Citations Audit */}
            <div className="pt-2 border-t border-[#E8E5DE]">
              <SourceList sources={item.officialSources} />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
