'use client';

import React from 'react';
import { getAllProviders } from '@/lib/data';
import { SourceList } from '@/components/SourceList';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  DollarSign, 
  Users, 
  Briefcase 
} from 'lucide-react';

export default function ProvidersPage() {
  const providers = getAllProviders();

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Intermediary Track Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14171A] font-editorial">
          GCC Service Provider Delivery Directory
        </h1>
        <p className="text-sm text-[#5E646A] max-w-3xl leading-relaxed">
          Evaluating setup advisors, commercial tenant brokerages, corporate legal firms, and Employer of Record (EOR) platforms on <strong>actual historical deliveries</strong>, confirmed public clients, and transparent fee models.
        </p>
      </div>

      {/* Grid of Verified Providers */}
      <div className="grid grid-cols-1 gap-6">
        {providers.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-5 hover:border-[#C4BFB5] transition"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E8E5DE] pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-[#14171A] tracking-tight">{p.name}</h2>
                  <ConfidenceBadge level={p.confidence} />
                </div>
                <div className="text-xs text-[#5E646A] mt-1">
                  Category: <span className="text-[#14171A] font-semibold">{p.category}</span> • HQ: <span className="text-[#14171A]">{p.headquarters}</span> • Founded: <span className="font-mono text-[#14171A]">{p.yearFounded}</span>
                </div>
              </div>

              <div className="p-3 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg text-xs sm:text-right">
                <span className="text-[#8B929A] block text-[10px] uppercase font-medium">Verified Delivery Track Record</span>
                <span className="text-[#16423C] font-semibold text-xs">{p.deliveryVolume}</span>
              </div>
            </div>

            {/* Operating Model & Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg space-y-1">
                <span className="text-[#8B929A] font-mono text-[10px] uppercase block">Engagement Model</span>
                <span className="text-[#14171A] font-medium leading-relaxed block">{p.operatingModel}</span>
              </div>

              <div className="p-3.5 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg space-y-1">
                <span className="text-[#8B929A] font-mono text-[10px] uppercase block">Publicly Documented Commercial Terms</span>
                <span className="text-[#14171A] font-medium leading-relaxed block">{p.pricingModel}</span>
              </div>
            </div>

            {p.conflictNote && (
              <div className="p-3 bg-[#FFF8E1] border border-[#FFE082] rounded-lg text-xs text-[#E65100] leading-relaxed">
                <strong>Conflict Disclosure: </strong> {p.conflictNote}
              </div>
            )}

            {/* Confirmed Clients & Capabilities */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#5E646A] font-semibold uppercase tracking-wider text-[10px] block mb-1.5">
                  Confirmed Public GCC Client Engagements:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {p.confirmedPublicClients.map((client, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F0EDE6] text-[#4A5056] rounded-md text-xs font-mono"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#5E646A] font-semibold uppercase tracking-wider text-[10px] block mb-1.5">
                  Verified In-House Capabilities:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#14171A]">
                  {p.verifiedCapabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Primary Source Attributions */}
            <div className="pt-3 border-t border-[#E8E5DE]">
              <SourceList sources={p.officialSources} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
