import React from "react";
import { X, ShieldAlert, AlertTriangle, CheckCircle, Search, FileText } from "lucide-react";
import { screenAgainstWatchlist, calculateSimilarity, soundex } from "../services/matchingEngine";

export default function WatchlistScreeningModal({ isOpen, onClose, applicant, watchlist = [], onOpenSar }) {
  if (!isOpen || !applicant) return null;

  const screening = screenAgainstWatchlist(applicant, watchlist);
  const applicantSoundex = soundex(applicant.full_name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: screening.hasHit ? "rgba(244, 63, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
              border: `1px solid ${screening.hasHit ? "rgba(244, 63, 94, 0.4)" : "rgba(16, 185, 129, 0.4)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {screening.hasHit ? <ShieldAlert size={22} color="#f43f5e" /> : <CheckCircle size={22} color="#34d399" />}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: "1.2rem", color: "#f8fafc" }}>
                  Feature 3: Watchlist Screening & Risk Rating Engine
                </h2>
                <span className={`badge ${applicant.risk_level === "High" ? "badge-high" : applicant.risk_level === "Medium" ? "badge-med" : "badge-low"}`}>
                  Risk Tier: {applicant.risk_level} ({applicant.risk_score || 0}/100)
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Applicant Name: <strong style={{ color: "#fff" }}>{applicant.full_name}</strong> | Phonetic Soundex: <span className="mono" style={{ color: "#38bdf8" }}>{applicantSoundex}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Executive Risk Explanation */}
          <div style={{
            padding: 16,
            borderRadius: 12,
            background: applicant.risk_level === "High" ? "rgba(244, 63, 94, 0.1)" : "rgba(15, 23, 42, 0.7)",
            border: `1px solid ${applicant.risk_level === "High" ? "rgba(244, 63, 94, 0.3)" : "var(--border-subtle)"}`,
            display: "flex",
            flexDirection: "column",
            gap: 10
          }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explainable Risk Reasons & Algorithmic Factors
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {applicant.risk_reasons && applicant.risk_reasons.length > 0 ? (
                applicant.risk_reasons.map((reason, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <AlertTriangle size={15} color={applicant.risk_level === "High" ? "#f43f5e" : "#fbbf24"} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#f1f5f9" }}>{reason}</span>
                  </div>
                ))
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#34d399", fontSize: "0.85rem" }}>
                  <CheckCircle size={15} />
                  <span>No negative sanctions, PEP records, or financial anomalies detected.</span>
                </div>
              )}
            </div>
          </div>

          {/* Fuzzy Match Results List */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Search size={16} color="#38bdf8" />
                <h3 style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
                  Fuzzy Matching Results Against 30 Global Sanctions
                </h3>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                Levenshtein Normalized Distance + Phonetic Soundex Matrix
              </span>
            </div>

            {screening.allMatches.length > 0 ? (
              <div style={{
                maxHeight: 260,
                overflowY: "auto",
                border: "1px solid var(--border-subtle)",
                borderRadius: 10,
                background: "rgba(15, 23, 42, 0.6)"
              }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Watchlist Name</th>
                      <th>Country</th>
                      <th>Category</th>
                      <th>Similarity Score</th>
                      <th>Sanction Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screening.allMatches.map((m, idx) => (
                      <tr key={idx} style={{
                        background: m.similarity >= 80 ? "rgba(244, 63, 94, 0.08)" : "transparent"
                      }}>
                        <td>
                          <div style={{ fontWeight: 600, color: "#fff" }}>{m.target_name}</div>
                          {m.matched_as !== m.target_name && (
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Matched as: {m.matched_as}</div>
                          )}
                        </td>
                        <td>{m.country}</td>
                        <td>
                          <span style={{
                            fontSize: "0.7rem",
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.08)",
                            color: "#cbd5e1"
                          }}>
                            {m.category}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                              width: 60,
                              height: 6,
                              borderRadius: 3,
                              background: "rgba(255,255,255,0.1)",
                              overflow: "hidden"
                            }}>
                              <div style={{
                                width: `${m.similarity}%`,
                                height: "100%",
                                background: m.similarity >= 80 ? "#f43f5e" : m.similarity >= 60 ? "#fbbf24" : "#60a5fa"
                              }} />
                            </div>
                            <span className="mono" style={{
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: m.similarity >= 80 ? "#fb7185" : m.similarity >= 60 ? "#fde68a" : "#93c5fd"
                            }}>
                              {m.similarity}%
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: 220 }}>
                          {m.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{
                padding: "30px",
                textAlign: "center",
                background: "rgba(15, 23, 42, 0.5)",
                border: "1px dashed var(--border-subtle)",
                borderRadius: 10,
                color: "var(--text-muted)"
              }}>
                <CheckCircle size={32} color="#34d399" style={{ margin: "0 auto 10px" }} />
                <p style={{ fontWeight: 600, color: "#f8fafc" }}>100% Clean Watchlist Record</p>
                <p style={{ fontSize: "0.8rem", marginTop: 4 }}>
                  No phonetic or character variations found on OFAC, PEP, or Interpol sanctions lists.
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
            {screening.hasHit || applicant.risk_level === "High" ? (
              <button 
                className="btn btn-danger"
                onClick={() => {
                  onClose();
                  onOpenSar(applicant, screening.allMatches[0]);
                }}
              >
                <FileText size={16} />
                Generate Suspicious Activity Report (SAR-101)
              </button>
            ) : (
              <div />
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Close Screening Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
