import React from "react";
import { X, Printer, ShieldAlert, Download, FileCheck, Building2 } from "lucide-react";
import { generateSarReport } from "../services/sarService";
import { getIdRecords, getAuditLogs } from "../services/storageService";

export default function SARReportModal({ isOpen, onClose, applicant, watchlistMatch = null }) {
  if (!isOpen || !applicant) return null;

  const idRecords = getIdRecords();
  const idRecord = idRecords.find(r => r.applicant_id === applicant.applicant_id);
  const auditLogs = getAuditLogs();

  const report = generateSarReport(applicant, idRecord, watchlistMatch, auditLogs);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 900, background: "#0b1120" }}
      >
        {/* Header Bar */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15, 23, 42, 0.9)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldAlert size={20} color="#f43f5e" />
            <div>
              <h2 style={{ fontSize: "1.05rem", color: "#f8fafc" }}>
                Official Suspicious Activity Report (SAR-101)
              </h2>
              <span className="mono" style={{ fontSize: "0.75rem", color: "#38bdf8" }}>
                Filing Reference: {report.filingId}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="btn btn-primary" onClick={handlePrint} style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Formal Document */}
        <div style={{ padding: "28px 36px", display: "flex", flexDirection: "column", gap: 24, color: "#f1f5f9" }}>
          {/* Formal Institution Header */}
          <div style={{
            borderBottom: "2px solid rgba(255,255,255,0.15)",
            paddingBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Building2 size={24} color="#60a5fa" />
                <h1 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "0.02em" }}>
                  {report.institution.name}
                </h1>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
                {report.institution.branch} | FIU Registration: <span className="mono" style={{ color: "#93c5fd" }}>{report.institution.fiuReference}</span>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={{
                background: "rgba(225, 29, 72, 0.2)",
                color: "#fda4af",
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "1px solid rgba(225, 29, 72, 0.4)",
                textTransform: "uppercase"
              }}>
                CONFIDENTIAL REGULATORY FILING
              </span>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: 6 }}>
                Filing Date: {report.filingDate}
              </div>
            </div>
          </div>

          {/* Part 1: Subject Information */}
          <div>
            <h3 style={{ fontSize: "0.95rem", color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
              Part I — Subject Information (Customer Under Surveillance)
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              background: "rgba(15, 23, 42, 0.7)",
              padding: 16,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)"
            }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Full Legal Name</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>{report.subject.full_name}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Applicant Ref ID</span>
                <span className="mono" style={{ color: "#38bdf8" }}>{report.subject.applicant_id}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Date of Birth</span>
                <span>{report.subject.dob}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Government ID Number</span>
                <span className="mono">{report.subject.id_number}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Occupation</span>
                <span>{report.subject.occupation}</span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Declared Annual Income</span>
                <span className="mono">INR {Number(report.subject.annual_income).toLocaleString()}</span>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Residential Address</span>
                <span>{report.subject.address} ({report.subject.country})</span>
              </div>
            </div>
          </div>

          {/* Part 2: Discrepancy Matrix */}
          <div>
            <h3 style={{ fontSize: "0.95rem", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
              Part II — Algorithmic Risk Rating & Identity Discrepancy Matrix
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              background: "rgba(15, 23, 42, 0.7)",
              padding: 16,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)"
            }}>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Assessed AML Risk Tier</span>
                <span className="badge badge-high" style={{ marginTop: 4 }}>
                  {report.riskLevel} Risk (Score: {report.riskScore}/100)
                </span>
              </div>
              <div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>Official Registry Status</span>
                <span style={{ fontSize: "0.85rem", color: report.registryRecord ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                  {report.registryRecord ? "Government Registry Record Linked" : "No Registry Record"}
                </span>
              </div>
              {report.registryRecord && (
                <div style={{ gridColumn: "1 / -1", fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)", paddingTop: 8 }}>
                  Registry Name: <strong>{report.registryRecord.name_on_id}</strong> | Registry DOB: <strong>{report.registryRecord.dob_on_id}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Part 3: Regulatory Narrative */}
          <div>
            <h3 style={{ fontSize: "0.95rem", color: "#f43f5e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
              Part III — Suspicious Activity Narrative & Legal Declaration
            </h3>
            <div style={{
              background: "rgba(15, 23, 42, 0.9)",
              padding: 20,
              borderRadius: 8,
              border: "1px solid rgba(244, 63, 94, 0.3)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
              color: "#e2e8f0"
            }}>
              {report.narrative}
            </div>
          </div>

          {/* Signatures Footer */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 16
          }}>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Principal Compliance Officer Sign-off:</span>
              <div style={{ borderBottom: "1px dotted #64748b", height: 28, marginTop: 4 }} />
              <span style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>Officer Vikram Mehta (Chief AML Compliance Officer)</span>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Audit Timestamp Verification:</span>
              <div style={{ borderBottom: "1px dotted #64748b", height: 28, marginTop: 4 }} />
              <span className="mono" style={{ fontSize: "0.75rem", color: "#38bdf8" }}>{new Date().toISOString()} (Automated Verification Hash: 9f8a2c41)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
