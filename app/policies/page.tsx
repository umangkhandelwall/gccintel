'use client';

import React, { useState } from 'react';
import { getAllPolicies } from '@/lib/data';
import { SourceList } from '@/components/SourceList';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  DollarSign, 
  Building2, 
  Award
} from 'lucide-react';

export default function PoliciesPage() {
  const policies = getAllPolicies();
  const [activeState, setActiveState] = useState(policies[0].state);

  const currentPolicy = policies.find((p) => p.state === activeState) || policies[0];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <FileText className="w-3.5 h-3.5" />
          <span>Statutory Gazette Subsidies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          State GCC Policies & Incentive Frameworks
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          State governments actively compete for high-value GCC investments. We translate legal gazettes and official budget orders into quantified financial formulas.
        </p>
      </div>

      {/* State Switcher Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#F0EDE6] rounded-xl border border-[#E0DCD3]">
        {policies.map((p) => {
          const isActive = p.state === activeState;
          return (
            <button
              key={p.id}
              onClick={() => setActiveState(p.state)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-[#16423C] shadow-xs'
                  : 'text-[#5E646A] hover:text-[#14171A]'
              }`}
            >
              <span>{p.state}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-[#F0EDE6] text-[#16423C]' : 'text-[#8B929A]'}`}>
                {p.policyYear}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Policy Detail Canvas */}
      <div className="p-8 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E5DE] pb-5">
          <div>
            <span className="text-xs font-mono uppercase text-[#16423C] font-semibold tracking-wider">
              {currentPolicy.nodalAgency}
            </span>
            <h2 className="text-2xl font-bold text-[#14171A] font-editorial mt-0.5">
              {currentPolicy.policyName}
            </h2>
            <div className="text-xs text-[#5E646A] mt-1">
              Target Vision: <strong className="text-[#14171A]">{currentPolicy.target}</strong>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ConfidenceBadge level={currentPolicy.confidence} />
            {currentPolicy.officialUrl && (
              <a
                href={currentPolicy.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#F0EDE6] border border-[#E8E5DE] text-[#14171A] text-xs font-semibold inline-flex items-center gap-1.5 transition"
              >
                Gazette Portal
                <ExternalLink className="w-3.5 h-3.5 text-[#16423C]" />
              </a>
            )}
          </div>
        </div>

        {/* Quantified Incentives Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#5E646A] uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#16423C]" />
            Quantified Financial Subsidies & Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPolicy.incentives.map((inc, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#14171A] capitalize">
                    {inc.type.replace('_', ' ')}
                  </span>
                  {inc.quantifiedValue && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                      {inc.quantifiedValue}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5E646A] leading-relaxed">
                  {inc.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria & Clearance Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E8E5DE]">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#5E646A] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#16423C]" />
              Statutory Eligibility Thresholds
            </h3>
            <ul className="space-y-2 text-xs text-[#14171A]">
              {currentPolicy.eligibilityCriteria.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#5E646A] uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#16423C]" />
              Application & Statutory SLAs
            </h3>
            <div className="p-3.5 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] text-xs text-[#14171A] leading-relaxed">
              {currentPolicy.applicationProcess}
            </div>
            <SourceList sources={currentPolicy.sources} />
          </div>
        </div>
      </div>
    </div>
  );
}
