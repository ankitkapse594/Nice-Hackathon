import React, { useState } from "react";
import { 
  X, 
  User, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Briefcase, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  ShieldAlert, 
  AlertOctagon, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Printer, 
  Clock, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Zap,
  Building,
  Hash,
  Activity
} from "lucide-react";
import { runConsistencyCheck, screenAgainstWatchlist, evaluateRiskRating } from "../services/matchingEngine";

export default function ApplicantProfileModal({
  isOpen,
  onClose,
  applicant,
  idRecord,
  watchlist = [],
  auditLogs = [],
  currentUser,
  onUpdateDecision,
  onOpenConsistency,
  onOpenWatchlist,
  onOpenSar
}) {
  if (!isOpen || !applicant) return null;

  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'consistency', 'watchlist', 'adjudication'
  
  // Interactive Decision form state inside the profile
  const [decisionType, setDecisionType] = useState(applicant.status === "Approved" ? "Approved" : "Approved");
  const [reasonCode, setReasonCode] = useState(
    applicant.risk_level === "High" ? "SANCTION_WATCHLIST_MATCH" : "CLEAN_VERIFICATION_PASS"
  );
  const [notes, setNotes] = useState("");
  const [decisionSuccess, setDecisionSuccess] = useState(false);

  // Algorithmic evaluations
  const consistency = runConsistencyCheck(applicant, idRecord);
  const screening = screenAgainstWatchlist(applicant.full_name, watchlist);
  const riskEval = evaluateRiskRating(applicant, consistency, screening);

  // Filter audit logs for this specific applicant
  const applicantLogs = auditLogs.filter(log => log.applicant_id === applicant.applicant_id);

  // Calculate age from DOB
  const calculateAge = (dobString) => {
    if (!dobString) return "N/A";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "N/A";
    const diff = Date.now() - birthDate.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const handleDecisionSubmit = (e) => {
    e.preventDefault();
    if (onUpdateDecision) {
      onUpdateDecision(
        applicant.applicant_id,
        decisionType,
        currentUser?.name || "Compliance Officer",
        reasonCode,
        notes || `Status updated to ${decisionType} via 360° Applicant Dossier.`
      );
      setDecisionSuccess(true);
      setTimeout(() => setDecisionSuccess(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: 960,
          background: "linear-gradient(180deg, #0e1526 0%, #090d16 100%)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          boxShadow: "0 25px 70px -10px rgba(0, 0, 0, 0.9)"
        }}
      >
        {/* Top Header Card */}
        <div style={{
          padding: "24px 28px",
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(15, 23, 42, 0.75)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16
        }}>
          {/* Identity & Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: applicant.risk_level === "High" 
                ? "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)" 
                : applicant.risk_level === "Medium"
                  ? "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)"
                  : "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.35rem",
              boxShadow: applicant.risk_level === "High" 
                ? "0 0 20px rgba(244, 63, 94, 0.4)" 
                : "0 0 20px rgba(16, 185, 129, 0.3)",
              flexShrink: 0
            }}>
              {applicant.full_name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: "1.5rem", color: "#f8fafc", fontWeight: 800, margin: 0 }}>
                  {applicant.full_name}
                </h2>
                <span className="mono" style={{
                  fontSize: "0.8rem",
                  color: "#38bdf8",
                  background: "rgba(56, 189, 248, 0.12)",
                  padding: "3px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontWeight: 700
                }}>
                  {applicant.applicant_id}
                </span>

                <span className={`badge ${
                  applicant.status === "Approved" ? "badge-status-approved" :
                  applicant.status === "Rejected" ? "badge-status-rejected" :
                  applicant.status === "Flagged" ? "badge-status-flagged" :
                  applicant.status === "Under Review" ? "badge-status-review" : "badge-status-pending"
                }`}>
                  {applicant.status}
                </span>

                <span className={`badge ${
                  applicant.risk_level === "High" ? "badge-high" :
                  applicant.risk_level === "Medium" ? "badge-med" : "badge-low"
                }`}>
                  {applicant.risk_level} Risk ({applicant.risk_score || 0}%)
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "0.825rem", color: "var(--text-muted)", marginTop: 6 }}>
                <span>Nationality: <strong style={{ color: "#fff" }}>{applicant.country}</strong></span>
                <span>•</span>
                <span>ID: <strong className="mono" style={{ color: "#93c5fd" }}>{applicant.id_number}</strong></span>
                <span>•</span>
                <span>Submitted: <span className="mono">{new Date(applicant.created_at || Date.now()).toLocaleDateString()}</span></span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button 
              className="btn btn-secondary"
              onClick={handlePrint}
              style={{ padding: "7px 12px", fontSize: "0.8rem" }}
              title="Print formatted dossier report"
            >
              <Printer size={15} />
              <span>Print Dossier</span>
            </button>

            {(applicant.risk_level === "High" || applicant.status === "Flagged") && onOpenSar && (
              <button 
                className="btn"
                onClick={() => {
                  onClose();
                  onOpenSar(applicant, screening.highestMatch);
                }}
                style={{
                  padding: "7px 12px",
                  fontSize: "0.8rem",
                  background: "linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(225, 29, 72, 0.35) 100%)",
                  border: "1px solid rgba(244, 63, 94, 0.5)",
                  color: "#fda4af"
                }}
              >
                <AlertOctagon size={15} color="#f43f5e" />
                <span>1-Click SAR Filing</span>
              </button>
            )}

            <button 
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                borderRadius: 8,
                padding: "7px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(9, 13, 22, 0.5)",
          padding: "0 28px",
          gap: 4
        }}>
          {[
            { id: "overview", label: "360° Comprehensive Profile", icon: User },
            { id: "consistency", label: `ID Consistency (${consistency.consistencyScore}%)`, icon: ShieldCheck, badge: consistency.hasDiscrepancy ? "Alert" : "Verified" },
            { id: "watchlist", label: `Watchlist & Risk (${screening.highestSimilarity}%)`, icon: AlertTriangle, badge: screening.hasMatch ? "Match Hit" : "Clean" },
            { id: "adjudication", label: `Adjudication & Audit (${applicantLogs.length})`, icon: Activity },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid #818cf8" : "2px solid transparent",
                  color: isActive ? "#fff" : "var(--text-muted)",
                  padding: "14px 16px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.15s ease"
                }}
              >
                <Icon size={16} color={isActive ? "#818cf8" : "var(--text-dim)"} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    fontSize: "0.68rem",
                    padding: "1px 6px",
                    borderRadius: 9999,
                    background: tab.badge === "Clean" || tab.badge === "Verified" ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.2)",
                    color: tab.badge === "Clean" || tab.badge === "Verified" ? "#34d399" : "#fb7185",
                    fontWeight: 700
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Comprehensive 360° Profile */}
        {activeTab === "overview" && (
          <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Quick KPI Surveillance Bar */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14
            }}>
              <div className="glass-panel" style={{ padding: "16px 18px", borderLeft: "3px solid #38bdf8" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  Composite Risk Level
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: applicant.risk_level === "High" ? "#fb7185" : applicant.risk_level === "Medium" ? "#fbbf24" : "#34d399"
                  }}>
                    {applicant.risk_level}
                  </span>
                  <span className="mono" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    ({applicant.risk_score || 0}/100)
                  </span>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "16px 18px", borderLeft: `3px solid ${consistency.consistencyScore >= 80 ? '#34d399' : '#fbbf24'}` }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  Feature 2 ID Consistency
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: consistency.consistencyScore >= 80 ? "#34d399" : consistency.consistencyScore >= 50 ? "#fbbf24" : "#fb7185"
                  }}>
                    {consistency.consistencyScore}%
                  </span>
                  <span style={{ fontSize: "0.75rem", color: consistency.hasDiscrepancy ? "#fbbf24" : "#34d399" }}>
                    {consistency.hasDiscrepancy ? `${consistency.discrepancies.length} flags` : "Perfect Match"}
                  </span>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "16px 18px", borderLeft: `3px solid ${screening.hasMatch ? '#f43f5e' : '#34d399'}` }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  Feature 3 Watchlist Screening
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: screening.hasMatch ? "#fb7185" : "#34d399"
                  }}>
                    {screening.highestSimilarity}%
                  </span>
                  <span style={{ fontSize: "0.75rem", color: screening.hasMatch ? "#fda4af" : "#34d399" }}>
                    {screening.hasMatch ? "Sanctions Alert" : "0 Hits Clean"}
                  </span>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "16px 18px", borderLeft: "3px solid #818cf8" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  STP Fast-Track Status
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: (applicant.status === "Pending" && applicant.risk_score <= 15) ? "#34d399" : "#94a3b8"
                  }}>
                    {(applicant.status === "Pending" && applicant.risk_score <= 15) ? "Eligible" : "Manual Queue"}
                  </span>
                </div>
              </div>
            </div>

            {/* Two-Column Master Dossier Detail */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20
            }}>
              {/* Demographics & Personal Info */}
              <div className="glass-panel" style={{ padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <User size={18} color="#818cf8" />
                  <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 700 }}>
                    Demographics & Identity Records
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Full Legal Name:</span>
                    <strong style={{ color: "#fff" }}>{applicant.full_name}</strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Date of Birth:</span>
                    <div>
                      <strong style={{ color: "#fff" }}>{applicant.dob}</strong>
                      <span style={{ color: "var(--text-dim)", marginLeft: 6 }}>({calculateAge(applicant.dob)} yrs old)</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Nationality / Country:</span>
                    <strong style={{ color: "#fff" }}>{applicant.country}</strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>ID Document Type:</span>
                    <span className="badge badge-low" style={{ fontSize: "0.72rem" }}>
                      {idRecord?.id_type || "Passport / National ID"}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>ID Document Number:</span>
                    <strong className="mono" style={{ color: "#38bdf8" }}>{applicant.id_number}</strong>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ color: "var(--text-muted)" }}>Residential Address:</span>
                    <span style={{ color: "#e2e8f0", background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: 6, lineHeight: 1.4 }}>
                      {applicant.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial & Compliance Risk Profile */}
              <div className="glass-panel" style={{ padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <Briefcase size={18} color="#38bdf8" />
                  <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 700 }}>
                    Financial Profile & Surveillance Factors
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Occupation / Industry:</span>
                    <strong style={{ color: "#fff" }}>{applicant.occupation}</strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Stated Annual Income:</span>
                    <strong className="mono" style={{ color: "#34d399", fontSize: "0.95rem" }}>
                      INR {Number(applicant.annual_income).toLocaleString()}
                    </strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Account Classification:</span>
                    <span style={{ color: "#cbd5e1" }}>
                      {Number(applicant.annual_income) > 2500000 ? "Private Banking / Premier" : "Retail Standard"}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)" }}>Politically Exposed Person (PEP):</span>
                    <span style={{ color: applicant.risk_reasons?.some(r => r.toLowerCase().includes("pep")) ? "#fb7185" : "#34d399", fontWeight: 600 }}>
                      {applicant.risk_reasons?.some(r => r.toLowerCase().includes("pep")) ? "FLAGGED PEP" : "No Known Exposure"}
                    </span>
                  </div>

                  {/* Surveillance Risk Triggers */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Surveillance Explanations & Risk Triggers:
                    </span>
                    {applicant.risk_reasons && applicant.risk_reasons.length > 0 ? (
                      applicant.risk_reasons.map((reason, idx) => (
                        <div 
                          key={idx}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 6,
                            background: applicant.risk_level === "High" ? "rgba(244, 63, 94, 0.12)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${applicant.risk_level === "High" ? "rgba(244, 63, 94, 0.25)" : "var(--border-subtle)"}`,
                            color: applicant.risk_level === "High" ? "#fca5a5" : "var(--text-muted)",
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            lineHeight: 1.4
                          }}
                        >
                          <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} color={applicant.risk_level === "High" ? "#f43f5e" : "#fbbf24"} />
                          <span>{reason}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        color: "#34d399",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}>
                        <CheckCircle2 size={16} />
                        <span>Clean profile. Zero negative media or adverse regulatory findings.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Footer inside tab */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(15, 23, 42, 0.5)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 10,
              padding: "14px 20px",
              flexWrap: "wrap",
              gap: 12
            }}>
              <span style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
                Need specialized inspection for individual hackathon evaluation?
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveTab("consistency")}
                  style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                >
                  <ShieldCheck size={14} color="#fbbf24" />
                  <span>Check ID Matrix</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveTab("watchlist")}
                  style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                >
                  <AlertTriangle size={14} color="#f43f5e" />
                  <span>Check Watchlist</span>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab("adjudication")}
                  style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                >
                  <span>Adjudicate Decision</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ID Consistency Matrix (Feature 2 Deep Dive) */}
        {activeTab === "consistency" && (
          <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Discrepancy Alert */}
            {consistency.hasDiscrepancy ? (
              <div style={{
                padding: "14px 18px",
                borderRadius: 10,
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                display: "flex",
                flexDirection: "column",
                gap: 6
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fbbf24", fontWeight: 700, fontSize: "0.9rem" }}>
                  <AlertTriangle size={18} />
                  <span>{consistency.discrepancies.length} Identity Discrepancies Found</span>
                </div>
                <ul style={{ margin: "4px 0 0 24px", fontSize: "0.825rem", color: "#fde68a" }}>
                  {consistency.discrepancies.map((disc, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{disc}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{
                padding: "12px 18px",
                borderRadius: 10,
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#6ee7b7",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.875rem"
              }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span>Submitted form data matches the Government ID Registry across all validation fields.</span>
              </div>
            )}

            {/* Side-by-Side Comparison Table */}
            <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border-subtle)" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Verification Field</th>
                    <th>Customer Submitted Form</th>
                    <th>Government ID Record</th>
                    <th>Comparison Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Name Check */}
                  <tr>
                    <td style={{ fontWeight: 600 }}>Full Name</td>
                    <td style={{ color: "#fff" }}>{applicant.full_name}</td>
                    <td style={{ color: "#93c5fd" }}>{idRecord?.name_on_id || applicant.full_name}</td>
                    <td>
                      {consistency.checks.nameMatch ? (
                        <span className="badge badge-low"><Check size={12} /> Exact Match</span>
                      ) : (
                        <span className="badge badge-high"><AlertTriangle size={12} /> Typo / Discrepancy</span>
                      )}
                    </td>
                  </tr>

                  {/* DOB Check */}
                  <tr>
                    <td style={{ fontWeight: 600 }}>Date of Birth</td>
                    <td className="mono" style={{ color: "#fff" }}>{applicant.dob}</td>
                    <td className="mono" style={{ color: "#93c5fd" }}>{idRecord?.dob_on_id || applicant.dob}</td>
                    <td>
                      {consistency.checks.dobInversion ? (
                        <span className="badge badge-med"><AlertTriangle size={12} /> DOB Day/Month Flip</span>
                      ) : consistency.checks.dobMatch ? (
                        <span className="badge badge-low"><Check size={12} /> Exact Match</span>
                      ) : (
                        <span className="badge badge-high"><X size={12} /> Date Mismatch</span>
                      )}
                    </td>
                  </tr>

                  {/* Address Check */}
                  <tr>
                    <td style={{ fontWeight: 600 }}>Residential Address</td>
                    <td style={{ fontSize: "0.8rem", color: "#cbd5e1", maxWidth: 220 }}>{applicant.address}</td>
                    <td style={{ fontSize: "0.8rem", color: "#93c5fd", maxWidth: 220 }}>{idRecord?.address_on_id || applicant.address}</td>
                    <td>
                      <span className={`badge ${consistency.checks.addressSimilarity >= 80 ? "badge-low" : "badge-med"}`}>
                        {consistency.checks.addressSimilarity}% Similarity
                      </span>
                    </td>
                  </tr>

                  {/* ID Format */}
                  <tr>
                    <td style={{ fontWeight: 600 }}>ID Format Validation</td>
                    <td className="mono" style={{ color: "#fff" }}>{applicant.id_number}</td>
                    <td className="mono" style={{ color: "#93c5fd" }}>Regex Validation Check</td>
                    <td>
                      {consistency.checks.idFormatValid ? (
                        <span className="badge badge-low"><Check size={12} /> Valid Format</span>
                      ) : (
                        <span className="badge badge-high"><X size={12} /> Invalid Pattern</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {onOpenConsistency && (
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onClose();
                    onOpenConsistency(applicant);
                  }}
                  style={{ fontSize: "0.8rem" }}
                >
                  <ExternalLink size={14} />
                  <span>Open Standalone Shruti Khadatkar ID Matrix Inspector</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Watchlist Screening & Risk (Feature 3 Deep Dive) */}
        {activeTab === "watchlist" && (
          <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Screening Banner */}
            <div style={{
              padding: "16px 20px",
              borderRadius: 12,
              background: screening.hasMatch ? "rgba(244, 63, 94, 0.12)" : "rgba(16, 185, 129, 0.12)",
              border: `1px solid ${screening.hasMatch ? "rgba(244, 63, 94, 0.35)" : "rgba(16, 185, 129, 0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {screening.hasMatch ? <AlertOctagon size={24} color="#f43f5e" /> : <ShieldCheck size={24} color="#34d399" />}
                <div>
                  <h4 style={{ fontSize: "1rem", color: screening.hasMatch ? "#fb7185" : "#34d399", fontWeight: 700 }}>
                    {screening.hasMatch 
                      ? `Sanctions Match Detected: ${screening.highestSimilarity}% Similarity` 
                      : "Clean Watchlist Clearance: 0 Hits Across 30 Sanctions"}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    Phonetic Soundex Encoding: <strong className="mono" style={{ color: "#38bdf8" }}>{screening.soundexCode}</strong>
                  </p>
                </div>
              </div>

              <span className={`badge ${screening.highestSimilarity >= 80 ? "badge-high" : screening.highestSimilarity >= 50 ? "badge-med" : "badge-low"}`} style={{ fontSize: "0.85rem", padding: "4px 12px" }}>
                Score: {screening.highestSimilarity}%
              </span>
            </div>

            {/* Highest Watchlist Target Details */}
            {screening.highestMatch ? (
              <div className="glass-panel" style={{ padding: 20, border: "1px solid rgba(244, 63, 94, 0.4)" }}>
                <h4 style={{ fontSize: "0.95rem", color: "#fda4af", marginBottom: 12, fontWeight: 700 }}>
                  Closest Sanctions Database Target:
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Designated Target Name:</span>
                    <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{screening.highestMatch.target.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Country & Category:</span>
                    <strong style={{ color: "#cbd5e1" }}>{screening.highestMatch.target.country} ({screening.highestMatch.target.category})</strong>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Sanctions Regulatory Enforcement Reason:</span>
                    <span style={{ color: "#fca5a5", background: "rgba(244, 63, 94, 0.1)", padding: "6px 10px", borderRadius: 6, display: "block", marginTop: 4 }}>
                      {screening.highestMatch.target.reason}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {onOpenWatchlist && (
              <div style={{ textAlign: "right" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onClose();
                    onOpenWatchlist(applicant);
                  }}
                  style={{ fontSize: "0.8rem" }}
                >
                  <ExternalLink size={14} />
                  <span>Open Standalone Yash Bharambe Fuzzy Matcher</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Adjudication Station & Audit Trail (Feature 4 Deep Dive) */}
        {activeTab === "adjudication" && (
          <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Interactive Adjudication Form */}
            <div className="glass-panel" style={{ padding: 22, border: "1px solid rgba(99, 102, 241, 0.3)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 700 }}>
                    Official Compliance Officer Adjudication
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                    Executing as: <strong style={{ color: "#38bdf8" }}>{currentUser?.name || "Divyani Katre (Lead Officer)"}</strong>
                  </p>
                </div>

                <span className={`badge ${
                  applicant.status === "Approved" ? "badge-status-approved" :
                  applicant.status === "Rejected" ? "badge-status-rejected" :
                  applicant.status === "Flagged" ? "badge-status-flagged" :
                  applicant.status === "Under Review" ? "badge-status-review" : "badge-status-pending"
                }`}>
                  Current: {applicant.status}
                </span>
              </div>

              {decisionSuccess && (
                <div style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10b981",
                  color: "#ecfdf5",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.85rem"
                }}>
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>Decision successfully committed and logged to immutable audit trail!</span>
                </div>
              )}

              <form onSubmit={handleDecisionSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Decision Buttons */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8, fontWeight: 700, textTransform: "uppercase" }}>
                    Select Action:
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                    {[
                      { id: "Approved", label: "Approve", color: "#10b981", defaultReason: "CLEAN_VERIFICATION_PASS" },
                      { id: "Under Review", label: "Escalate to EDD", color: "#fbbf24", defaultReason: "ENHANCED_DUE_DILIGENCE" },
                      { id: "Flagged", label: "Flag for AML", color: "#f43f5e", defaultReason: "SANCTION_WATCHLIST_MATCH" },
                      { id: "Rejected", label: "Reject Applicant", color: "#e11d48", defaultReason: "ID_DISCREPANCY_FAILURE" }
                    ].map(btn => (
                      <button
                        type="button"
                        key={btn.id}
                        onClick={() => {
                          setDecisionType(btn.id);
                          setReasonCode(btn.defaultReason);
                        }}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 8,
                          border: decisionType === btn.id ? `2px solid ${btn.color}` : "1px solid var(--border-subtle)",
                          background: decisionType === btn.id ? `rgba(${btn.id === 'Approved' ? '16, 185, 129' : btn.id === 'Under Review' ? '245, 158, 11' : '244, 63, 94'}, 0.2)` : "rgba(255, 255, 255, 0.04)",
                          color: decisionType === btn.id ? "#fff" : "var(--text-muted)",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reason Code Dropdown */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 700 }}>
                      Regulatory Reason Code:
                    </label>
                    <select
                      className="form-select"
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                    >
                      <option value="CLEAN_VERIFICATION_PASS">CLEAN_VERIFICATION_PASS</option>
                      <option value="SANCTION_WATCHLIST_MATCH">SANCTION_WATCHLIST_MATCH</option>
                      <option value="DOB_INVERSION_MISMATCH">DOB_INVERSION_MISMATCH</option>
                      <option value="ENHANCED_DUE_DILIGENCE">ENHANCED_DUE_DILIGENCE</option>
                      <option value="HIGH_RISK_JURISDICTION">HIGH_RISK_JURISDICTION</option>
                      <option value="POLITICALLY_EXPOSED_PERSON">POLITICALLY_EXPOSED_PERSON</option>
                      <option value="ID_DISCREPANCY_FAILURE">ID_DISCREPANCY_FAILURE</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 700 }}>
                      Compliance Officer Name:
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={currentUser?.name || "Divyani Katre (Lead Officer)"}
                      readOnly
                      style={{ opacity: 0.8 }}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 700 }}>
                    Supervisory Audit Justification Notes:
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="Enter compliance justification for regulators and external audit logs..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
                    <Check size={16} />
                    <span>Commit Official Decision</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Applicant Specific Audit Trail */}
            <div>
              <h4 style={{ fontSize: "0.95rem", color: "#fff", marginBottom: 12, fontWeight: 700 }}>
                Immutable Audit History for Ref: {applicant.applicant_id}
              </h4>

              {applicantLogs.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {applicantLogs.map((log) => (
                    <div 
                      key={log.log_id} 
                      className="glass-panel" 
                      style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="mono" style={{ fontSize: "0.75rem", color: "#38bdf8" }}>{log.log_id}</span>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <strong style={{ fontSize: "0.85rem", color: "#fff" }}>{log.action}</strong>
                            <span className="mono" style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{log.reason_code}</span>
                          </div>
                          <p style={{ fontSize: "0.775rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                            {log.notes}
                          </p>
                        </div>
                      </div>

                      <div style={{ textAlign: "right", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                        <div>By: <strong style={{ color: "#e2e8f0" }}>{log.officer_name}</strong></div>
                        <div className="mono">{new Date(log.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: 20, textAlign: "center", color: "var(--text-muted)", fontSize: "0.825rem", background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                  No previous audit actions recorded yet. Intake timestamp: {new Date(applicant.created_at || Date.now()).toLocaleString()}.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
