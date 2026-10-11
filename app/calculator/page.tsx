'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  MapPin, 
  Building2, 
  DollarSign, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [sector, setSector] = useState('Software & Enterprise Tech');
  const [headcount, setHeadcount] = useState(100);
  const [city, setCity] = useState('Hyderabad');

  // Realistic city cost parameters
  const cityParams: Record<string, { rentPerSqft: number; talentIndex: number; subsidy: string; timeToSet: string; state: string }> = {
    'Bengaluru': { rentPerSqft: 93, talentIndex: 1.15, subsidy: 'KDEM 50% intern stipend + Beyond Bengaluru duty waiver', timeToSet: '16–22 weeks', state: 'Karnataka' },
    'Hyderabad': { rentPerSqft: 67, talentIndex: 0.95, subsidy: 'TS-iPASS 15-day statutory approval + Industrial power tariff', timeToSet: '12–16 weeks', state: 'Telangana' },
    'Pune': { rentPerSqft: 81, talentIndex: 0.90, subsidy: 'Maha GCC Policy 2025 capex grants + 100% stamp duty waiver', timeToSet: '14–18 weeks', state: 'Maharashtra' },
    'Chennai': { rentPerSqft: 75, talentIndex: 0.88, subsidy: 'Special Scheme 30% cash payroll subsidy (Year 1 for CTC ≥ ₹1L/mo)', timeToSet: '14–18 weeks', state: 'Tamil Nadu' }
  };

  const currentParam = cityParams[city] || cityParams['Hyderabad'];

  // 100 sqft per engineer standard
  const officeSqft = headcount * 100;
  const monthlyRentInr = officeSqft * currentParam.rentPerSqft;
  const annualRentInr = monthlyRentInr * 12;
  const annualRentUsd = Math.round(annualRentInr / 85); // 1 USD = ~85 INR

  // Blended average fully loaded cost per engineer (Senior + Mid + Junior)
  // Baseline ~₹28 Lakh / year in tier 1 tech
  const blendedAnnualSalaryInr = 2800000 * currentParam.talentIndex;
  const totalAnnualPayrollInr = headcount * blendedAnnualSalaryInr;
  const totalAnnualPayrollUsd = Math.round(totalAnnualPayrollInr / 85);

  // Total Year 1 Operating Estimate
  const totalYear1EstimateUsd = annualRentUsd + totalAnnualPayrollUsd;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Calculator className="w-3.5 h-3.5" />
          <span>New-Entrant Decision Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#14171A] font-editorial">
          GCC Setup Feasibility & Cost Estimator
        </h1>
        <p className="text-sm sm:text-base text-[#5E646A] leading-relaxed">
          Input your target team scale, sector focus, and preferred hub to generate a bottom-up operating budget, real estate footprint, and applicable state subsidies.
        </p>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-[#5E646A] mb-1.5 uppercase tracking-wider">
            Target Headcount
          </label>
          <select
            value={headcount}
            onChange={(e) => setHeadcount(Number(e.target.value))}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm text-[#14171A] focus:outline-none focus:border-[#16423C]"
          >
            <option value={50}>50 Engineers (Incubation Pod)</option>
            <option value={100}>100 Engineers (Standard GCC)</option>
            <option value={250}>250 Engineers (Scaling Center)</option>
            <option value={500}>500+ Engineers (Flagship Campus)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5E646A] mb-1.5 uppercase tracking-wider">
            Sector Mandate
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm text-[#14171A] focus:outline-none focus:border-[#16423C]"
          >
            <option value="Software & Enterprise Tech">Software & Enterprise Tech</option>
            <option value="BFSI & FinTech">BFSI & FinTech</option>
            <option value="Automotive & Mobility ER&D">Automotive & Mobility ER&D</option>
            <option value="Semiconductors & Electronics">Semiconductors & Electronics</option>
            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5E646A] mb-1.5 uppercase tracking-wider">
            Primary Location Hub
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-3 py-2 text-sm text-[#14171A] focus:outline-none focus:border-[#16423C]"
          >
            <option value="Hyderabad">Hyderabad (Telangana)</option>
            <option value="Bengaluru">Bengaluru (Karnataka)</option>
            <option value="Pune">Pune (Maharashtra)</option>
            <option value="Chennai">Chennai (Tamil Nadu)</option>
          </select>
        </div>
      </div>

      {/* Calculated Output Breakdown */}
      <div className="p-8 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DE] pb-5">
          <div>
            <span className="text-xs font-mono uppercase text-[#16423C] font-semibold">
              Feasibility Projection for {headcount} Staff in {city}
            </span>
            <h2 className="text-2xl font-bold text-[#14171A] font-editorial mt-0.5">
              Est. Year 1 Operating Budget: ${ (totalYear1EstimateUsd / 1000000).toFixed(2) }M USD
            </h2>
          </div>
          <div className="text-right text-xs">
            <span className="text-[#8B929A] block text-[10px] uppercase font-medium">Setup Timeline</span>
            <span className="text-[#16423C] font-semibold text-sm">{currentParam.timeToSet}</span>
          </div>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg space-y-1">
            <span className="text-xs text-[#5E646A] font-medium block">Grade-A Office Footprint</span>
            <span className="text-xl font-bold text-[#14171A] font-editorial block">
              {officeSqft.toLocaleString()} sq ft
            </span>
            <span className="text-[11px] text-[#5E646A] block">
              @ ₹{currentParam.rentPerSqft}/sqft/mo (${(annualRentUsd / 1000).toFixed(0)}k/year)
            </span>
          </div>

          <div className="p-4 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg space-y-1">
            <span className="text-xs text-[#5E646A] font-medium block">Annual Loaded Payroll</span>
            <span className="text-xl font-bold text-[#14171A] font-editorial block">
              ${(totalAnnualPayrollUsd / 1000000).toFixed(2)}M USD
            </span>
            <span className="text-[11px] text-[#5E646A] block">
              Cost Index: {currentParam.talentIndex}x vs national average
            </span>
          </div>

          <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg space-y-1">
            <span className="text-xs text-[#2E7D32] font-semibold block">Applicable State Policy</span>
            <span className="text-sm font-bold text-[#1B5E20] block leading-tight">
              {currentParam.state} Framework
            </span>
            <span className="text-[11px] text-[#2E7D32] block leading-relaxed">
              {currentParam.subsidy}
            </span>
          </div>
        </div>

        {/* Recommended Provider Roadmap */}
        <div className="pt-4 border-t border-[#E8E5DE] space-y-3">
          <h3 className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider">
            Recommended Next-Step Setup Actions:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#14171A]">
            <Link
              href="/policies"
              className="p-3 bg-[#FDFBF7] border border-[#E8E5DE] hover:border-[#16423C] rounded-lg flex items-center justify-between group transition"
            >
              <span>Inspect {currentParam.state} policy subsidy details</span>
              <ChevronRight className="w-4 h-4 text-[#8B929A] group-hover:text-[#16423C]" />
            </Link>

            <Link
              href="/providers"
              className="p-3 bg-[#FDFBF7] border border-[#E8E5DE] hover:border-[#16423C] rounded-lg flex items-center justify-between group transition"
            >
              <span>View audited setup advisors & EOR options</span>
              <ChevronRight className="w-4 h-4 text-[#8B929A] group-hover:text-[#16423C]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
