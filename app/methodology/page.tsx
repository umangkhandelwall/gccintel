import React from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Layers, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-[#E8E5DE] pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Trust & Verification Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#14171A] font-editorial">
          Research Methodology & Definitional Framework
        </h1>
        <p className="text-sm sm:text-base text-[#5E646A] leading-relaxed">
          How GCC Intel audits entity counts, distinguishes corporate parents from real estate units, verifies primary sources, and discloses ecosystem conflicts.
        </p>
      </div>

      {/* Core Taxonomies */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#14171A] font-editorial">
          1. The Definitional Standard: Entity vs. Unit
        </h2>
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-3 text-xs leading-relaxed text-[#5E646A]">
          <p>
            The single largest cause of confusion in the Indian GCC market is the casual conflation of <strong className="text-[#14171A]">Unique Corporate Entities</strong> with <strong className="text-[#14171A]">Physical Operational Units</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E8E5DE] space-y-1.5">
              <span className="font-bold text-[#14171A] text-sm block">Unique Corporate Entity (GCC)</span>
              <p>
                A multinational corporation&apos;s distinct legal captive subsidiary operating in India with direct engineering, product, or operational mandates. E.g., <strong className="text-[#14171A]">Microsoft Corporation</strong> or <strong className="text-[#14171A]">JPMorgan Chase</strong> is tallied as <strong className="text-[#16423C]">exactly 1 GCC entity</strong>.
              </p>
              <span className="text-[11px] font-mono text-[#16423C] block pt-1">Total National Count: 2,117 (Zinnov-NASSCOM FY26)</span>
            </div>

            <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#E8E5DE] space-y-1.5">
              <span className="font-bold text-[#14171A] text-sm block">Physical Operational Unit (Center / Site)</span>
              <p>
                An individual physical office or campus. When JPMorgan operates campuses across Bengaluru, Hyderabad, and Mumbai, it represents <strong className="text-[#16423C]">3 Operational Units</strong> under 1 corporate entity.
              </p>
              <span className="text-[11px] font-mono text-[#16423C] block pt-1">Total National Units: 3,728 (Zinnov-NASSCOM FY26)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Tiers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#14171A] font-editorial">
          2. What &quot;Verified&quot; Means on this Platform
        </h2>
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-4 text-xs text-[#5E646A] leading-relaxed">
          <p>
            Every record on GCC Intel carries a strict verification flag with defined criteria:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg">
              <div className="font-bold text-[#2E7D32] flex items-center gap-1.5 text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified (High Confidence)</span>
              </div>
              <p className="text-[#1B5E20]">
                Requires primary documentation: official corporate press releases, published investor presentations, or state government gazette notifications. Zero synthetic or extrapolated fields permitted.
              </p>
            </div>

            <div className="p-3 bg-[#FFF8E1] border border-[#FFE082] rounded-lg">
              <div className="font-bold text-[#F57F17] flex items-center gap-1.5 text-xs mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Audited (Medium Confidence)</span>
              </div>
              <p className="text-[#E65100]">
                Sourced from credible secondary publications (e.g., CBRE/JLL market absorption studies, The Hindu BusinessLine, Economic Times). Used when private commercial terms or exact square footage are not public disclosures.
              </p>
            </div>

            <div className="p-3 bg-[#F7F5F0] border border-[#E8E5DE] rounded-lg">
              <div className="font-bold text-[#14171A] flex items-center gap-1.5 text-xs mb-1">
                <span>&quot;Not Disclosed&quot; Policy</span>
              </div>
              <p className="text-[#5E646A]">
                Whenever an exact figure cannot be verified from a published source (such as proprietary advisor fee schedules or unconfirmed deal values), we explicitly mark it as <strong className="text-[#14171A]">&quot;Not disclosed&quot;</strong> rather than displaying speculative estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Boundaries */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#14171A] font-editorial">
          3. Inclusion & Exclusion Boundaries
        </h2>
        <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-3 text-xs text-[#5E646A] leading-relaxed">
          <ul className="space-y-2 list-disc pl-4 text-[#14171A]">
            <li>
              <strong>Excluded:</strong> Pure-play third-party IT outsourcers, BPO service providers (e.g., Genpact, WNS), and external professional services practices (e.g., Deloitte consulting delivery centers) are excluded from the captive GCC registry to maintain definitional purity.
            </li>
            <li>
              <strong>Included:</strong> Wholly-owned Global Capability Centers, Global In-House Centers (GICs), and R&D engineering facilities owned directly by foreign parent corporations.
            </li>
          </ul>
        </div>
      </section>

      {/* Conflict Disclosure */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#14171A] font-editorial">
          4. Ecosystem Conflict of Interest Disclosures
        </h2>
        <div className="p-6 bg-[#FFF8E1] border border-[#FFE082] rounded-xl space-y-2 text-xs text-[#E65100] leading-relaxed">
          <div className="font-bold text-sm text-[#F57F17] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Zinnov Dual-Role Conflict Note</span>
          </div>
          <p>
            Users should note that <strong className="text-[#B78103]">Zinnov Management Consulting</strong> serves a dual role in the ecosystem: they are both the primary research co-author of the official NASSCOM India GCC Landscape report cited nationwide, and an active commercial advisory firm competing for setup consulting retainers. GCC Intel evaluates them strictly on documented public client engagements.
          </p>
        </div>
      </section>
    </div>
  );
}
