'use client';

import React, { useState } from 'react';
import { getAllCities } from '@/lib/data';
import { SourceList } from '@/components/SourceList';
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export default function ComparatorPage() {
  const cities = getAllCities();
  const [cityAId, setCityAId] = useState('bengaluru');
  const [cityBId, setCityBId] = useState('hyderabad');

  const cityA = cities.find((c) => c.id === cityAId) || cities[0];
  const cityB = cities.find((c) => c.id === cityBId) || cities[1];

  const rentChartData = cities.map((c) => ({
    name: c.name.split(' ')[0],
    avgRent: c.avgRent,
    gccCount: c.gccCount,
  }));

  const getVerdict = () => {
    if (cityA.id === 'bengaluru' && cityB.id === 'hyderabad') {
      return {
        winner: 'Contextual Arbitrage',
        summary: 'Bengaluru commands deep R&D and specialized AI talent prestige. Hyderabad delivers an immediate 28% Grade-A office rent savings (₹67 vs ₹93/sq ft) and legally guaranteed 15-day approvals under TS-iPASS.',
        recommendation: 'Select Bengaluru for high-seniority AI/ML algorithms & specialized architecture. Select Hyderabad for enterprise cloud, fintech scaling, and 100+ headcount operational hubs.',
      };
    }
    if (cityA.id === 'chennai' || cityB.id === 'chennai') {
      return {
        winner: 'Tamil Nadu Fiscal Advantage',
        summary: 'Chennai delivers top engineering discipline with 8-15% lower attrition and direct state cash payroll subsidies (30% in Year 1 for roles >₹1L/mo).',
        recommendation: 'Ideal for ER&D, automotive tech, and cost-disciplined SaaS centers looking to bypass Tier-1 poaching.',
      };
    }
    return {
      winner: `${cityA.avgRent < cityB.avgRent ? cityA.name : cityB.name} on Real Estate Cost`,
      summary: `Substantial divergence in operating costs and specialized talent density between ${cityA.name} and ${cityB.name}.`,
      recommendation: `Align your decision with primary sector mandate: ${cityA.topSectors[0]} vs ${cityB.topSectors[0]}.`,
    };
  };

  const verdict = getVerdict();

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Location Benchmarking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          City & Micro-Market Comparator
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          Evaluate cross-city operating costs, Grade-A office rents, talent cost indices, and state ecosystems across India&apos;s leading tech hubs.
        </p>
      </div>

      {/* City Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-[#5E646A] mb-1.5 uppercase tracking-wider">
            City Benchmark A
          </label>
          <select
            value={cityAId}
            onChange={(e) => setCityAId(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm text-[#14171A] focus:outline-none focus:border-[#16423C] transition"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === cityBId}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5E646A] mb-1.5 uppercase tracking-wider">
            City Benchmark B
          </label>
          <select
            value={cityBId}
            onChange={(e) => setCityBId(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm text-[#14171A] focus:outline-none focus:border-[#16423C] transition"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === cityAId}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City A Card */}
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-[#E8E5DE] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">{cityA.state}</span>
              <h2 className="text-2xl font-bold text-[#14171A] font-editorial mt-0.5">{cityA.name}</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C]">
              {cityA.gccCount} GCC Units
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] text-xs">
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Avg Grade-A Rent</span>
              <span className="text-[#14171A] font-bold text-base">₹{cityA.avgRent} <span className="text-[#5E646A] font-normal text-xs">/sqft/mo</span></span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Rent Range</span>
              <span className="text-[#14171A] font-semibold">₹{cityA.gradeARentRange.min} - ₹{cityA.gradeARentRange.max}</span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Talent Cost Index</span>
              <span className="text-[#16423C] font-bold">{cityA.talentCostIndex}x</span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">GCC Workforce</span>
              <span className="text-[#14171A] font-semibold">{cityA.totalHeadcount ? `${(cityA.totalHeadcount / 1000).toFixed(0)}k staff` : 'Estimated'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider text-[10px]">Dominant Sector Clusters</span>
            <div className="flex flex-wrap gap-1.5">
              {cityA.topSectors.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-[#F0EDE6] text-xs text-[#4A5056]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <span className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider text-[10px]">Micro-Market Corridors</span>
            <p className="text-[#14171A] leading-relaxed">{cityA.microMarkets.join(' • ')}</p>
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-[#E8E5DE]">
            <div className="flex items-start gap-2 text-[#2E7D32]">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{cityA.keyStrengths[0]}</span>
            </div>
            <div className="flex items-start gap-2 text-[#C62828]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{cityA.primaryChallenge}</span>
            </div>
          </div>

          <SourceList sources={cityA.sources} />
        </div>

        {/* City B Card */}
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-5">
          <div className="flex items-start justify-between border-b border-[#E8E5DE] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">{cityB.state}</span>
              <h2 className="text-2xl font-bold text-[#14171A] font-editorial mt-0.5">{cityB.name}</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C]">
              {cityB.gccCount} GCC Units
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] text-xs">
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Avg Grade-A Rent</span>
              <span className="text-[#14171A] font-bold text-base">₹{cityB.avgRent} <span className="text-[#5E646A] font-normal text-xs">/sqft/mo</span></span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Rent Range</span>
              <span className="text-[#14171A] font-semibold">₹{cityB.gradeARentRange.min} - ₹{cityB.gradeARentRange.max}</span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">Talent Cost Index</span>
              <span className="text-[#16423C] font-bold">{cityB.talentCostIndex}x</span>
            </div>
            <div>
              <span className="text-[#8B929A] block text-[10px] uppercase">GCC Workforce</span>
              <span className="text-[#14171A] font-semibold">{cityB.totalHeadcount ? `${(cityB.totalHeadcount / 1000).toFixed(0)}k staff` : 'Estimated'}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider text-[10px]">Dominant Sector Clusters</span>
            <div className="flex flex-wrap gap-1.5">
              {cityB.topSectors.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-[#F0EDE6] text-xs text-[#4A5056]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <span className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider text-[10px]">Micro-Market Corridors</span>
            <p className="text-[#14171A] leading-relaxed">{cityB.microMarkets.join(' • ')}</p>
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-[#E8E5DE]">
            <div className="flex items-start gap-2 text-[#2E7D32]">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{cityB.keyStrengths[0]}</span>
            </div>
            <div className="flex items-start gap-2 text-[#C62828]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{cityB.primaryChallenge}</span>
            </div>
          </div>

          <SourceList sources={cityB.sources} />
        </div>
      </div>

      {/* Sourcing Verdict Callout */}
      <div className="p-6 bg-[#F7F5F0] border border-[#E8E5DE] rounded-xl space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#16423C]">
          Strategic Recommendation: {verdict.winner}
        </div>
        <p className="text-sm text-[#14171A] leading-relaxed">
          {verdict.summary}
        </p>
        <div className="pt-2 text-xs text-[#5E646A]">
          <strong className="text-[#16423C]">Operational Guidance: </strong>
          {verdict.recommendation}
        </div>
      </div>

      {/* Grade-A Rent Chart */}
      <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#14171A] font-editorial">
            Grade-A Office Rent Benchmarks (₹/sq ft/month)
          </h2>
          <p className="text-xs text-[#5E646A]">
            Weighted average quotes from CBRE and JLL commercial real estate market reports
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DE" vertical={false} />
              <XAxis dataKey="name" stroke="#8B929A" fontSize={11} tickLine={false} />
              <YAxis stroke="#8B929A" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E8E5DE', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: any) => [`₹${value}/sqft/month`, 'Average Rent']}
              />
              <Bar dataKey="avgRent" fill="#16423C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
