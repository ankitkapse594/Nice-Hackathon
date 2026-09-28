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

export default function LandingPage({ onOpenLogin, onEnterDemo, onOpenRoi }) {
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

      {/* The 5 Core Features (Vertical Minimalist Showcase) */}
      <section id="features" style={{
        maxWidth: 1050,
        margin: "0 auto 90px",
        padding: "0 24px"
      }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#818cf8",
            background: "rgba(99, 102, 241, 0.12)",
            padding: "4px 14px",
            borderRadius: 20,
            border: "1px solid rgba(99, 102, 241, 0.25)"
          }}>
            Team Ownership Architecture
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "#fff", marginTop: 10 }}>
            5 Dedicated Features • 5 Engineering Leads
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 650, margin: "8px auto 0" }}>
            Every module is owned end-to-end by an individual team member, perfectly integrated into one unified banking intelligence platform.
          </p>
        </div>

        {/* Vertical Stacked Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Member 1: Ankit Kapse */}
          <div className="glass-panel card-3d" style={{
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 24,
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }}>
            {/* Left: Member Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRight: "1px solid var(--border-subtle)", paddingRight: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5 0%, #38bdf8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 15px rgba(79, 70, 229, 0.4)",
                flexShrink: 0
              }}>
                AK
              </div>
              <div>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#818cf8", fontWeight: 700, display: "block" }}>
                  MEMBER 01
                </span>
                <h3 style={{ fontSize: "1.15rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                  Ankit Kapse
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 600 }}>
                  Feature 1 Lead
                </span>
              </div>
            </div>

            {/* Right: Feature Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h4 style={{ fontSize: "1.05rem", color: "#f8fafc", fontWeight: 700 }}>
                  Customer Onboarding Intake & Synthetic Registry
                </h4>
                <span className="badge badge-status-approved" style={{ fontSize: "0.7rem" }}>
                  Module Ready
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Built the intake architecture with live validation for DOB, address, occupation, income, and national IDs. Engineered a pre-seeded synthetic dataset of 100 realistic applicants across 12 countries with high-density search, status filters, and instant CSV exports.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Demographics Ingestion</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Regex ID Formatting</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>100 Synthetic Profiles</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>CSV Export Pipeline</span>
              </div>
            </div>
          </div>

          {/* Member 2: Shruti Khadatkar */}
          <div className="glass-panel card-3d" style={{
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 24,
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(245, 158, 11, 0.3)"
          }}>
            {/* Left: Member Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRight: "1px solid var(--border-subtle)", paddingRight: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                flexShrink: 0
              }}>
                SK
              </div>
              <div>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#fbbf24", fontWeight: 700, display: "block" }}>
                  MEMBER 02
                </span>
                <h3 style={{ fontSize: "1.15rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                  Shruti Khadatkar
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 600 }}>
                  Feature 2 Lead
                </span>
              </div>
            </div>

            {/* Right: Feature Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h4 style={{ fontSize: "1.05rem", color: "#f8fafc", fontWeight: 700 }}>
                  Automated ID & Form Consistency Matrix
                </h4>
                <span className="badge badge-med" style={{ fontSize: "0.7rem" }}>
                  Verified
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Engineered the real-time cross-referencing engine comparing submitted customer forms against government records (id_records). Automatically detects DOB month/day inversions, computes address similarity variance, validates regex formats, and generates an objective Consistency Score.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Government Registry Match</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>DOB Inversion Detection</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Side-by-Side Diff Matrix</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Consistency Scoring (0-100%)</span>
              </div>
            </div>
          </div>

          {/* Member 3: Yash Bharambe */}
          <div className="glass-panel card-3d" style={{
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 24,
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(56, 189, 248, 0.3)"
          }}>
            {/* Left: Member Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRight: "1px solid var(--border-subtle)", paddingRight: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 15px rgba(56, 189, 248, 0.4)",
                flexShrink: 0
              }}>
                YB
              </div>
              <div>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#38bdf8", fontWeight: 700, display: "block" }}>
                  MEMBER 03
                </span>
                <h3 style={{ fontSize: "1.15rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                  Yash Bharambe
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 600 }}>
                  Feature 3 Lead
                </span>
              </div>
            </div>

            {/* Right: Feature Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h4 style={{ fontSize: "1.05rem", color: "#f8fafc", fontWeight: 700 }}>
                  Fuzzy Watchlist Screening & Multi-Factor Risk Engine
                </h4>
                <span className="badge badge-low" style={{ fontSize: "0.7rem" }}>
                  Algorithmic Core
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Implemented the dual-tier algorithmic matching engine combining Levenshtein distance dynamic programming with American Soundex phonetic encoding. Unmasks evasive typos (e.g. <em>Rajesh Kumar</em> vs <em>Rajesh Kumarr</em> at 95% similarity) and computes transparent Low/Medium/High risk ratings with trigger reasons.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Levenshtein Distance Matrix</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>American Soundex Phonetics</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>30 Global Sanctions Monitored</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Explainable Risk Breakdown</span>
              </div>
            </div>
          </div>

          {/* Member 4: Divyani Katre */}
          <div className="glass-panel card-3d" style={{
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 24,
            alignItems: "center",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(16, 185, 129, 0.3)"
          }}>
            {/* Left: Member Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRight: "1px solid var(--border-subtle)", paddingRight: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
                flexShrink: 0
              }}>
                DK
              </div>
              <div>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700, display: "block" }}>
                  MEMBER 04
                </span>
                <h3 style={{ fontSize: "1.15rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                  Divyani Katre
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600 }}>
                  Feature 4 Lead
                </span>
              </div>
            </div>

            {/* Right: Feature Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h4 style={{ fontSize: "1.05rem", color: "#f8fafc", fontWeight: 700 }}>
                  Compliance Dashboard & Immutable Audit Trail
                </h4>
                <span className="badge badge-status-approved" style={{ fontSize: "0.7rem" }}>
                  Regulatory Grade
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Built the compliance adjudication center with dedicated queues for Pending, Approved, and Flagged accounts. Mandates officer sign-off with regulatory reason codes, maintaining a tamper-evident, chronological audit log capturing who decided what, when, and why for supervisory audits.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Adjudication Queue Triage</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Regulatory Reason Code Mandate</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Immutable Audit Trail</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}>Audit Export Pipeline</span>
              </div>
            </div>
          </div>

          {/* Member 5: Anurag Pathak */}
          <div className="glass-panel card-3d" style={{
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 24,
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "1px solid rgba(244, 63, 94, 0.45)"
          }}>
            {/* Left: Member Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, borderRight: "1px solid var(--border-subtle)", paddingRight: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#fff",
                boxShadow: "0 0 15px rgba(244, 63, 94, 0.5)",
                flexShrink: 0
              }}>
                AP
              </div>
              <div>
                <span className="mono" style={{ fontSize: "0.7rem", color: "#fb7185", fontWeight: 700, display: "block" }}>
                  MEMBER 05 • KILLER INNOVATION
                </span>
                <h3 style={{ fontSize: "1.15rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                  Anurag Pathak
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#fda4af", fontWeight: 600 }}>
                  Feature 5 Lead
                </span>
              </div>
            </div>

            {/* Right: Feature Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <h4 style={{ fontSize: "1.05rem", color: "#f8fafc", fontWeight: 700 }}>
                  Continuous Sanctions Monitoring & 1-Click SAR Generator
                </h4>
                <span className="badge badge-high" style={{ fontSize: "0.7rem" }}>
                  Hackathon Differentiator
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 12px" }}>
                Solves the hackathon's core challenge question: <em>"What happens to existing customers when a new name is added to the watchlist?"</em> When a new sanction is issued, Anurag's engine retroactively sweeps all historical approved customers in milliseconds, immediately freezes matching accounts, and synthesizes a formal FinCEN-compliant Suspicious Activity Report (SAR-101) with legal narrative and digital sign-off.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(244, 63, 94, 0.15)", color: "#fda4af", border: "1px solid rgba(244, 63, 94, 0.3)" }}>Retroactive Customer Sweep</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(244, 63, 94, 0.15)", color: "#fda4af", border: "1px solid rgba(244, 63, 94, 0.3)" }}>Automated Account Freeze</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(244, 63, 94, 0.15)", color: "#fda4af", border: "1px solid rgba(244, 63, 94, 0.3)" }}>1-Click FinCEN SAR-101</span>
                <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: 4, background: "rgba(244, 63, 94, 0.15)", color: "#fda4af", border: "1px solid rgba(244, 63, 94, 0.3)" }}>Print-Ready Legal Narrative</span>
              </div>
            </div>
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
