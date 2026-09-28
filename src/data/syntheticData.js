// Synthetic Data for KYC & AML Onboarding Checker
// 100 Applicants, 100 ID Records, 30 Global Watchlist Entries
// Includes engineered near-matches, spelling variations, and edge cases.

export const initialWatchlist = [
  { watchlist_id: "WL-001", name: "Rajesh Kumarr", country: "India", reason: "OFAC Sanctions - High-Risk Financial Fraud", category: "Sanction", alias_names: ["Rajesh Kumar", "R. Kumarr"] },
  { watchlist_id: "WL-002", name: "Viktor Bout", country: "Russia", reason: "Arms Trafficking & Terrorism Financing Blacklist", category: "Sanction", alias_names: ["Victor Bout", "V. A. Bout"] },
  { watchlist_id: "WL-003", name: "Alena Rostova", country: "Belarus", reason: "PEP - Politically Exposed Person / Corruption Probe", category: "PEP", alias_names: ["Elena Rostova", "Alena Rostov"] },
  { watchlist_id: "WL-004", name: "Mohammed Al-Mansoor", country: "UAE", reason: "Interpol Red Notice - Cross-Border Money Laundering", category: "AML Red Notice", alias_names: ["Muhammad Al-Mansoor", "Mohd Mansoor"] },
  { watchlist_id: "WL-005", name: "Tariq Aziz Khan", country: "Pakistan", reason: "FATF High-Risk Entity / Terrorist Financing", category: "Sanction", alias_names: ["Tariq A. Khan", "Tarique Khan"] },
  { watchlist_id: "WL-006", name: "Carlos Mendoza Silva", country: "Colombia", reason: "Cartel Narcotics Trafficking & Shell Company Operator", category: "AML Blacklist", alias_names: ["Carlos M. Silva", "Carlos Mendoza"] },
  { watchlist_id: "WL-007", name: "Dmitri Volkov", country: "Russia", reason: "State-Sponsored Cyber Extortion & Ransomware Proceeds", category: "Cyber Sanction", alias_names: ["Dmitry Volkov", "D. Volkoff"] },
  { watchlist_id: "WL-008", name: "Jean-Paul Delacroix", country: "France", reason: "EU Sanctions - Tax Evasion & Offshore Smuggling", category: "Sanction", alias_names: ["Jean Paul Delacroix", "J. P. Delacroix"] },
  { watchlist_id: "WL-009", name: "Kwame Nkrumah Mensah", country: "Ghana", reason: "PEP - Ministry Procurement Embezzlement", category: "PEP", alias_names: ["Kwame Mensah", "K. N. Mensah"] },
  { watchlist_id: "WL-010", name: "Zhang Wei Chen", country: "China", reason: "Illegal Trade Financing & Export Control Violations", category: "Sanction", alias_names: ["Wei Zhang", "Zhang Weichen"] },
  { watchlist_id: "WL-011", name: "Alejandro Gomez Diaz", country: "Mexico", reason: "Cross-border Currency Smuggling Syndicate", category: "AML Blacklist", alias_names: ["Alejandro Diaz Gomez", "Alex Gomez"] },
  { watchlist_id: "WL-012", name: "Fatima Al-Sayed", country: "Lebanon", reason: "Designated Global Terrorist Organization Facilitator", category: "Terrorism Financing", alias_names: ["Fatema Sayed", "Fatima Sayyed"] },
  { watchlist_id: "WL-013", name: "Igor Smirnov", country: "Transnistria", reason: "Arms Proliferation & Sanctioned Regime Asset Concealment", category: "Sanction", alias_names: ["Igor Smirnoff", "I. Smirnov"] },
  { watchlist_id: "WL-014", name: "Sebastian Vance", country: "United Kingdom", reason: "Boiler Room Securities Fraud & Wire Fraud", category: "Fraud Blacklist", alias_names: ["Seb Vance", "Sebastian S. Vance"] },
  { watchlist_id: "WL-015", name: "Anastasia Romanova", country: "Russia", reason: "PEP - Close Associate of Sanctioned Oligarch", category: "PEP", alias_names: ["Nastya Romanova", "A. Romanova"] },
  { watchlist_id: "WL-016", name: "Hassan Reza Pahlavi", country: "Iran", reason: "Weapons of Mass Destruction Procurement Network", category: "Sanction", alias_names: ["Hasan Pahlavi", "H. R. Pahlavi"] },
  { watchlist_id: "WL-017", name: "Lucas Santos Ferreira", country: "Brazil", reason: "Bribery in Infrastructure Contracts (Operation Car Wash)", category: "PEP / Corruption", alias_names: ["Lucas Ferreira", "Lucas S. Ferreira"] },
  { watchlist_id: "WL-018", name: "Sergei Ivanov", country: "Russia", reason: "Sanctioned Defense Contractor Board Member", category: "Sanction", alias_names: ["Sergey Ivanov", "S. Ivanoff"] },
  { watchlist_id: "WL-019", name: "Amina Yusuf Nur", country: "Somalia", reason: "Piracy Ransom Laundering & Hawala Facilitator", category: "Terrorism Financing", alias_names: ["Amina Nur", "Amina Y. Noor"] },
  { watchlist_id: "WL-020", name: "Klaus Von Richter", country: "Germany", reason: "Panama Papers Unregistered Custodian & Wire Fraud", category: "AML Blacklist", alias_names: ["Klaus Richter", "K. Richter"] },
  { watchlist_id: "WL-021", name: "Mateo Rossi", country: "Italy", reason: "Organized Crime Mafia Syndicate Infiltration", category: "AML Blacklist", alias_names: ["Matteo Rossi", "M. Rossi"] },
  { watchlist_id: "WL-022", name: "Suresh Nair", country: "India", reason: "Bank Loan Default Syndicate & Fugitive Economic Offender", category: "Fugitive Offender", alias_names: ["Suresh C. Nair", "S. Nair"] },
  { watchlist_id: "WL-023", name: "Olga Kuznetsova", country: "Russia", reason: "Crypto Mixer Operator (Laundering Stolen Exchange Funds)", category: "Cyber AML", alias_names: ["Olya Kuznetsova", "Olga K."] },
  { watchlist_id: "WL-024", name: "Farooq Ahmed Bilgrami", country: "Pakistan", reason: "Designated Extremist Logistics & Counterfeit Currency", category: "Sanction", alias_names: ["Farooq Bilgrami", "F. A. Bilgrami"] },
  { watchlist_id: "WL-025", name: "Yuki Tanaka", country: "Japan", reason: "Yakuza Front Organization Trustee", category: "AML Blacklist", alias_names: ["Yukio Tanaka", "Y. Tanaka"] },
  { watchlist_id: "WL-026", name: "Grace Osei Tutu", country: "Ghana", reason: "Gold Smuggling & Trade-Based Money Laundering", category: "AML Blacklist", alias_names: ["Grace Tutu", "G. Osei"] },
  { watchlist_id: "WL-027", name: "Nikolai Sokolov", country: "Russia", reason: "Illicit Dual-Use Technology Procurement", category: "Sanction", alias_names: ["Nikolay Sokolov", "N. Sokoloff"] },
  { watchlist_id: "WL-028", name: "Raul Castaneda", country: "Venezuela", reason: "State Petroleum Embezzlement & PEP Frontman", category: "PEP", alias_names: ["Raul C. Lopez", "R. Castaneda"] },
  { watchlist_id: "WL-029", name: "Bilal El-Masri", country: "Syria", reason: "Illegal Remittance Service & Sanctions Evasion", category: "Sanction", alias_names: ["Bilal Masri", "B. El-Masri"] },
  { watchlist_id: "WL-030", name: "Arthur Pendelton", country: "United States", reason: "Multi-Million Dollar Ponzi Scheme & Securities Violation", category: "Fraud Blacklist", alias_names: ["Artie Pendelton", "A. Pendelton"] },
];

// Helper to generate realistic applicant pool
const occupations = [
  "Software Engineer", "Chartered Accountant", "Doctor", "Retail Manager", 
  "Civil Engineer", "University Student", "Business Owner", "Consultant", 
  "High School Teacher", "Marketing Executive", "Graphic Designer", "Nurse", 
  "Bank Analyst", "Logistics Coordinator", "Freelance Writer", "Architect"
];

const countries = [
  "India", "United States", "United Kingdom", "Germany", "Singapore", 
  "Canada", "Australia", "UAE", "France", "Japan", "Brazil", "South Africa"
];

// Curated seed data with distinct test cases for the demo
export const generateSeedData = () => {
  const applicants = [];
  const idRecords = [];

  // Key Test Case 1: Near Match with Watchlist (Rajesh Kumar vs Rajesh Kumarr)
  applicants.push({
    applicant_id: "APP-1001",
    full_name: "Rajesh Kumar",
    dob: "1988-06-14",
    address: "Flat 402, Lotus Orchid, MG Road, Bengaluru 560001",
    id_number: "P8923411",
    occupation: "Business Owner",
    annual_income: 1450000,
    country: "India",
    status: "Pending",
    risk_level: "High",
    risk_reasons: ["Critical Watchlist Near-Match: 95% similarity to 'Rajesh Kumarr' (OFAC Sanction)", "High-value international transactions profile"],
    risk_score: 92,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1001",
    name_on_id: "Rajesh Kumar",
    dob_on_id: "1988-06-14",
    address_on_id: "Flat 402, Lotus Orchid, MG Road, Bengaluru 560001",
    id_type: "Passport",
    id_format_valid: true
  });

  // Key Test Case 2: Near Match (Victor Bout vs Viktor Bout)
  applicants.push({
    applicant_id: "APP-1002",
    full_name: "Victor Bout",
    dob: "1977-03-22",
    address: "24 Tverskaya Boulevard, Moscow, Russia",
    id_number: "R7748902",
    occupation: "Logistics Coordinator",
    annual_income: 2800000,
    country: "Russia",
    status: "Pending",
    risk_level: "High",
    risk_reasons: ["Critical Watchlist Hit: 93% similarity to 'Viktor Bout' (Arms Trafficking Sanction)", "High-risk sanctioned jurisdiction"],
    risk_score: 96,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1002",
    name_on_id: "Victor Bout",
    dob_on_id: "1977-03-22",
    address_on_id: "24 Tverskaya Boulevard, Moscow, Russia",
    id_type: "Passport",
    id_format_valid: true
  });

  // Key Test Case 3: ID Mismatch & DOB Discrepancy (Feature 2 Highlight)
  applicants.push({
    applicant_id: "APP-1003",
    full_name: "Sanya Mehra",
    dob: "1994-11-05",
    address: "House 12, Sector 15, Gurgaon, Haryana 122001",
    id_number: "N8892110",
    occupation: "Software Engineer",
    annual_income: 1800000,
    country: "India",
    status: "Pending",
    risk_level: "Medium",
    risk_reasons: ["ID Discrepancy: DOB on form (1994-11-05) differs from Government ID (1994-12-05)", "Address delta between form and registry"],
    risk_score: 55,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1003",
    name_on_id: "Sanya Mehra",
    dob_on_id: "1994-12-05", // Swapped month!
    address_on_id: "House 12B, Old DLF Colony, Gurgaon, Haryana 122001",
    id_type: "National ID",
    id_format_valid: true
  });

  // Key Test Case 4: Income Anomaly (Student earning 5,000,000)
  applicants.push({
    applicant_id: "APP-1004",
    full_name: "Karan Johar Sharma",
    dob: "2003-08-19",
    address: "74 Juhu Tara Road, Mumbai 400049",
    id_number: "DL783490",
    occupation: "University Student",
    annual_income: 6500000,
    country: "India",
    status: "Under Review",
    risk_level: "High",
    risk_reasons: ["AML Inconsistency: University Student declared income exceeding INR 6,500,000/yr (Possible Money Mule risk)", "Requires Source of Wealth verification"],
    risk_score: 78,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1004",
    name_on_id: "Karan J. Sharma",
    dob_on_id: "2003-08-19",
    address_on_id: "74 Juhu Tara Road, Mumbai 400049",
    id_type: "Driver License",
    id_format_valid: true
  });

  // Key Test Case 5: 100% Clean Straight-Through Processing (STP) Candidate
  applicants.push({
    applicant_id: "APP-1005",
    full_name: "Priya Sundaram",
    dob: "1991-04-12",
    address: "A-201, Green Glen Layout, Bellandur, Bengaluru 560103",
    id_number: "P6723491",
    occupation: "Chartered Accountant",
    annual_income: 2200000,
    country: "India",
    status: "Approved",
    risk_level: "Low",
    risk_reasons: ["Zero Watchlist Matches (Score < 10%)", "100% ID consistency verified against registry", "Eligible for Instant Straight-Through Approval (STP)"],
    risk_score: 8,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1005",
    name_on_id: "Priya Sundaram",
    dob_on_id: "1991-04-12",
    address_on_id: "A-201, Green Glen Layout, Bellandur, Bengaluru 560103",
    id_type: "Passport",
    id_format_valid: true
  });

  // Key Test Case 6: Existing Approved Customer for Retroactive Watchlist Demo (Feature 5)
  applicants.push({
    applicant_id: "APP-1006",
    full_name: "Nikolai Sokolov",
    dob: "1982-10-14",
    address: "18 Nevsky Prospekt, St Petersburg, Russia",
    id_number: "P5542190",
    occupation: "Consultant",
    annual_income: 3100000,
    country: "Russia",
    status: "Approved", // Historically approved!
    risk_level: "Medium",
    risk_reasons: ["Initial onboarding clean in 2025"],
    risk_score: 30,
    created_at: new Date(Date.now() - 3600000 * 24 * 30).toISOString()
  });
  idRecords.push({
    applicant_id: "APP-1006",
    name_on_id: "Nikolai Sokolov",
    dob_on_id: "1982-10-14",
    address_on_id: "18 Nevsky Prospekt, St Petersburg, Russia",
    id_type: "Passport",
    id_format_valid: true
  });

  // Populate remaining to reach 100 realistic applicants
  const firstNames = [
    "Aarav", "Aditi", "Rohan", "Ananya", "Vikram", "Neha", "Kabir", "Pooja", "Arjun", "Tanvi",
    "Michael", "Sarah", "David", "Emily", "James", "Sophia", "Daniel", "Olivia", "Matthew", "Emma",
    "Liam", "Mia", "Alexander", "Isabella", "Benjamin", "Charlotte", "Elijah", "Amelia", "Lucas", "Harper",
    "Siddharth", "Meera", "Varun", "Deepika", "Kunal", "Simran", "Rahul", "Ishaan", "Tara", "Nikhil",
    "Carlos", "Sofia", "Mateo", "Camila", "Hiroshi", "Aoi", "Kenji", "Hana", "Sunil", "Divya"
  ];
  const lastNames = [
    "Patel", "Sharma", "Iyer", "Reddy", "Verma", "Gupta", "Deshmukh", "Chopra", "Malhotra", "Kapoor",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
    "Nair", "Rao", "Bose", "Menon", "Mukherjee", "Chatterjee", "Kulkarni", "Joshi", "Bhat", "Saxena"
  ];

  for (let i = 7; i <= 100; i++) {
    const fn = firstNames[(i * 3 + 7) % firstNames.length];
    const ln = lastNames[(i * 5 + 11) % lastNames.length];
    const fullName = `${fn} ${ln}`;
    const year = 1970 + (i % 32);
    const month = String(1 + (i % 12)).padStart(2, "0");
    const day = String(1 + (i % 28)).padStart(2, "0");
    const dob = `${year}-${month}-${day}`;
    const country = countries[i % countries.length];
    const occupation = occupations[i % occupations.length];
    const income = 400000 + ((i * 137000) % 3500000);
    const idPrefix = ["P", "N", "DL"][i % 3];
    const idNum = `${idPrefix}${String(1000000 + i * 2741).substring(0, 7)}`;
    const address = `${10 + (i % 80)}, Sector ${1 + (i % 40)}, City Center, ${country}`;

    // Intentionally introduce minor discrepancies in ~15% of records
    const hasDiscrepancy = i % 7 === 0;
    const hasTypo = i % 13 === 0;
    const isHighRisk = i % 19 === 0;

    let riskLevel = "Low";
    let riskScore = 12 + (i % 25);
    const reasons = ["Identity records verified", "No high-risk sanctions detected"];

    if (hasDiscrepancy) {
      riskLevel = "Medium";
      riskScore = 52 + (i % 20);
      reasons.unshift("Minor address spelling delta between form and registry");
    }

    if (isHighRisk) {
      riskLevel = "High";
      riskScore = 80 + (i % 18);
      reasons.unshift("Potential match found on regional PEP monitor; jurisdiction escalation");
    }

    const statuses = ["Pending", "Approved", "Under Review", "Approved", "Approved"];
    const status = statuses[i % statuses.length];

    applicants.push({
      applicant_id: `APP-${1000 + i}`,
      full_name: fullName,
      dob,
      address,
      id_number: idNum,
      occupation,
      annual_income: income,
      country,
      status,
      risk_level: riskLevel,
      risk_reasons: reasons,
      risk_score: riskScore,
      created_at: new Date(Date.now() - 3600000 * (i * 2)).toISOString()
    });

    idRecords.push({
      applicant_id: `APP-${1000 + i}`,
      name_on_id: hasTypo ? `${fn} ${ln}n` : fullName,
      dob_on_id: hasDiscrepancy ? `${year}-${String(1 + ((i + 1) % 12)).padStart(2, "0")}-${day}` : dob,
      address_on_id: hasDiscrepancy ? `${10 + (i % 80)}B, Sector ${1 + (i % 40)}, Old Block, ${country}` : address,
      id_type: idPrefix === "P" ? "Passport" : idPrefix === "N" ? "National ID" : "Driver License",
      id_format_valid: true
    });
  }

  return { applicants, idRecords };
};

export const initialAuditLogs = [
  {
    log_id: "LOG-5001",
    applicant_id: "APP-1005",
    applicant_name: "Priya Sundaram",
    action: "STP_AUTO_APPROVED",
    officer_name: "System STP Engine",
    reason_code: "CLEAN_RECORD_FAST_TRACK",
    notes: "Instant automated approval. 0% Watchlist match score, 100% ID consistency, valid Passport format.",
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    log_id: "LOG-5002",
    applicant_id: "APP-1001",
    applicant_name: "Rajesh Kumar",
    action: "FLAGGED_AML",
    officer_name: "Officer Vikram Mehta",
    reason_code: "WATCHLIST_NEAR_MATCH",
    notes: "Escalated for senior compliance review due to 95% phonetic similarity with OFAC Sanctioned entity Rajesh Kumarr.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    log_id: "LOG-5003",
    applicant_id: "APP-1004",
    applicant_name: "Karan Johar Sharma",
    action: "ESCALATED_EDD",
    officer_name: "Officer Sarah Jenkins",
    reason_code: "INCOME_OCCUPATION_MISMATCH",
    notes: "Undergraduate student declared 6.5M annual income without documented business inheritance. Requested bank statements.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];
