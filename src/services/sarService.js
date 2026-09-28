// Regulatory Suspicious Activity Report (SAR) Generator
// Formats an official compliance filing document for regulatory authorities (FinCEN / FIU / RBI / FCA)

export const generateSarReport = (applicant, idRecord, watchlistMatch, auditLogs = []) => {
  const filingId = `SAR-${new Date().getFullYear()}-${applicant.applicant_id.replace("APP-", "")}`;
  const filingDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  
  // Synthesize narrative based on the applicant's risk factors
  let narrative = `On ${filingDate}, during automated Know Your Customer (KYC) onboarding and continuous Anti-Money Laundering (AML) monitoring, applicant ${applicant.full_name} (ID Ref: ${applicant.applicant_id}) was flagged by the compliance surveillance system. \n\n`;

  if (watchlistMatch && watchlistMatch.similarity > 50) {
    narrative += `1. WATCHLIST SCREENING HIT:\nThe applicant's legal name matched sanctioned entity '${watchlistMatch.target_name || watchlistMatch.name}' with a ${watchlistMatch.similarity}% fuzzy similarity index. The matched entity is listed under: '${watchlistMatch.reason || "International Sanctions List"}'. The bank's policy strictly prohibits maintaining accounts for individuals associated with designated terrorist financing, cyber warfare, or transnational organized crime networks.\n\n`;
  }

  if (idRecord && (applicant.dob !== idRecord.dob_on_id || applicant.full_name !== idRecord.name_on_id)) {
    narrative += `2. IDENTITY TAMPERING / DISCREPANCY:\nCross-examination against official registry records revealed material inconsistencies. Specifically, the applicant declared DOB '${applicant.dob}', whereas government records reflect '${idRecord.dob_on_id}'. Name variations were also documented ('${applicant.full_name}' vs '${idRecord.name_on_id}').\n\n`;
  }

  if (applicant.risk_reasons && applicant.risk_reasons.length > 0) {
    narrative += `3. DOCUMENTED SYSTEM FLAGS:\n` + applicant.risk_reasons.map(r => ` • ${r}`).join("\n") + "\n\n";
  }

  narrative += `4. REGULATORY ACTION TAKEN:\nPursuant to Bank Secrecy Act (BSA) regulations and AML guidelines, all transaction privileges for this entity are FROZEN immediately. This Suspicious Activity Report (SAR) is submitted for supervisory review and law enforcement referral.`;

  return {
    filingId,
    filingDate,
    institution: {
      name: "Nice International Banking Corporation",
      branch: "Global AML & Sanctions Oversight Hub",
      fiuReference: "FIU-AML-9924-A"
    },
    subject: {
      applicant_id: applicant.applicant_id,
      full_name: applicant.full_name,
      dob: applicant.dob,
      country: applicant.country,
      id_number: applicant.id_number,
      occupation: applicant.occupation,
      annual_income: applicant.annual_income,
      address: applicant.address
    },
    registryRecord: idRecord || null,
    riskLevel: applicant.risk_level,
    riskScore: applicant.risk_score,
    narrative,
    relevantAuditLogs: auditLogs.filter(l => l.applicant_id === applicant.applicant_id)
  };
};
