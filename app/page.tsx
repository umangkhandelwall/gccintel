import Link from 'next/link';
import { 
  getAllGCCs, 
  getAllCities, 
  getReconciliationData, 
  getAllPipelineSignals,
  getAllProviders 
} from '@/lib/data';
import { 
  Building2, 
  MapPin, 
  Scale, 
  Radio, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  Terminal,
  Calculator
} from 'lucide-react';

export default function Home() {
  const gccs = getAllGCCs();
  const cities = getAllCities();
  const reconciliation = getReconciliationData();
  const pipeline = getAllPipelineSignals();
  const providers = getAllProviders();

  return (
    <div className="space-y-16">
      {/* Rippling Hero Section: Honest framing & clear metrics */}
      <section className="space-y-6 pt-4 sm:pt-8 border-b border-[#E8E5DE] pb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <span className="w-2 h-2 rounded-full bg-[#16423C]"></span>
          <span>Source-Attributed Market Intelligence for India GCCs</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#14171A] font-editorial max-w-4xl leading-[1.12]">
          Go global in India. <br />
          <span className="text-[#16423C] italic font-normal">
            Without the guessing, brokers, or bad data.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#5E646A] max-w-2xl leading-relaxed">
          India hosts 2,117 Global Capability Centre entities across 3,728 physical units. GCC Intel replaces the information asymmetry with a source-attributed, verified intelligence layer for setup advisors and multinational decision-makers.
        </p>

        {/* Action Buttons: Relabeled with honest framing */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/calculator"
            className="px-5 py-2.5 rounded-lg bg-[#16423C] hover:bg-[#2D6A4F] text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Launch Setup Cost Estimator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/explorer"
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-[#F7F5F0] text-[#14171A] border border-[#DCD7CE] font-semibold text-sm transition shadow-sm"
          >
            Explore 30 Profiled Entity Records
          </Link>

          <Link
            href="/reconciliation"
            className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-[#F0EDE6] text-[#16423C] font-semibold text-sm transition flex items-center gap-1.5"
          >
            <span>2,117 Entities vs 3,728 Units Audit</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Corrected & Attributed Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#E8E5DE]">
          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Unique Corporate Entities</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">2,117</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">Zinnov-NASSCOM FY26 Report</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Physical Operational Units</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">3,728</span>
            <span className="text-[11px] text-[#5E646A] mt-1 block">Centers across Indian Cities</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Grade-A Office Rent Spread</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">₹67 – ₹140</span>
            <span className="text-[11px] text-[#5E646A] mt-1 block">₹/sq ft/mo (CBRE / JLL India)</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Direct Cash Subsidies</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#16423C] font-editorial block mt-1">Up to 30%</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">State Gazette Budget Orders</span>
          </div>
        </div>
      </section>

      {/* Structured Module Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E8E5DE] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#14171A] font-editorial tracking-tight">
              A single platform for the entire India setup journey
            </h2>
            <p className="text-xs text-[#5E646A] mt-1">
              From feasibility modeling to city selection, statutory incentives, and service provider evaluation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Calculator */}
          <Link
            href="/calculator"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
                Setup Cost & Timeline Estimator
              </h3>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32]">
                NEW-ENTRANT FLOW
              </span>
            </div>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Calculate Year 1 operating budgets, real estate square footage, and applicable state subsidies based on team headcount and sector.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Run feasibility calculation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: Count Audit */}
          <Link
            href="/reconciliation"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              The Count Reconciliation Audit
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Explaining the 2,117 GCC entities vs. 3,728 physical units benchmark from the same Zinnov-NASSCOM FY26 study.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>View discrepancy audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Comparator */}
          <Link
            href="/comparator"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              City Cost & Rent Comparator
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Compare Grade-A office rents and talent cost indices between Bengaluru (₹93), Hyderabad (₹67), Pune (₹81), and Chennai (₹75).
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Compare tech hubs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Policies */}
          <Link
            href="/policies"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              State Policy Gazettes
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Quantified legal subsidies: Tamil Nadu 30% payroll grants, Karnataka KDEM intern stipends, and Gujarat GIFT City 10-year tax holiday.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Inspect state subsidies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: Providers */}
          <Link
            href="/providers"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              Service Provider Directory
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Track records for setup advisors (ANSR, Zinnov), commercial brokers (JLL), and law firms (CAM), with explicit conflict of interest disclosures.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Inspect provider records</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 6: Terminal */}
          <Link
            href="/ask"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              Grounded AI Terminal
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Dynamic multi-entity retrieval engine that synthesizes answers strictly from verified dataset rows and explicitly refuses unverified claims.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Launch data terminal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Verified GCC Registry Snippet */}
      <section className="space-y-4 pt-4 border-t border-[#E8E5DE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#14171A] font-editorial tracking-tight">
              Sample Profiled Captive Entities (30 of 2,117 Prototype Sample)
            </h2>
            <p className="text-xs text-[#5E646A]">
              Consolidated at the parent entity level with multi-campus mapping.
            </p>
          </div>
          <Link
            href="/explorer"
            className="text-xs font-semibold text-[#16423C] hover:text-[#2D6A4F] flex items-center gap-1"
          >
            <span>View all 30 profiled entities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F5F0] border-b border-[#E8E5DE] text-[#5E646A] font-medium">
                <tr>
                  <th className="p-3.5">Parent Entity</th>
                  <th className="p-3.5">Global Origin</th>
                  <th className="p-3.5">Primary Indian Hub</th>
                  <th className="p-3.5">Sector</th>
                  <th className="p-3.5">Multi-City Sites</th>
                  <th className="p-3.5">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E5DE] text-[#14171A]">
                {gccs.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-[#FDFBF7] transition">
                    <td className="p-3.5 font-semibold text-[#14171A]">{item.parentCompany}</td>
                    <td className="p-3.5 text-[#5E646A]">{item.parentCountry}</td>
                    <td className="p-3.5 text-[#5E646A]">{item.primaryHub}</td>
                    <td className="p-3.5 text-[#5E646A]">{item.parentSector}</td>
                    <td className="p-3.5 font-mono text-[#5E646A]">{item.totalUnitsInIndia} Center(s)</td>
                    <td className="p-3.5 text-[#2E7D32] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.sources.length} Primary Citations</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
