# 🛡️ NICE AML & KYC Onboarding Checker

> **Nice Software Solutions — Innovation Hackathon 2026 (Banking Use Case 3)**  
> **Live Website:** [https://nice-aml-kyc-checker.netlify.app](https://nice-aml-kyc-checker.netlify.app)

---

## 💡 What is this project? (In simple words)

When you open a bank account, the bank has to make sure:
1. You are who you say you are (**KYC — Know Your Customer**).
2. You are not a criminal, fraudster, or on an international blacklist (**AML — Anti-Money Laundering**).

Normally, banks take **24 to 48 hours** with humans manually checking IDs, documents, and government lists.

**Our application does this entire process in under 1 second.**  
It automatically verifies customer details against government ID records, uses smart algorithms to catch disguised names and typos, and gives bank compliance officers a clean, simple dashboard to approve clean people and flag suspicious ones.

---

## ⚡ How to Run It on Your Computer (Quick & Easy)

You only need **Node.js** installed. Run these two commands in your terminal:

```bash
# 1. Download packages
npm install

# 2. Start the project
npm run dev
```

Now open your web browser and go to:  
👉 **`http://localhost:5173`**

*(Everything is already set up with 100 sample applicants and 30 sample sanctions list entries. You do not need any database or password to test it!)*

---

## 👥 Meet the Team & What Everyone Built

Our team has 5 members. Each person took complete ownership of one core part of the system:

### 1. **Ankit Kapse** — Customer Onboarding & Profiles
- **What Ankit did:** Built the front door of the bank. When new customers apply, his system takes their name, photo ID, job, income, and address.
- **Key feature:** Added live checks to ensure phone numbers, IDs, and incomes are entered properly, and pre-loaded 100 realistic applicant profiles from 12 countries with instant CSV download.

### 2. **Shruti Khadatkar** — Smart ID Consistency Checker
- **What Shruti did:** Compares what the customer wrote on their application form against the government's official ID database.
- **Key feature:** Her algorithm instantly catches sneaky errors, like when a customer flips their birth date (for example, writing `14/06/1988` instead of `06/14/1988`), or when the address doesn't match.

### 3. **Yash Bharambe** — Typo-Proof Watchlist & Sanctions Checker
- **What Yash did:** Criminals often disguise their names by adding or changing a letter (e.g. typing *Rajesh Kumarr* instead of *Rajesh Kumar*). Yash built a fuzzy algorithm (Levenshtein distance + Soundex phonetics).
- **Key feature:** Catches names that sound the same or look almost identical, and scores applicants as Low, Medium, or High Risk with clear, human-readable explanations.

### 4. **Divyani Katre** — Compliance Officer Dashboard & Action Log
- **What Divyani did:** Built the control room for bank compliance officers. Instead of messy spreadsheets, officers see a clean, minimalist queue of applications.
- **Key feature:** Officers can approve or flag someone with 1 click, enter regulatory reason codes, and every single action is permanently recorded in a tamper-proof audit trail for regulators to inspect.

### 5. **Anurag Pathak** — Automatic Rescreening & 1-Click SAR Report *(Our Hackathon Differentiator)*
- **What Anurag did:** Solved the biggest real-world question: *"What happens to existing bank customers when a brand new criminal is added to the sanctions list tomorrow?"*
- **Key feature:** Whenever a new sanction is published, Anurag's engine sweeps through all past approved customers in seconds, automatically freezes any matching accounts, and generates an official, print-ready **FinCEN SAR-101 (Suspicious Activity Report)**.

---

## 🌟 Cool Features You Can Try in the Demo

### 🔍 1. Click Any Applicant to See Their Whole Story (360° Dossier)
- Click on any person in the table.
- A clean window pops up showing everything about them: their personal details, their ID comparison score, watchlist check results, and their history in the bank.

### ⚡ 2. Instant Fast-Track Approval (STP)
- If someone is clearly clean (no criminal match, 100% ID match), click the green **"Fast-Track STP"** button in the top menu.
- The system automatically approves all safe applicants in a fraction of a second.

### 🧪 3. Live Algorithmic Sandbox on the Landing Page
- On the homepage, type any name (like *"Rajesh Kumarr"* or *"Victor Bout"*).
- Watch our algorithm calculate sound codes and match percentages in real-time right before your eyes!

### 🚨 4. Add a Criminal and Watch the System Auto-Freeze Them
- Click **"Add Sanction & Rescreen"** in the top bar.
- Add a new name to the blacklist.
- The system will immediately re-check all approved customers, catch anyone matching, freeze their account, and prepare an official legal report.

---

## 🛠️ Technology Used

- **Frontend:** React 18, Vite (super fast)
- **Styling:** Custom CSS with dark mode, glass effects, and clean layouts
- **Icons:** Lucide React
- **Algorithms:** Levenshtein Distance (spelling difference) and American Soundex (phonetic sound)
- **Hosting:** Netlify
- **Database:** Runs instantly with local sample data, and can optionally connect to Supabase Cloud

---

## 🏆 Hackathon Details
- **Event:** Nice Software Solutions Innovation Hackathon 2026
- **Problem Statement:** Use Case 3 — Banking (KYC & AML Onboarding Checker)
- **Team Members:** Ankit Kapse, Shruti Khadatkar, Yash Bharambe, Divyani Katre, Anurag Pathak
