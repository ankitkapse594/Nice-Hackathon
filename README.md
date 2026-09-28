# 🛡️ NICE KYC & AML Onboarding Checker
> **Nice Software Solutions — Innovation Hackathon (Use Case 3: Banking)**  
> Autonomous Customer Onboarding, Identity Consistency Verification, Multi-Tier Fuzzy Watchlist Screening, and Continuous Sanctions Rescreening.

---

## 🚀 Quick Start (Single Command Run)

To run the application locally on your laptop:

```bash
# 1. Install dependencies
npm install

# 2. Launch application
npm run dev
```

Open your browser at **`http://localhost:5173`**.

> [!NOTE]
> **Zero Configuration Needed:** The portal comes pre-seeded with **100 synthetic applicants**, **100 corresponding government ID records**, and **30 global sanctions targets**. It works **100% offline** without requiring external database setup.

---

## 👥 Team Member Feature Ownership

| # | Feature Name | Team Member | Description & Key Innovations |
| :--- | :--- | :--- | :--- |
| **1** | **Onboarding Intake & Records** | **Team Member 1** | Dynamic customer application modal (DOB, occupation, income, address) with input validation, plus filterable 100-applicant directory table with CSV export. |
| **2** | **Consistency Checks** | **Team Member 2** | Real-time cross-referencing between customer form and government registry (`id_records`). Regex ID format validator (Passport, National ID, DL) + visual side-by-side mismatch highlighter. |
| **3** | **Watchlist Screening & Risk Rating** | **Team Member 3** | Dual-tier **Fuzzy Matching Engine** (Levenshtein Distance + Phonetic Soundex) catching spelling variations (*Rajesh Kumar* vs *Rajesh Kumarr*). Multi-factor Low/Med/High risk rating with explainable risk breakdown. |
| **4** | **Compliance Dashboard & Audit Trail** | **Team Member 4** | Tabbed adjudication queue (`Pending`, `Under Review`, `Approved`, `Flagged/Rejected`) with mandatory reason codes, officer notes, and an **immutable chronological audit log**. |
| **5** | **Continuous Watchlist Monitoring & SAR Generator** *(Team's Own Feature)* | **Team Member 5** | Solves the hackathon question: *"What happens to existing customers when a new name is added to the watchlist?"* Automatically triggers a batch retroactive scan across all existing accounts upon new sanction ingestion, freezes matching accounts, and generates an official 1-click **Suspicious Activity Report (SAR-101)**. |

---

## 🌟 Bonus Features Built
1. **Straight-Through Processing (STP) Fast-Track:** One-click automated instant approval for ultra-clean applicants (< 15 risk score, 100% ID consistency, 0 sanctions score) in under 2 seconds.
2. **Dual-Persistence Architecture:** Integrated with **Supabase PostgreSQL** via cloud client while providing a zero-latency in-memory / LocalStorage fallback so the demo never fails if venue Wi-Fi drops.
3. **One-Click Live Demo Presets:** Pre-engineered test cases in modals so presenters can demonstrate near-matches, ID DOB mismatches, and retroactive freezes without manual typing during the 6-minute live pitch.
4. **Print-Ready Regulatory Filing:** Formats FinCEN/RBI standard regulatory reports with legal narratives and digital sign-off.

---

## 📊 Data Schema & Synthetic Dataset
Synthetic data is pre-bundled in `src/data/syntheticData.js`:
- `applicants`: 100 fictional records with diverse occupations, incomes, and countries.
- `id_records`: 100 official government identity records with engineered edge-case discrepancies (e.g. swapped DOB month, address variance).
- `watchlist`: 30 global sanctions entries (OFAC, PEP, Cyber AML, Interpol Red Notices) with known aliases and phonetic variations.
- `compliance_audit_logs`: Initial immutable logs tracking system decisions.

---

## 🌐 Netlify Deployment
To build for production or deploy to Netlify:
```bash
npm run build
```
Netlify configuration is pre-configured in `netlify.toml`.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite
- **Icons:** Lucide React
- **Algorithms:** Custom Levenshtein Distance, Jaro-Winkler, American Soundex
- **Cloud Backend:** Supabase PostgreSQL Client (optional via `.env`)
- **Hosting:** Netlify / Localhost
