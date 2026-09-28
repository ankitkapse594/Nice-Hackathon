import React, { useState } from "react";
import { X, Mic, Clock, HelpCircle, CheckCircle, Award, Sparkles, User } from "lucide-react";

export default function PitchGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("pitch"); // 'pitch' or 'qa'

  if (!isOpen) return null;

  const pitchMinutes = [
    {
      minute: "0:00 - 1:00",
      speaker: "Ankit Kapse (Team Lead)",
      topic: "The Hook & The $2.5B Business Problem",
      screenAction: "Show Landing Page Hero & ROI Calculator",
      script: "Good morning judges! I am Ankit Kapse, representing our team alongside Shruti, Yash, Divyani, and Anurag. Banks spend over $2.5 Billion annually on manual KYC compliance, with customers waiting 48 hours to open an account. Today, we present an Autonomous KYC & AML Sanctions Portal that reduces onboarding to under 30 seconds with zero sanctions leakage. We divided our system across 5 core features, each owned by one of us."
    },
    {
      minute: "1:00 - 2:00",
      speaker: "Ankit Kapse",
      topic: "Feature 1: Customer Intake & Synthetic Registry",
      screenAction: "Open Intake Modal, show 100-applicant directory table, search & filter",
      script: "I own Feature 1: The intake engine. It captures customer demographics, income, and national ID with real-time format validation. We engineered a synthetic dataset of 100 realistic applicants across 12 countries. The directory provides compliance officers with high-density search, status filters, and instant CSV export."
    },
    {
      minute: "2:00 - 3:00",
      speaker: "Shruti Khadatkar",
      topic: "Feature 2: Automated ID Consistency Matrix",
      screenAction: "Click 'Check ID' on Sanya Mehra (APP-1003) to show side-by-side mismatch",
      script: "I am Shruti Khadatkar, and I own Feature 2: Automated Consistency Checks. In the real world, bad actors tamper with dates or use fake IDs. My engine cross-references the form data against the government registry (id_records). Notice how it instantly highlights Sanya's DOB mismatch in red and validates regex format for Passports and National IDs, computing an objective Consistency Score."
    },
    {
      minute: "3:00 - 4:00",
      speaker: "Yash Bharambe",
      topic: "Feature 3: Fuzzy Watchlist Matching & Risk Rating",
      screenAction: "Click 'Watchlist' on Rajesh Kumar (APP-1001) to show 95% near-match with Rajesh Kumarr",
      script: "I am Yash Bharambe, and I own Feature 3: Watchlist Screening. Bad actors disguise themselves with minor spelling variations. We implemented a custom Levenshtein distance matrix and American Soundex algorithm. When screening 'Rajesh Kumar', it catches a 95% similarity match to OFAC-sanctioned 'Rajesh Kumarr', and automatically rates him High Risk with clear, explainable reasons."
    },
    {
      minute: "4:00 - 5:00",
      speaker: "Divyani Katre",
      topic: "Feature 4: Compliance Adjudication & Audit Trail",
      screenAction: "Open Compliance Adjudication tab, approve an applicant, view Audit Trail tab",
      script: "I am Divyani Katre, and I own Feature 4: Adjudication and the Immutable Audit Trail. Compliance officers can review pending cases by risk tier. When an officer approves or rejects, our system mandates a regulatory reason code and timestamp. In the Audit Trail tab, every single decision is immutably logged for supervisory inspections."
    },
    {
      minute: "5:00 - 6:00",
      speaker: "Anurag Pathak",
      topic: "Feature 5: Killer Feature (Continuous Rescreening & SAR)",
      screenAction: "Click 'Add Sanction & Rescreen', preset Nikolai Sokolov, run batch scan, click 1-Click SAR",
      script: "I am Anurag Pathak, and I own Feature 5, answering the hackathon question: 'What happens to existing customers when a new sanction is issued?' Watch this: I ingest a new sanction 'Nikolai Sokolov'. Our engine sweeps all historical approved customers in milliseconds, flags matching account APP-1006, immediately freezes the account, and with 1 click generates an official FinCEN-compliant Suspicious Activity Report (SAR-101) with legal narrative and digital sign-off!"
    }
  ];

  const qaItems = [
    {
      q: "Q1: Why did you choose fuzzy matching instead of exact string search?",
      a: "A: Financial criminals deliberately alter letters, omit consonants, or use transliterations (e.g. 'Viktor' vs 'Victor', or 'Kumar' vs 'Kumarr'). Exact matching fails 100% of these evasion attempts. Our Levenshtein dynamic matrix and Soundex phonetic representation catch them immediately."
    },
    {
      q: "Q2: How does the system ensure live reliability if internet connectivity fails?",
      a: "A: We engineered a Dual-Persistence Architecture. The system connects to Supabase Cloud, but also includes a zero-latency in-browser local storage engine pre-seeded with 100 applicants and 30 sanctions. If Wi-Fi drops, the bank's onboarding never goes down."
    },
    {
      q: "Q3: What was the rationale for your 5th feature (Continuous Rescreening)?",
      a: "A: The hackathon guide asked: 'What happens when a new name is added to the watchlist?' Most banks only screen during initial onboarding. When international sanctions change tomorrow, bad actors already inside the bank go undetected. Continuous retroactive batch screening closes this critical regulatory loophole."
    },
    {
      q: "Q4: How does Straight-Through Processing (STP) ensure safety?",
      a: "A: STP is strictly gated. An applicant is only eligible if their risk score is below 15%, identity consistency is 100% matched against the government registry, ID regex is valid, and sanctions similarity is 0%. Any variance immediately routes to human compliance review."
    },
    {
      q: "Q5: How did you divide the work across the 5 team members?",
      a: "A: We agreed on the shared data schema (applicants, id_records, watchlist, audit_logs) in the first 30 minutes. Each member owned one end-to-end module (Intake, Consistency, Screening, Adjudication, and Retroactive Surveillance). We integrated continuously via Git."
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{
          padding: "20px 28px",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)",
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
              background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.35)"
            }}>
              <Award size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: "1.25rem", color: "#f8fafc" }}>
                  Judges' 10-Minute Presentation Master Guide
                </h2>
                <span className="badge badge-med">6-Min Pitch + 4-Min Q&A</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Strict timing guide: Second-by-second team cue cards & bulletproof answers
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)", background: "rgba(15, 23, 42, 0.6)" }}>
          <button
            onClick={() => setActiveTab("pitch")}
            style={{
              flex: 1,
              padding: "12px",
              background: activeTab === "pitch" ? "rgba(99, 102, 241, 0.2)" : "transparent",
              border: "none",
              borderBottom: activeTab === "pitch" ? "2px solid #818cf8" : "2px solid transparent",
              color: activeTab === "pitch" ? "#fff" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <Clock size={16} color={activeTab === "pitch" ? "#818cf8" : "var(--text-dim)"} />
            <span>6-Minute Pitch Breakdown (Minute by Minute)</span>
          </button>

          <button
            onClick={() => setActiveTab("qa")}
            style={{
              flex: 1,
              padding: "12px",
              background: activeTab === "qa" ? "rgba(99, 102, 241, 0.2)" : "transparent",
              border: "none",
              borderBottom: activeTab === "qa" ? "2px solid #818cf8" : "2px solid transparent",
              color: activeTab === "qa" ? "#fff" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <HelpCircle size={16} color={activeTab === "qa" ? "#818cf8" : "var(--text-dim)"} />
            <span>4-Minute Q&A Cheat Sheet (Top 5 Questions)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {activeTab === "pitch" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {pitchMinutes.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: 16,
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="mono" style={{ background: "rgba(99, 102, 241, 0.2)", color: "#818cf8", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: "0.75rem" }}>
                        {item.minute}
                      </span>
                      <strong style={{ color: "#fff", fontSize: "0.9rem" }}>{item.topic}</strong>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 600 }}>
                      Speaker: {item.speaker}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "#38bdf8", background: "rgba(56, 189, 248, 0.08)", padding: "4px 8px", borderRadius: 4 }}>
                    <strong>Action on Screen:</strong> {item.screenAction}
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                    "{item.script}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {qaItems.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: 16,
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6
                  }}
                >
                  <strong style={{ color: "#f8fafc", fontSize: "0.9rem" }}>
                    {item.q}
                  </strong>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
