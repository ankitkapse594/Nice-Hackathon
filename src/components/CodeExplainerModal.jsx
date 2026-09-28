import React, { useState } from "react";
import { X, Code2, UserCheck, Terminal, Cpu, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";

export const TEAM_CODE_MODULES = [
  {
    featureNumber: 1,
    title: "Customer Onboarding Intake & Registry",
    owner: "Team Member 1",
    file: "src/components/ApplicantModal.jsx & storageService.js",
    functionName: "addApplicant(formData, idData)",
    timeComplexity: "O(1) insertion, O(M) regex validation",
    concept: "State validation, sanitization & data normalization",
    pitchExplanation: "I built the customer intake engine. It captures customer demographics and financial profile, validates required fields, and sanitizes strings. It runs real-time regex ID format checks and normalizes data before committing to the reactive storage store.",
    codeSnippet: `// Feature 1: Applicant Intake & Registry Ingestion
export const addApplicant = (formData, idData = null) => {
  const applicantId = \`APP-\${1000 + applicants.length + 1}\`;
  const applicantRecord = {
    applicant_id: applicantId,
    full_name: formData.full_name.trim(),
    dob: formData.dob,
    address: formData.address.trim(),
    id_number: formData.id_number.trim().toUpperCase(),
    occupation: formData.occupation,
    annual_income: Number(formData.annual_income) || 0,
    country: formData.country,
    status: "Pending",
    created_at: new Date().toISOString()
  };
  // Automatically initiates Feature 2 and Feature 3 pipelines...
};`
  },
  {
    featureNumber: 2,
    title: "Automated ID & Form Consistency Matrix",
    owner: "Team Member 2",
    file: "src/services/matchingEngine.js",
    functionName: "runConsistencyCheck(applicant, idRecord)",
    timeComplexity: "O(L) string distance & regex pattern matching",
    concept: "Cross-referencing declared form data against trusted official registries",
    pitchExplanation: "I built the consistency engine. It compares what the applicant submitted on the form against the government ID registry. It checks for exact DOB matches, calculates address similarity, validates document formats using regex, and outputs an objective Consistency Score (0-100%).",
    codeSnippet: `// Feature 2: Consistency Check Engine
export function runConsistencyCheck(applicant, idRecord) {
  const discrepancies = [];
  const nameSim = calculateSimilarity(applicant.full_name, idRecord.name_on_id);
  const dobMatch = applicant.dob === idRecord.dob_on_id;
  const addressSim = calculateSimilarity(applicant.address, idRecord.address_on_id);
  const formatCheck = validateIdFormat(applicant.id_number, idRecord.id_type);

  let score = 100;
  if (nameSim < 90) score -= 30;
  if (!dobMatch) score -= 35;
  if (addressSim < 75) score -= 15;
  if (!formatCheck.isValid) score -= 20;

  return { consistencyScore: Math.max(0, score), hasDiscrepancy: discrepancies.length > 0, discrepancies };
}`
  },
  {
    featureNumber: 3,
    title: "Fuzzy Watchlist Screening & Multi-Factor Risk",
    owner: "Team Member 3",
    file: "src/services/matchingEngine.js",
    functionName: "screenAgainstWatchlist() & levenshteinDistance()",
    timeComplexity: "O(N * M) dynamic programming matrix + O(K) Soundex encoding",
    concept: "Fuzzy string matching & phonetic hashing to detect evasive aliases",
    pitchExplanation: "I implemented our fuzzy screening algorithm. Criminals often disguise their names with deliberate typos (like 'Rajesh Kumar' vs 'Rajesh Kumarr'). We compute the Levenshtein distance matrix and normalized similarity score, plus American Soundex phonetic encoding, categorizing customers into Low, Medium, or High risk with transparent reasons.",
    codeSnippet: `// Feature 3: Levenshtein Distance & Fuzzy Matrix
export function levenshteinDistance(s1 = "", s2 = "") {
  const a = s1.toLowerCase().trim();
  const b = s2.toLowerCase().trim();
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}`
  },
  {
    featureNumber: 4,
    title: "Compliance Adjudication Center & Audit Trail",
    owner: "Team Member 4",
    file: "src/components/ComplianceDashboard.jsx & storageService.js",
    functionName: "updateApplicantDecision() & addAuditLog()",
    timeComplexity: "O(1) state transition & sequential append logging",
    concept: "State machine transitions, regulatory reason code mandates & immutable logging",
    pitchExplanation: "I developed the compliance adjudication workflow and immutable audit log. Bank officers can triage pending applications by risk tier, select regulatory reason codes (e.g. SANCTION_WATCHLIST_MATCH), and log every decision with immutable timestamps so that external regulators can verify the audit trail.",
    codeSnippet: `// Feature 4: Adjudication & Immutable Audit Log
export const updateApplicantDecision = (applicantId, status, officerName, reasonCode, notes) => {
  const applicant = applicants.find(a => a.applicant_id === applicantId);
  const previousStatus = applicant.status;
  applicant.status = status;

  addAuditLog({
    applicant_id: applicantId,
    applicant_name: applicant.full_name,
    action: status === "Approved" ? "APPROVED" : "REJECTED",
    officer_name: officerName,
    reason_code: reasonCode,
    notes: notes || \`Status transitioned from \${previousStatus} to \${status}.\`
  });
};`
  },
  {
    featureNumber: 5,
    title: "Continuous Sanctions Monitoring & 1-Click SAR",
    owner: "Team Member 5",
    file: "src/services/storageService.js & sarService.js",
    functionName: "addWatchlistEntityAndRescreen() & generateSarReport()",
    timeComplexity: "O(C * W) batch sweeping where C = customers, W = sanctions",
    concept: "Continuous surveillance, retroactive scanning & automated regulatory narrative synthesis",
    pitchExplanation: "I designed our killer feature answering the hackathon question: 'What happens to existing customers when a new sanction is published?' When an officer ingests a new sanction, my engine sweeps our historical approved customer base, automatically freezes matching accounts, and synthesizes a formal FinCEN-compliant Suspicious Activity Report (SAR-101) with legal narratives.",
    codeSnippet: `// Feature 5: Retroactive Rescreening & Account Freezing
export const addWatchlistEntityAndRescreen = (newEntity) => {
  watchlist.unshift(newEntity);
  const flagged = [];
  applicants.forEach(applicant => {
    const screening = screenAgainstWatchlist(applicant, [newEntity]);
    if (screening.hasHit || screening.topSimilarity >= 75) {
      flagged.push(applicant);
      applicant.status = "Flagged"; // Automatic account freeze!
      addAuditLog({
        applicant_id: applicant.applicant_id,
        action: "RESCREEN_MATCH",
        reason_code: "RETROACTIVE_SANCTION_MATCH"
      });
    }
  });
  return { flaggedCount: flagged.length, flagged };
};`
  }
];

export default function CodeExplainerModal({ isOpen, onClose }) {
  const [selectedFeature, setSelectedFeature] = useState(1);

  if (!isOpen) return null;

  const current = TEAM_CODE_MODULES.find(m => m.featureNumber === selectedFeature) || TEAM_CODE_MODULES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{
          padding: "20px 28px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.35)"
            }}>
              <Code2 size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: "1.25rem", color: "#f8fafc" }}>
                  Judges' Code & Architecture Inspector
                </h2>
                <span className="badge badge-low">Individual Scoring Preparation</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Code explanations, time complexity, and speaking scripts for all 5 team members
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Feature Selector Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(15, 23, 42, 0.6)",
          overflowX: "auto"
        }}>
          {TEAM_CODE_MODULES.map((mod) => (
            <button
              key={mod.featureNumber}
              onClick={() => setSelectedFeature(mod.featureNumber)}
              style={{
                padding: "12px 18px",
                background: selectedFeature === mod.featureNumber ? "rgba(99, 102, 241, 0.2)" : "transparent",
                border: "none",
                borderBottom: selectedFeature === mod.featureNumber ? "2px solid #818cf8" : "2px solid transparent",
                color: selectedFeature === mod.featureNumber ? "#fff" : "var(--text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>Feature {mod.featureNumber}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>({mod.owner})</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Metadata Card */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            background: "rgba(15, 23, 42, 0.7)",
            padding: 16,
            borderRadius: 10,
            border: "1px solid var(--border-subtle)"
          }}>
            <div>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Assigned Owner:</span>
              <span style={{ fontWeight: 700, color: "#fff" }}>{current.owner}</span>
            </div>
            <div>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Source Code File:</span>
              <span className="mono" style={{ fontSize: "0.8rem", color: "#38bdf8" }}>{current.file}</span>
            </div>
            <div>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Computational Complexity:</span>
              <span className="mono" style={{ fontSize: "0.8rem", color: "#34d399" }}>{current.timeComplexity}</span>
            </div>
          </div>

          {/* 30-Second Speaking Pitch for Judges */}
          <div style={{
            padding: 16,
            borderRadius: 10,
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <BookOpen size={16} color="#818cf8" />
              <strong style={{ fontSize: "0.85rem", color: "#a5b4fc", textTransform: "uppercase" }}>
                30-Second Pitch & Defense Script for {current.owner}:
              </strong>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#f8fafc", lineHeight: 1.5, margin: 0 }}>
              "{current.pitchExplanation}"
            </p>
          </div>

          {/* Actual Code Snippet */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                Core Implementation Snippet: <span className="mono" style={{ color: "#fff" }}>{current.functionName}</span>
              </span>
              <span className="mono" style={{ fontSize: "0.75rem", color: "#818cf8" }}>JavaScript (ES6+)</span>
            </div>
            <pre style={{
              background: "#080c14",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 8,
              padding: 16,
              color: "#e2e8f0",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              lineHeight: 1.45,
              overflowX: "auto"
            }}>
              {current.codeSnippet}
            </pre>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close Code Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
