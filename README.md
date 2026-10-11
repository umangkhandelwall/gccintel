# GCC Intel — The Single Source of Truth for India GCC Ecosystem

A structured, source-attributed intelligence platform designed to eliminate information asymmetry in India's 2,100+ Global Capability Centre (GCC) landscape. Built for the **Flexiple Take-Home Assignment**.

---

## 🎯 Executive Problem

Multinational corporations (MNCs) setting up GCCs in India make **$2M–$10M capital decisions** across real estate, legal entities, advisory partners, and talent pipelines using informal referrals and stale consultant PDFs.

- **Contradictory Count Metrics:** Reports quote 1,700, 2,000+, or 2,975 GCCs with zero explanation of definitional variance.
- **Opacities in Cross-State Arbitrage:** State governments publish aggressive incentive policies (e.g., Tamil Nadu's 30-20-10% payroll subsidy, Karnataka's Beyond Bengaluru duty waivers), but information remains buried in legal gazettes.
- **Unverified Provider Marketing:** Intermediaries market claims with zero public delivery track records.

**GCC Intel** creates the first evidence-backed truth layer by pairing verified company records with primary regulatory citations and cross-city data analytics.

---

## 🛠️ Architecture & Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Radix/Lucide icons (Dark-mode first, Linear/Stripe design standard)
- **Data Visualizations:** Recharts (Grade-A rent comparisons, count discrepancies)
- **Search & Retrieval:** Fuse.js fuzzy entity indexing
- **Intelligence API:** Grounded retrieval `/api/ask` route enforcing strict primary citations and explicit refusal on out-of-scope queries
- **Data Integrity:** 100% sourced JSON records with confidence flags (`high`, `medium`, `low`)

---

## 🚀 Key Features

1. **Verified GCC Registry (`/explorer`):** Searchable index of 30+ verified MNC captive centres with primary publisher citations, headcount bands, micro-markets, and functional mandates.
2. **City & Micro-Market Comparator (`/comparator`):** Side-by-side operating cost comparisons between Bengaluru, Hyderabad, Pune, Chennai, Delhi-NCR, and Mumbai, complete with an algorithmic sourcing verdict.
3. **Count Reconciliation Audit (`/reconciliation`):** Resolves the national GCC count debate by mapping **Unique Corporate Entities (1,700–2,117)** against **Physical Operational Units (2,975–3,728)**.
4. **State GCC Policies (`/policies`):** Quantified subsidy calculators covering Karnataka, Tamil Nadu, Telangana, Maharashtra, and Gujarat (GIFT City IFSC).
5. **Grounded AI Intelligence (`/ask`):** Q&A interface that answers strictly from dataset rows, provides clickable source citations, and refuses unverified queries.

---

## 💻 Local Setup & Execution

```bash
# 1. Clone or navigate to the directory
cd gccintel

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

---

## 🧪 Verification & Audit Standards

- Zero synthetic or hallucinated companies.
- Every figure traces back to NASSCOM-Zinnov, CBRE, JLL, Guidance Tamil Nadu, or KDEM primary publications.
- Pure aggregation functions in `lib/data.ts` ensure mathematical auditability.
