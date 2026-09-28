import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  Search, 
  FileCheck2, 
  History, 
  AlertOctagon, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert,
  Terminal,
  Activity,
  ChevronRight,
  Globe2,
  FileText
} from "lucide-react";
import { initialWatchlist } from "../data/syntheticData";
import { calculateSimilarity, soundex, arePhoneticallySimilar } from "../services/matchingEngine";

export default function LandingPage({ onOpenLogin, onEnterDemo, onOpenRoi, onOpenPitchGuide }) {
  // Interactive Live Sandbox state on landing page
  const [testName, setTestName] = useState("Rajesh Kumar");
  
  // Real-time calculation against watchlist
  let topMatch = { similarity: 0, target: null };
  for (const target of initialWatchlist) {
    const sim = calculateSimilarity(testName, target.name);
    if (sim > topMatch.similarity) {
      topMatch = { similarity: sim, target };
    }
    // Check aliases
    if (target.alias_names) {
      for (const al of target.alias_names) {
        const alSim = calculateSimilarity(testName, al);
        if (alSim > topMatch.similarity) {
          topMatch = { similarity: alSim, target, matchedAlias: al };
        }
      }
    }
  }

  const testSoundex = soundex(testName);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      {/* Ambient Glowing Background Orbs */}
      <div 
        className="hero-glow-orb"
        style={{
          width: 500,
          height: 500,
          top: -100,
          left: "10%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)"
        }}
      />
      <div 
        className="hero-glow-orb"
        style={{
          width: 600,
          height: 600,
          top: 150,
          right: "-5%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)"
        }}
      />

      {/* Top Header / Nav */}
      <header style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 20
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 25px rgba(79, 70, 229, 0.45)"
          }}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
                NICE KYC/AML
              </span>
              <span style={{
                fontSize: "0.68rem",
                textTransform: "uppercase",
                background: "rgba(99, 102, 241, 0.2)",
                color: "#818cf8",
                padding: "2px 8px",
                borderRadius: 6,
                fontWeight: 700,
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}>
                Hackathon Use Case 3
              </span>
            </div>
            <p style={{ fontSize: "0.775rem", color: "var(--text-muted)", margin: 0 }}>
              Nice Software Solutions • Banking Innovation
            </p>
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="#features" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
            5 Core Features
          </a>
          <a href="#simulator" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
            Live Simulator
          </a>
          <a href="#impact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
            Business Value
          </a>

          <button
            onClick={onOpenRoi}
            style={{
              background: "transparent",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ROI Model
          </button>

          <button
            onClick={onOpenPitchGuide}
            style={{
              background: "transparent",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#fbbf24",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Pitch Guide
          </button>

          <button 
            className="btn btn-primary"
            onClick={onOpenLogin}
            style={{ padding: "9px 18px", gap: 8 }}
          >
            <Lock size={15} />
            <span>Compliance Officer Login</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: 1200,
        margin: "40px auto 70px",
        padding: "0 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 10
      }}>
        {/* Hackathon Pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 9999,
          background: "rgba(99, 102, 241, 0.12)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          color: "#a5b4fc",
          fontSize: "0.825rem",
          fontWeight: 600,
          marginBottom: 24
        }}>
          <Sparkles size={15} color="#818cf8" />
          <span>INNOVATION HACKATHON 2026: BANKING USE CASE 3</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#f8fafc",
          marginBottom: 20
        }}>
          Autonomous KYC Onboarding & <br />
          <span style={{
            background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Continuous Sanctions Intelligence
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: 780,
          margin: "0 auto 36px",
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: 1.6
        }}>
          Transforming bank compliance from 48-hour manual bottlenecks into sub-second Straight-Through Processing (STP). Equipped with Levenshtein & Soundex fuzzy sanctions screening, real-time registry consistency verification, and continuous retroactive customer re-screening.
        </p>

        {/* Primary Call to Actions */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 50 }}>
          <button 
            className="btn btn-primary"
            onClick={onOpenLogin}
            style={{
              padding: "14px 32px",
              fontSize: "1rem",
              borderRadius: 10,
              boxShadow: "0 8px 30px rgba(79, 70, 229, 0.5)"
            }}
          >
            <Lock size={18} />
            <span>Launch Compliance Terminal</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onEnterDemo}
            style={{ padding: "14px 28px", fontSize: "1rem", borderRadius: 10 }}
          >
            <Terminal size={18} color="#38bdf8" />
            <span>Enter as Guest Officer</span>
          </button>
        </div>

        {/* 3D Motion Floating Stat Cards */}
        <div className="perspective-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 20
        }}>
          <div className="glass-panel card-3d floating-element" style={{ padding: "24px 20px", textAlign: "left", background: "rgba(15, 23, 42, 0.85)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={20} color="#10b981" />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>
                Straight-Through Processing
              </span>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>&lt; 2 Seconds</div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 8 }}>
              Automated instant approval for clean applicants with 100% ID consistency and zero sanctions hits.
            </p>
          </div>

          <div className="glass-panel card-3d" style={{ padding: "24px 20px", textAlign: "left", background: "rgba(15, 23, 42, 0.85)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(56, 189, 248, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Search size={20} color="#38bdf8" />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>
                Fuzzy Watchlist Screening
              </span>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>95%+ Precision</div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 8 }}>
              Levenshtein & Soundex algorithms detect evasive spelling variations (e.g. <em>Rajesh Kumar</em> vs <em>Rajesh Kumarr</em>).
            </p>
          </div>

          <div className="glass-panel card-3d floating-reverse" style={{ padding: "24px 20px", textAlign: "left", background: "rgba(15, 23, 42, 0.85)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(244, 63, 94, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertOctagon size={20} color="#f43f5e" />
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fb7185", textTransform: "uppercase" }}>
                Feature 5 Killer Innovation
              </span>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>Continuous Rescreening</div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 8 }}>
              Retroactively sweeps all historical approved customers upon new sanction ingestion with 1-click regulatory SAR filing.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive AML Fuzzy Screening Sandbox (Live Simulator) */}
      <section id="simulator" style={{
        maxWidth: 1100,
        margin: "0 auto 80px",
        padding: "0 24px"
      }}>
        <div className="glass-panel" style={{
          padding: "36px 32px",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(20, 30, 55, 0.8) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: 16,
          position: "relative"
        }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#38bdf8",
              background: "rgba(56, 189, 248, 0.1)",
              padding: "4px 12px",
              borderRadius: 20
            }}>
              Interactive Algorithmic Sandbox
            </span>
            <h2 style={{ fontSize: "1.75rem", color: "#fff", marginTop: 8 }}>
              Test the Fuzzy Matching Engine Live
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", maxWidth: 600, margin: "6px auto 0" }}>
              Type any applicant name below to test real-time character distance, phonetic soundex, and similarity against the 30 global sanctions database.
            </p>
          </div>

          <div style={{ maxWidth: 560, margin: "0 auto 20px" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 6 }}>
              Type an applicant name to test against watchlists:
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                className="form-input"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="e.g. Rajesh Kumar, Victor Bout, Nikolai..."
                style={{ fontSize: "1rem", padding: "12px 16px" }}
              />
              <button
                className="btn btn-secondary"
                onClick={() => setTestName("Rajesh Kumarr")}
                style={{ whiteSpace: "nowrap" }}
              >
                Test Typo
              </button>
            </div>
          </div>

          {/* Real-time Calculation Result Box */}
          <div style={{
            background: "rgba(9, 13, 22, 0.7)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            padding: 20,
            maxWidth: 700,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Input Phonetic Soundex Code:</span>
              <span className="mono" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#38bdf8" }}>{testSoundex}</span>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Highest Watchlist Match:</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: topMatch.similarity >= 80 ? "#fb7185" : "#34d399" }}>
                {topMatch.similarity}% Match
              </span>
            </div>

            {topMatch.target && (
              <div style={{ gridColumn: "1 / -1", borderTop: "1px solid var(--border-subtle)", paddingTop: 12, fontSize: "0.825rem" }}>
                <div style={{ color: "#fff", fontWeight: 600 }}>
                  Matched Sanction: {topMatch.target.name} ({topMatch.target.country})
                </div>
                <div style={{ color: "var(--text-muted)", marginTop: 2 }}>
                  Reason: {topMatch.target.reason}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The 5 Core Features Matrix (Team Member Ownership) */}
      <section id="features" style={{
        maxWidth: 1240,
        margin: "0 auto 80px",
        padding: "0 24px"
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "2rem", color: "#fff" }}>
            Engineered for the 5-Member Team Challenge
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 640, margin: "8px auto 0" }}>
            Every feature owned by a dedicated team member, integrated into a unified enterprise compliance architecture.
          </p>
        </div>

        <div className="perspective-container" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 20
        }}>
          {/* Feature 1 */}
          <div className="glass-panel card-3d" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Terminal size={22} color="#818cf8" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", background: "rgba(99, 102, 241, 0.1)", padding: "3px 8px", borderRadius: 4 }}>
                Member 1
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>1. Onboarding Intake & Records</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Dynamic application capture (DOB, occupation, income, address) with live format validation and a searchable 100-applicant registry with CSV exports.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel card-3d" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileCheck2 size={22} color="#fbbf24" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fbbf24", background: "rgba(245, 158, 11, 0.1)", padding: "3px 8px", borderRadius: 4 }}>
                Member 2
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>2. ID Consistency Checks</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Cross-references form details against official government records (id_records). Highlights DOB mismatches, address deltas, and validates regex ID formats.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel card-3d" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(56, 189, 248, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Search size={22} color="#38bdf8" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#38bdf8", background: "rgba(56, 189, 248, 0.1)", padding: "3px 8px", borderRadius: 4 }}>
                Member 3
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>3. Watchlist Screening & Risk Rating</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Dual-tier fuzzy matching (Levenshtein + Soundex) against 30 global sanctions. Assigns explainable Low/Medium/High risk ratings with trigger reasons.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel card-3d" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <History size={22} color="#10b981" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.1)", padding: "3px 8px", borderRadius: 4 }}>
                Member 4
              </span>
            </div>
            <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>4. Compliance Dashboard & Audit Trail</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Adjudication center for Pending, Approved, and Flagged accounts with mandatory reason codes and an immutable chronological audit trail log.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-panel card-3d" style={{ padding: 24, gridColumn: "1 / -1", border: "1px solid rgba(244, 63, 94, 0.35)", background: "rgba(244, 63, 94, 0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(244, 63, 94, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertOctagon size={22} color="#f43f5e" />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fb7185", background: "rgba(244, 63, 94, 0.15)", padding: "3px 8px", borderRadius: 4 }}>
                Member 5 (Killer Innovation)
              </span>
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: 6 }}>
              5. Continuous Sanctions Monitoring & 1-Click SAR Generator
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 900 }}>
              Directly answers the hackathon prompt: <em>"What should happen to existing customers when a new name is added to the watchlist?"</em> When a new entity is designated, the engine automatically runs a retroactive batch scan across historical approved customers, freezes matching accounts, and synthesizes a formal FinCEN-compliant Suspicious Activity Report (SAR-101).
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section id="impact" style={{
        maxWidth: 1100,
        margin: "0 auto 80px",
        padding: "0 24px",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Measured ROI & Business Impact
        </span>
        <h2 style={{ fontSize: "2rem", color: "#fff", marginTop: 8, marginBottom: 30 }}>
          Solving the Bank's Critical Bottlenecks
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20
        }}>
          <div className="glass-panel" style={{ padding: 24, textAlign: "left" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#60a5fa", marginBottom: 8 }}>Saving Time</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Onboarding time slashed from <strong>48 hours to under 30 seconds</strong>, turning a multi-day manual friction point into an instant competitive advantage for genuine customers.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: 24, textAlign: "left" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#34d399", marginBottom: 8 }}>Reducing Losses</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Zero sanctions leakage through fuzzy matching and retroactive monitoring protects financial institutions from multi-million dollar OFAC and RBI compliance penalties.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: 24, textAlign: "left" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#fbbf24", marginBottom: 8 }}>Improving Decisions</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Explainable risk scores provide officers with transparent factors (not a black box) accompanied by immutable timestamped audit logs for regulatory inspections.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "rgba(9, 13, 22, 0.9)",
        padding: "30px 24px",
        textAlign: "center"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <ShieldCheck size={20} color="#818cf8" />
          <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
            Nice Software Solutions — Innovation Hackathon 2026
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", margin: 0 }}>
          Use Case 3: Banking — KYC & AML Onboarding Checker • Built with React 18, Vite, Supabase, and Netlify
        </p>
      </footer>
    </div>
  );
}
