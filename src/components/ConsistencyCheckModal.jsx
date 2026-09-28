import React from "react";
import { X, CheckCircle, AlertTriangle, FileText, Check, ShieldCheck, ShieldAlert } from "lucide-react";
import { runConsistencyCheck } from "../services/matchingEngine";

export default function ConsistencyCheckModal({ isOpen, onClose, applicant, idRecord }) {
  if (!isOpen || !applicant) return null;

  const result = runConsistencyCheck(applicant, idRecord);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 840 }}>
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
              background: result.hasDiscrepancy ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)",
              border: `1px solid ${result.hasDiscrepancy ? "rgba(245, 158, 11, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {result.hasDiscrepancy ? <ShieldAlert size={22} color="#fbbf24" /> : <ShieldCheck size={22} color="#34d399" />}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: "1.2rem", color: "#f8fafc" }}>
                  Feature 2: Automated ID Consistency Matrix
                </h2>
                <span className={`badge ${result.consistencyScore >= 80 ? "badge-low" : result.consistencyScore >= 50 ? "badge-med" : "badge-high"}`}>
                  Score: {result.consistencyScore}%
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Applicant: <strong style={{ color: "#fff" }}>{applicant.full_name}</strong> (ID: {applicant.applicant_id})
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Consistency Discrepancy Alert Banner */}
          {result.hasDiscrepancy ? (
            <div style={{
              padding: "14px 18px",
              borderRadius: 10,
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fbbf24", fontWeight: 700, fontSize: "0.875rem" }}>
                <AlertTriangle size={18} />
                <span>{result.discrepancies.length} Identity Discrepancies Detected</span>
              </div>
              <ul style={{ margin: "4px 0 0 24px", fontSize: "0.8rem", color: "#fde68a" }}>
                {result.discrepancies.map((disc, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{disc}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{
              padding: "12px 18px",
              borderRadius: 10,
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#34d399",
              fontSize: "0.875rem",
              fontWeight: 600
            }}>
              <CheckCircle size={18} />
              <span>100% Verification Match: All declared fields match government registry records perfectly.</span>
            </div>
          )}

          {/* Side-by-Side Comparison Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            padding: 16
          }}>
            {/* Left: Customer Application Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <FileText size={16} color="#60a5fa" />
                <h3 style={{ fontSize: "0.9rem", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  1. Form Submitted Details
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Full Legal Name</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{applicant.full_name}</span>
                </div>

                <div style={{ 
                  padding: "10px 12px", 
                  background: !result.dobMatch ? "rgba(244, 63, 94, 0.15)" : "rgba(255,255,255,0.03)", 
                  borderRadius: 8,
                  border: !result.dobMatch ? "1px solid rgba(244, 63, 94, 0.4)" : "none"
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Date of Birth</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: !result.dobMatch ? "#fca5a5" : "#fff" }}>
                    {applicant.dob}
                  </span>
                </div>

                <div style={{ 
                  padding: "10px 12px", 
                  background: !result.addressMatch ? "rgba(245, 158, 11, 0.15)" : "rgba(255,255,255,0.03)", 
                  borderRadius: 8,
                  border: !result.addressMatch ? "1px solid rgba(245, 158, 11, 0.4)" : "none"
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Residential Address</span>
                  <span style={{ fontSize: "0.85rem", color: !result.addressMatch ? "#fde68a" : "#fff" }}>
                    {applicant.address}
                  </span>
                </div>

                <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Declared ID Number</span>
                  <span className="mono" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#38bdf8" }}>
                    {applicant.id_number}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Government Identity Registry */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <ShieldCheck size={16} color="#34d399" />
                <h3 style={{ fontSize: "0.9rem", color: "#6ee7b7", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  2. Official Registry Record (id_records)
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ 
                  padding: "10px 12px", 
                  background: !result.nameMatch ? "rgba(244, 63, 94, 0.15)" : "rgba(255,255,255,0.03)", 
                  borderRadius: 8,
                  border: !result.nameMatch ? "1px solid rgba(244, 63, 94, 0.4)" : "none"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Name on ID Registry</span>
                    <span style={{ fontSize: "0.75rem", color: result.nameMatch ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                      {result.nameSimilarity}% Match
                    </span>
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: !result.nameMatch ? "#fca5a5" : "#fff" }}>
                    {idRecord?.name_on_id || "Record Not Found"}
                  </span>
                </div>

                <div style={{ 
                  padding: "10px 12px", 
                  background: !result.dobMatch ? "rgba(244, 63, 94, 0.15)" : "rgba(255,255,255,0.03)", 
                  borderRadius: 8,
                  border: !result.dobMatch ? "1px solid rgba(244, 63, 94, 0.4)" : "none"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DOB on ID Registry</span>
                    <span style={{ fontSize: "0.75rem", color: result.dobMatch ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                      {result.dobMatch ? "Exact Match" : "MISMATCH"}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: !result.dobMatch ? "#fca5a5" : "#fff" }}>
                    {idRecord?.dob_on_id || "Record Not Found"}
                  </span>
                </div>

                <div style={{ 
                  padding: "10px 12px", 
                  background: !result.addressMatch ? "rgba(245, 158, 11, 0.15)" : "rgba(255,255,255,0.03)", 
                  borderRadius: 8,
                  border: !result.addressMatch ? "1px solid rgba(245, 158, 11, 0.4)" : "none"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Address on ID Registry</span>
                    <span style={{ fontSize: "0.75rem", color: result.addressMatch ? "#34d399" : "#fbbf24", fontWeight: 600 }}>
                      {result.addressSimilarity}% Match
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: !result.addressMatch ? "#fde68a" : "#fff" }}>
                    {idRecord?.address_on_id || "Record Not Found"}
                  </span>
                </div>

                <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Document Type & Format</span>
                    <span style={{ fontSize: "0.75rem", color: result.idFormatValid ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                      {result.idFormatValid ? "Regex Validated" : "Format Error"}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 600 }}>
                    {idRecord?.id_type || "Passport"} ({result.idFormatReason})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close Consistency Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
