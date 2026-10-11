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
  Terminal
} from 'lucide-react';

export default function Home() {
  const gccs = getAllGCCs();
  const cities = getAllCities();
  const reconciliation = getReconciliationData();
  const pipeline = getAllPipelineSignals();
  const providers = getAllProviders();

  return (
    <div className="space-y-16">
      {/* Rippling Hero Section: Editorial typography with warm cream backdrop */}
      <section className="space-y-6 pt-4 sm:pt-8 border-b border-[#E8E5DE] pb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <span className="w-2 h-2 rounded-full bg-[#16423C]"></span>
          <span>Single Source of Truth for India GCC Infrastructure</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#14171A] font-editorial max-w-4xl leading-[1.12]">
          Go global in India. <br />
          <span className="text-[#16423C] italic font-normal">
            Without the guessing, brokers, or bad data.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#5E646A] max-w-2xl leading-relaxed">
          Setting up an offshore Global Capability Center shouldn&apos;t require navigating conflicting consultant PDFs and back-channel WhatsApp rumors. GCC Intel brings all corporate registrations, commercial leases, and state subsidies into one verified platform.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/explorer"
            className="px-5 py-2.5 rounded-lg bg-[#16423C] hover:bg-[#2D6A4F] text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
          >
            <span>Explore 2,117 GCC Registry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/comparator"
            className="px-5 py-2.5 rounded-lg bg-white hover:bg-[#F7F5F0] text-[#14171A] border border-[#DCD7CE] font-semibold text-sm transition shadow-sm"
          >
            Compare Tech Hubs & Rents
          </Link>

          <Link
            href="/reconciliation"
            className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-[#F0EDE6] text-[#16423C] font-semibold text-sm transition flex items-center gap-1.5"
          >
            <span>Audit Count Discrepancies</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Rippling Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-[#E8E5DE]">
          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Unique Corporate Entities</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">2,117</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">ROC & NASSCOM FY26</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Grade-A Real Estate Units</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">3,728</span>
            <span className="text-[11px] text-[#5E646A] mt-1 block">Across 6 Major Metros</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Grade-A Rent Spread</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#14171A] font-editorial block mt-1">₹67 – ₹140</span>
            <span className="text-[11px] text-[#5E646A] mt-1 block">₹/sq ft/mo (CBRE/JLL)</span>
          </div>

          <div className="p-4 bg-white border border-[#E8E5DE] rounded-xl shadow-xs">
            <span className="text-xs text-[#5E646A] font-medium block">Direct Cash Subsidies</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#16423C] font-editorial block mt-1">Up to 30%</span>
            <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">Tamil Nadu & Karnataka</span>
          </div>
        </div>
      </section>

      {/* Structured Rippling Module Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E8E5DE] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#14171A] font-editorial tracking-tight">
              A single platform for the entire India setup journey
            </h2>
            <p className="text-xs text-[#5E646A] mt-1">
              Replace 5 different advisor engagements with clear, source-attributed data tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
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
              Why does one report say 1,700 and another say 2,000+? We audit definitions side-by-side: unique corporate entities vs. multi-campus physical sites.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>View discrepancy audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            href="/pipeline"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block relative"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
                Incoming GCC Pipeline
              </h3>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E76F51]/15 text-[#E76F51]">
                NEW
              </span>
            </div>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Forward-looking detection of upcoming multinational arrivals (Amgen, Coca-Cola GBS, Qualcomm) tracked via state MoUs and ROC filings.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Track setup pipeline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href="/providers"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
                Verified Provider Audits
              </h3>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F0EDE6] text-[#5E646A]">
                AUDITED
              </span>
            </div>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Track record scorecards for setup advisors (ANSR, Zinnov), commercial brokers (JLL), and law firms (CAM) evaluated on public deliveries.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Inspect provider records</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4 */}
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
              Compare Bengaluru (₹93) vs Hyderabad (₹67) on Grade-A office rents, talent cost indices, and engineering cluster density.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Compare tech hubs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5 */}
          <Link
            href="/policies"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              State Policy Calculators
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Real quantified incentives from legal gazettes: Tamil Nadu 30% payroll subsidy, Karnataka intern stipends, and Gujarat GIFT City 10-year tax holiday.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#16423C] flex items-center gap-1">
              <span>Calculate state subsidies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 6 */}
          <Link
            href="/ask"
            className="p-6 bg-white border border-[#E8E5DE] rounded-xl hover:border-[#C4BFB5] hover:shadow-md transition space-y-3 group block"
          >
            <div className="w-10 h-10 rounded-lg bg-[#F0EDE6] text-[#16423C] flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14171A] group-hover:text-[#16423C] transition">
              Terminal Grounded Q&A
            </h3>
            <p className="text-xs text-[#5E646A] leading-relaxed">
              Ask deep questions about GCCs, costs, and policies. The engine only answers from verified database rows and refuses speculation.
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
              Verified Multinational Centers (Sample Records)
            </h2>
            <p className="text-xs text-[#5E646A]">
              Inspecting 30 confirmed corporate entities across major tech hubs.
            </p>
          </div>
          <Link
            href="/explorer"
            className="text-xs font-semibold text-[#16423C] hover:text-[#2D6A4F] flex items-center gap-1"
          >
            <span>View complete registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-[#E8E5DE] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F5F0] border-b border-[#E8E5DE] text-[#5E646A] font-medium">
                <tr>
                  <th className="p-3.5">Center Name</th>
                  <th className="p-3.5">Parent Entity</th>
                  <th className="p-3.5">Hub</th>
                  <th className="p-3.5">Sector</th>
                  <th className="p-3.5">Headcount</th>
                  <th className="p-3.5">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E5DE] text-[#14171A]">
                {gccs.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-[#FDFBF7] transition">
                    <td className="p-3.5 font-semibold text-[#14171A]">{item.name}</td>
                    <td className="p-3.5 text-[#5E646A]">{item.parentCompany} ({item.parentCountry})</td>
                    <td className="p-3.5 text-[#5E646A]">{item.city}</td>
                    <td className="p-3.5 text-[#5E646A]">{item.parentSector}</td>
                    <td className="p-3.5 font-mono text-[#5E646A]">{item.headcountBand}</td>
                    <td className="p-3.5 text-[#2E7D32] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.sources.length} Primary Sources</span>
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
