import React, { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  UserX
} from "lucide-react";
import { updateApplicantDecision } from "../services/storageService";

export default function ComplianceDashboard({ 
  applicants = [], 
  onSelectApplicant, 
  onOpenConsistency, 
  onOpenWatchlist,
  onOpenSar
}) {
  const [activeTab, setActiveTab] = useState("Pending"); // 'Pending', 'Approved', 'Rejected', 'Under Review'
  const [decisionModal, setDecisionModal] = useState({ isOpen: false, applicant: null });
  const [officerName, setOfficerName] = useState("Officer Vikram Mehta");
  const [decisionType, setDecisionType] = useState("Approve");
  const [reasonCode, setReasonCode] = useState("CLEAN_VERIFICATION_PASS");
  const [officerNotes, setOfficerNotes] = useState("");

  const filteredApplicants = applicants.filter(a => {
    if (activeTab === "Pending") return a.status === "Pending";
    if (activeTab === "Approved") return a.status === "Approved";
    if (activeTab === "Rejected") return a.status === "Rejected" || a.status === "Flagged";
    if (activeTab === "Under Review") return a.status === "Under Review";
    return true;
  });

  const handleOpenDecision = (applicant, type) => {
    setDecisionType(type);
    setDecisionModal({ isOpen: true, applicant });
    if (type === "Approve") {
      setReasonCode("CLEAN_VERIFICATION_PASS");
      setOfficerNotes("Identity and sanctions checks verified. Account approved for standard retail operations.");
    } else if (type === "Reject") {
      setReasonCode("SANCTION_WATCHLIST_MATCH");
      setOfficerNotes("Application rejected due to material sanctions hit or severe identity discrepancy.");
    } else {
      setReasonCode("ENHANCED_DUE_DILIGENCE");
      setOfficerNotes("Escalated for senior compliance investigation and document re-submission.");
    }
  };

  const handleConfirmDecision = (e) => {
    e.preventDefault();
    if (!decisionModal.applicant) return;

    const newStatus = decisionType === "Approve" ? "Approved" : decisionType === "Reject" ? "Rejected" : "Under Review";
    updateApplicantDecision(
      decisionModal.applicant.applicant_id,
      newStatus,
      officerName,
      reasonCode,
      officerNotes
    );

    setDecisionModal({ isOpen: false, applicant: null });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Sub-Tabs */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-subtle)",
        paddingBottom: 12,
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { id: "Pending", label: "Pending Adjudication", count: applicants.filter(a => a.status === "Pending").length, color: "#38bdf8" },
            { id: "Under Review", label: "Under EDD Review", count: applicants.filter(a => a.status === "Under Review").length, color: "#fbbf24" },
            { id: "Approved", label: "Approved Accounts", count: applicants.filter(a => a.status === "Approved").length, color: "#34d399" },
            { id: "Rejected", label: "Flagged & Rejected", count: applicants.filter(a => a.status === "Rejected" || a.status === "Flagged").length, color: "#fb7185" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "rgba(99, 102, 241, 0.15)" : "transparent",
                border: activeTab === tab.id ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                color: activeTab === tab.id ? "#818cf8" : "var(--text-muted)",
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.15s ease"
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                background: activeTab === tab.id ? tab.color : "rgba(255,255,255,0.08)",
                color: activeTab === tab.id ? "#000" : "var(--text-muted)",
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "1px 6px",
                borderRadius: 9999
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Applicant Review Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gap: 16
      }}>
        {filteredApplicants.length > 0 ? (
          filteredApplicants.slice(0, 12).map((app) => (
            <div 
              key={app.applicant_id}
              className="glass-panel"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                border: app.status === "Flagged" 
                  ? "1px solid rgba(225, 29, 72, 0.6)" 
                  : app.risk_level === "High" 
                    ? "1px solid rgba(244, 63, 94, 0.3)" 
                    : "1px solid var(--border-subtle)",
                position: "relative"
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#fff" }}>{app.full_name}</h3>
                    <span className={`badge ${app.risk_level === "High" ? "badge-high" : app.risk_level === "Medium" ? "badge-med" : "badge-low"}`}>
                      {app.risk_level} Risk ({app.risk_score || 0}%)
                    </span>
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Ref: <span className="mono" style={{ color: "#38bdf8" }}>{app.applicant_id}</span> | {app.country}
                  </div>
                </div>

                <span className={`badge ${
                  app.status === "Approved" ? "badge-status-approved" :
                  app.status === "Rejected" ? "badge-status-rejected" :
                  app.status === "Flagged" ? "badge-status-flagged" :
                  app.status === "Under Review" ? "badge-status-review" : "badge-status-pending"
                }`}>
                  {app.status}
                </span>
              </div>

              {/* Core Details Snippet */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                padding: "10px 12px",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: 8,
                fontSize: "0.8rem"
              }}>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem" }}>DOB:</span>
                  <span style={{ color: "#e2e8f0" }}>{app.dob}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem" }}>ID Number:</span>
                  <span className="mono" style={{ color: "#e2e8f0" }}>{app.id_number}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem" }}>Occupation:</span>
                  <span style={{ color: "#e2e8f0" }}>{app.occupation}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.7rem" }}>Annual Income:</span>
                  <span className="mono" style={{ color: "#e2e8f0" }}>INR {Number(app.annual_income).toLocaleString()}</span>
                </div>
              </div>

              {/* Top Risk Factor Snippet */}
              {app.risk_reasons && app.risk_reasons.length > 0 && (
                <div style={{
                  fontSize: "0.775rem",
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: app.risk_level === "High" ? "rgba(244, 63, 94, 0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${app.risk_level === "High" ? "rgba(244, 63, 94, 0.25)" : "transparent"}`,
                  color: app.risk_level === "High" ? "#fca5a5" : "var(--text-muted)",
                  lineHeight: 1.4
                }}>
                  <strong>Surveillance Note:</strong> {app.risk_reasons[0]}
                </div>
              )}

              {/* Action Buttons Toolbar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: 12,
                marginTop: "auto"
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "5px 9px", fontSize: "0.75rem" }}
                    onClick={() => onOpenConsistency(app)}
                    title="Feature 2: Inspect Form vs ID Records"
                  >
                    Check ID
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "5px 9px", fontSize: "0.75rem" }}
                    onClick={() => onOpenWatchlist(app)}
                    title="Feature 3: Inspect Watchlist Matches"
                  >
                    Watchlist
                  </button>
                  {(app.risk_level === "High" || app.status === "Flagged") && (
                    <button
                      className="btn"
                      style={{
                        padding: "5px 9px",
                        fontSize: "0.75rem",
                        background: "rgba(244, 63, 94, 0.15)",
                        border: "1px solid rgba(244, 63, 94, 0.4)",
                        color: "#fda4af"
                      }}
                      onClick={() => onOpenSar(app)}
                      title="Feature 5: Generate Regulatory SAR Report"
                    >
                      SAR
                    </button>
                  )}
                </div>

                {/* Adjudication Decisions */}
                {app.status === "Pending" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "5px 10px", fontSize: "0.75rem" }}
                      onClick={() => handleOpenDecision(app, "Reject")}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-success"
                      style={{ padding: "5px 10px", fontSize: "0.75rem" }}
                      onClick={() => handleOpenDecision(app, "Approve")}
                    >
                      Approve
                    </button>
                  </div>
                )}

                {app.status === "Under Review" && (
                  <button
                    className="btn btn-primary"
                    style={{ padding: "5px 10px", fontSize: "0.75rem" }}
                    onClick={() => handleOpenDecision(app, "Approve")}
                  >
                    Finalize Decision
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: "1 / -1",
            padding: 40,
            textAlign: "center",
            background: "rgba(15, 23, 42, 0.4)",
            borderRadius: 12,
            border: "1px dashed var(--border-subtle)",
            color: "var(--text-muted)"
          }}>
            <CheckCircle size={32} color="#34d399" style={{ margin: "0 auto 10px" }} />
            <p style={{ fontWeight: 600, color: "#fff" }}>No applicants currently in '{activeTab}' queue.</p>
            <p style={{ fontSize: "0.8rem", marginTop: 4 }}>All cases have been processed or filtered.</p>
          </div>
        )}
      </div>

      {/* Decision Adjudication Modal */}
      {decisionModal.isOpen && (
        <div className="modal-overlay" onClick={() => setDecisionModal({ isOpen: false, applicant: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{
              padding: "18px 24px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <UserCheck size={20} color={decisionType === "Approve" ? "#34d399" : "#f43f5e"} />
                <h3 style={{ fontSize: "1.1rem", color: "#fff" }}>
                  Adjudication: {decisionType} Account
                </h3>
              </div>
            </div>

            <form onSubmit={handleConfirmDecision} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Target Customer:</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>
                  {decisionModal.applicant.full_name} ({decisionModal.applicant.applicant_id})
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                  Compliance Officer Name *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                  Mandatory Regulatory Reason Code *
                </label>
                <select
                  className="form-select"
                  value={reasonCode}
                  onChange={(e) => setReasonCode(e.target.value)}
                >
                  <option value="CLEAN_VERIFICATION_PASS">CLEAN_VERIFICATION_PASS (All checks cleared)</option>
                  <option value="SANCTION_WATCHLIST_MATCH">SANCTION_WATCHLIST_MATCH (Critical OFAC/PEP match)</option>
                  <option value="ID_DOB_FRAUD">ID_DOB_FRAUD (Suspected forged identity / registry discrepancy)</option>
                  <option value="HIGH_RISK_JURISDICTION">HIGH_RISK_JURISDICTION (FATF blacklist refusal)</option>
                  <option value="SOURCE_OF_FUNDS_VERIFIED">SOURCE_OF_FUNDS_VERIFIED (Documentation confirmed)</option>
                  <option value="ENHANCED_DUE_DILIGENCE">ENHANCED_DUE_DILIGENCE (Escalated to senior committee)</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                  Compliance Notes & Legal Audit Trail *
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDecisionModal({ isOpen: false, applicant: null })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={decisionType === "Approve" ? "btn btn-success" : "btn btn-danger"}
                  style={{ padding: "10px 20px" }}
                >
                  Confirm {decisionType}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
