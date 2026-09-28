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
  UserX,
  Eye,
  Search,
  LayoutList,
  LayoutGrid,
  Check,
  X,
  Filter,
  AlertOctagon,
  Sparkles
} from "lucide-react";
import { updateApplicantDecision } from "../services/storageService";

export default function ComplianceDashboard({ 
  applicants = [], 
  onOpenProfile,
  onOpenConsistency, 
  onOpenWatchlist, 
  onOpenSar 
}) {
  const [activeStatusFilter, setActiveStatusFilter] = useState("Pending"); // 'All', 'Pending', 'HighRisk', 'Under Review', 'Approved', 'Rejected'
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // 'table' (minimalist list) or 'grid' (cards)
  const [decisionModal, setDecisionModal] = useState({ isOpen: false, applicant: null });
  const [officerName, setOfficerName] = useState("Officer Vikram Mehta");
  const [decisionType, setDecisionType] = useState("Approve");
  const [reasonCode, setReasonCode] = useState("CLEAN_VERIFICATION_PASS");
  const [officerNotes, setOfficerNotes] = useState("");

  // Counts for clean status ribbon
  const pendingCount = applicants.filter(a => a.status === "Pending").length;
  const highRiskCount = applicants.filter(a => a.risk_level === "High" || a.status === "Flagged").length;
  const reviewCount = applicants.filter(a => a.status === "Under Review").length;
  const approvedCount = applicants.filter(a => a.status === "Approved").length;
  const totalCount = applicants.length;

  // Filter applicants
  const filteredApplicants = applicants.filter(a => {
    // Search match
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery ||
      a.full_name.toLowerCase().includes(q) ||
      a.applicant_id.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      (a.risk_reasons && a.risk_reasons.some(r => r.toLowerCase().includes(q)));

    if (!matchesSearch) return false;

    // Status filter
    if (activeStatusFilter === "Pending") return a.status === "Pending";
    if (activeStatusFilter === "HighRisk") return a.risk_level === "High" || a.status === "Flagged";
    if (activeStatusFilter === "Under Review") return a.status === "Under Review";
    if (activeStatusFilter === "Approved") return a.status === "Approved";
    if (activeStatusFilter === "Rejected") return a.status === "Rejected" || a.status === "Flagged";
    return true; // 'All'
  });

  const handleOpenDecision = (applicant, type, e) => {
    if (e) e.stopPropagation();
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
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Minimalist Executive Header & Status Ribbon */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        padding: "16px 20px",
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12
      }}>
        {/* Status Filter Tabs (Minimalist Pills) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {[
            { id: "Pending", label: "Pending Review", count: pendingCount, color: "#38bdf8" },
            { id: "HighRisk", label: "High Risk Alerts", count: highRiskCount, color: "#fb7185" },
            { id: "Under Review", label: "Under EDD", count: reviewCount, color: "#fbbf24" },
            { id: "Approved", label: "Approved", count: approvedCount, color: "#34d399" },
            { id: "All", label: "All Applications", count: totalCount, color: "#94a3b8" }
          ].map(tab => {
            const isActive = activeStatusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStatusFilter(tab.id)}
                style={{
                  background: isActive ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid var(--border-subtle)",
                  color: isActive ? "#fff" : "var(--text-muted)",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: "0.825rem",
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
                  background: isActive ? tab.color : "rgba(255, 255, 255, 0.08)",
                  color: isActive ? "#000" : "var(--text-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 9999
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Quick Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Quick Search */}
          <div style={{ position: "relative", minWidth: 220 }}>
            <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              className="form-input"
              placeholder="Filter queue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "6px 12px 6px 30px", fontSize: "0.825rem", width: "100%" }}
            />
          </div>

          {/* Table / Card View Switcher */}
          <div style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            padding: 2
          }}>
            <button
              onClick={() => setViewMode("table")}
              title="Minimalist Table Triage View"
              style={{
                background: viewMode === "table" ? "rgba(99, 102, 241, 0.25)" : "transparent",
                border: "none",
                color: viewMode === "table" ? "#fff" : "var(--text-muted)",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8rem",
                fontWeight: 600
              }}
            >
              <LayoutList size={14} />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Card View"
              style={{
                background: viewMode === "grid" ? "rgba(99, 102, 241, 0.25)" : "transparent",
                border: "none",
                color: viewMode === "grid" ? "#fff" : "var(--text-muted)",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8rem",
                fontWeight: 600
              }}
            >
              <LayoutGrid size={14} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "table" ? (
        /* Minimalist Table View (Clean, High-Density, Fast Compliance Triage) */
        <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 100 }}>Ref ID</th>
                  <th>Applicant</th>
                  <th>Country</th>
                  <th>Risk Tier</th>
                  <th>Surveillance Analysis</th>
                  <th>Current Status</th>
                  <th style={{ textAlign: "right", minWidth: 220 }}>Triage Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.slice(0, 25).map((app) => (
                    <tr 
                      key={app.applicant_id}
                      onClick={() => onOpenProfile && onOpenProfile(app)}
                      style={{ cursor: "pointer", transition: "all 0.15s ease" }}
                      className="applicant-table-row"
                      title="Click anywhere to inspect overall applicant dossier"
                    >
                      {/* Ref ID */}
                      <td className="mono" style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 700 }}>
                        {app.applicant_id}
                      </td>

                      {/* Applicant Name & Occupation */}
                      <td>
                        <div style={{ fontWeight: 600, color: "#f8fafc", fontSize: "0.9rem" }}>
                          {app.full_name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {app.occupation}
                        </div>
                      </td>

                      {/* Country */}
                      <td style={{ fontSize: "0.825rem", color: "var(--text-main)" }}>
                        {app.country}
                      </td>

                      {/* Risk Tier & Score */}
                      <td>
                        <span className={`badge ${
                          app.risk_level === "High" ? "badge-high" :
                          app.risk_level === "Medium" ? "badge-med" : "badge-low"
                        }`}>
                          {app.risk_level} ({app.risk_score || 0}%)
                        </span>
                      </td>

                      {/* Surveillance Analysis Snippet */}
                      <td>
                        {app.risk_reasons && app.risk_reasons.length > 0 ? (
                          <div style={{
                            fontSize: "0.775rem",
                            color: app.risk_level === "High" ? "#fda4af" : "var(--text-muted)",
                            maxWidth: 320,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}>
                            {app.risk_reasons[0]}
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.775rem", color: "#34d399" }}>
                            Clean Clearance • 0 Hits
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`badge ${
                          app.status === "Approved" ? "badge-status-approved" :
                          app.status === "Rejected" ? "badge-status-rejected" :
                          app.status === "Flagged" ? "badge-status-flagged" :
                          app.status === "Under Review" ? "badge-status-review" : "badge-status-pending"
                        }`}>
                          {app.status}
                        </span>
                      </td>

                      {/* Fast Action Toolbar */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                          {/* 360 Dossier Button */}
                          <button
                            className="btn btn-secondary"
                            style={{ padding: "4px 8px", fontSize: "0.75rem", gap: 4 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProfile && onOpenProfile(app);
                            }}
                            title="Open full 360° applicant dossier & overall data"
                          >
                            <Eye size={13} color="#38bdf8" />
                            <span>Dossier</span>
                          </button>

                          {/* Quick 1-Click Decisions for Pending */}
                          {app.status === "Pending" ? (
                            <>
                              <button
                                className="btn btn-success"
                                style={{ padding: "4px 8px", fontSize: "0.75rem", gap: 4 }}
                                onClick={(e) => handleOpenDecision(app, "Approve", e)}
                                title="Approve applicant"
                              >
                                <Check size={13} />
                                <span>Approve</span>
                              </button>
                              <button
                                className="btn btn-danger"
                                style={{ padding: "4px 8px", fontSize: "0.75rem", gap: 4 }}
                                onClick={(e) => handleOpenDecision(app, "Reject", e)}
                                title="Reject or flag applicant"
                              >
                                <X size={13} />
                                <span>Reject</span>
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                              onClick={(e) => handleOpenDecision(app, "Review", e)}
                              title="Re-open or modify adjudication decision"
                            >
                              Edit Decision
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                      No applications found in this queue filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Minimalist Card Grid View */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16
        }}>
          {filteredApplicants.length > 0 ? (
            filteredApplicants.slice(0, 18).map((app) => (
              <div
                key={app.applicant_id}
                className="glass-panel"
                onClick={() => onOpenProfile && onOpenProfile(app)}
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: "pointer",
                  border: app.status === "Flagged" 
                    ? "1px solid rgba(225, 29, 72, 0.5)" 
                    : app.risk_level === "High"
                      ? "1px solid rgba(244, 63, 94, 0.3)"
                      : "1px solid var(--border-subtle)",
                  transition: "all 0.15s ease"
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", color: "#fff", margin: 0, fontWeight: 700 }}>
                      {app.full_name}
                    </h3>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                      <span className="mono" style={{ color: "#38bdf8" }}>{app.applicant_id}</span> • {app.country}
                    </div>
                  </div>

                  <span className={`badge ${
                    app.risk_level === "High" ? "badge-high" :
                    app.risk_level === "Medium" ? "badge-med" : "badge-low"
                  }`}>
                    {app.risk_level} ({app.risk_score || 0}%)
                  </span>
                </div>

                {/* Key Reason / Clearance */}
                <div style={{
                  fontSize: "0.78rem",
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: app.risk_level === "High" ? "rgba(244, 63, 94, 0.1)" : "rgba(255, 255, 255, 0.03)",
                  color: app.risk_level === "High" ? "#fda4af" : "var(--text-muted)",
                  lineHeight: 1.4
                }}>
                  {app.risk_reasons && app.risk_reasons.length > 0 ? (
                    app.risk_reasons[0]
                  ) : (
                    <span style={{ color: "#34d399" }}>✓ All identity and watchlist checks clean</span>
                  )}
                </div>

                {/* Footer Actions */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: 10,
                  marginTop: "auto"
                }}>
                  <span className={`badge ${
                    app.status === "Approved" ? "badge-status-approved" :
                    app.status === "Rejected" ? "badge-status-rejected" :
                    app.status === "Flagged" ? "badge-status-flagged" :
                    app.status === "Under Review" ? "badge-status-review" : "badge-status-pending"
                  }`} style={{ fontSize: "0.7rem" }}>
                    {app.status}
                  </span>

                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: "3px 8px", fontSize: "0.75rem" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProfile && onOpenProfile(app);
                      }}
                    >
                      Dossier
                    </button>
                    {app.status === "Pending" && (
                      <button
                        className="btn btn-success"
                        style={{ padding: "3px 8px", fontSize: "0.75rem" }}
                        onClick={(e) => handleOpenDecision(app, "Approve", e)}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
              No applications match this filter.
            </div>
          )}
        </div>
      )}

      {/* Decision Modal */}
      {decisionModal.isOpen && decisionModal.applicant && (
        <div className="modal-overlay" onClick={() => setDecisionModal({ isOpen: false, applicant: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            {/* Modal Header */}
            <div style={{
              padding: "18px 22px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>
                  {decisionType === "Approve" ? "Approve Application" : decisionType === "Reject" ? "Reject / Flag Application" : "Escalate to EDD"}
                </h3>
                <span style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>
                  {decisionModal.applicant.full_name} ({decisionModal.applicant.applicant_id})
                </span>
              </div>
              <button 
                onClick={() => setDecisionModal({ isOpen: false, applicant: null })}
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleConfirmDecision} style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
                  Adjudication Action:
                </label>
                <select 
                  className="form-select"
                  value={decisionType}
                  onChange={(e) => setDecisionType(e.target.value)}
                >
                  <option value="Approve">Approve Account</option>
                  <option value="Under Review">Escalate to Enhanced Due Diligence (EDD)</option>
                  <option value="Reject">Reject Application</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
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
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 6, fontWeight: 600 }}>
                  Officer Supervisory Notes:
                </label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="Enter audit trail remarks..."
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
                  className={`btn ${decisionType === "Approve" ? "btn-success" : decisionType === "Reject" ? "btn-danger" : "btn-primary"}`}
                >
                  Confirm & Commit Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
