'use client';

import React from 'react';
import { getReconciliationData } from '@/lib/data';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { 
  Scale, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  Info
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

export default function ReconciliationPage() {
  const records = getReconciliationData();

  const chartData = records.map((r) => ({
    name: r.source.split(' ')[0] + ' ' + (r.source.split(' ')[1] || ''),
    count: r.reportedCount,
    type: r.countType,
  }));

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Scale className="w-3.5 h-3.5" />
          <span>The Definitional Audit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          GCC Count Reconciliation Audit
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          Why does one industry report claim 1,700 GCCs, another quotes 2,000+, and real estate brokerages track 2,975? We map the definitions side-by-side to eliminate market confusion.
        </p>
      </div>

      {/* Analytical Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">Distinction 01</span>
          <h2 className="text-base font-bold text-[#14171A]">Parent Entities vs Physical Units</h2>
          <p className="text-xs text-[#5E646A] leading-relaxed">
            One parent MNC (e.g., Amazon or Goldman Sachs) operating campuses across Bengaluru, Hyderabad, and Pune counts as <strong>1 GCC Entity</strong>, but <strong>3 Physical Sites</strong>.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">Distinction 02</span>
          <h2 className="text-base font-bold text-[#14171A]">Measurement Period (Vintage)</h2>
          <p className="text-xs text-[#5E646A] leading-relaxed">
            FY2024 reports closed at 1,700 entities ($64.6B). By early 2026, accelerated mid-market entries expanded the verified corporate count to <strong>2,117 entities</strong> ($98.4B).
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">Distinction 03</span>
          <h2 className="text-base font-bold text-[#14171A]">Incubation & EOR Thresholds</h2>
          <p className="text-xs text-[#5E646A] leading-relaxed">
            Some advisory models (ANSR, Multiplier) tally pre-incorporation units operating under Employer of Record pods, while NASSCOM requires formal MCA/ROC captive incorporation.
          </p>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#14171A] font-editorial">
            Reported GCC Counts Across Authoritative Sources
          </h2>
          <p className="text-xs text-[#5E646A]">
            Comparing unique corporate entity measurements against physical real estate site audits
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DE" vertical={false} />
              <XAxis dataKey="name" stroke="#8B929A" fontSize={11} tickLine={false} />
              <YAxis stroke="#8B929A" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E8E5DE', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: any, item: any) => [`${val} (${item.payload.type})`, 'Count']}
              />
              <Bar dataKey="count" fill="#16423C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] border-b border-[#E8E5DE] text-[#5E646A] font-medium">
              <tr>
                <th className="p-3.5">Publisher</th>
                <th className="p-3.5">Vintage</th>
                <th className="p-3.5">Reported Figure</th>
                <th className="p-3.5">Count Type</th>
                <th className="p-3.5">Definitional Criteria Applied</th>
                <th className="p-3.5">Discrepancy Cause</th>
                <th className="p-3.5">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DE]">
              {records.map((row, i) => (
                <tr key={i} className="hover:bg-[#FDFBF7] transition">
                  <td className="p-3.5 font-bold text-[#14171A]">
                    <div className="flex items-center gap-1.5">
                      {row.source}
                      {row.url && (
                        <a href={row.url} target="_blank" rel="noreferrer" className="text-[#8B929A] hover:text-[#16423C]">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[#5E646A]">{row.year}</td>
                  <td className="p-3.5 font-bold text-sm text-[#16423C] font-mono">
                    {row.reportedCount.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-[#5E646A]">
                    <span className="px-2 py-0.5 rounded bg-[#F0EDE6] text-[11px] font-medium text-[#4A5056]">
                      {row.countType}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#5E646A] max-w-xs leading-relaxed text-[11px]">
                    {row.definition}
                  </td>
                  <td className="p-3.5 text-[#14171A] max-w-xs leading-relaxed text-[11px]">
                    {row.whyItDiffers}
                  </td>
                  <td className="p-3.5">
                    <ConfidenceBadge level={row.confidence} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
