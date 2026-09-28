import React, { useState } from "react";
import { ShieldCheck, History, Filter, Download, UserCheck, AlertTriangle, Zap } from "lucide-react";

export default function AuditLogView({ auditLogs = [] }) {
  const [filterAction, setFilterAction] = useState("ALL");

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction === "ALL") return true;
    return log.action === filterAction;
  });

  const exportAuditCsv = () => {
    const headers = "log_id,timestamp,officer_name,action,applicant_id,applicant_name,reason_code,notes\n";
    const rows = filteredLogs.map(l => 
      `"${l.log_id}","${l.timestamp}","${l.officer_name}","${l.action}","${l.applicant_id}","${l.applicant_name}","${l.reason_code}","${(l.notes || '').replace(/"/g, '""')}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `aml_compliance_audit_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionBadge = (action) => {
    switch (action) {
      case "APPROVED":
        return <span className="badge badge-status-approved">APPROVED</span>;
      case "STP_AUTO_APPROVED":
        return (
          <span className="badge badge-status-approved" style={{ display: "inline-flex", gap: 4 }}>
            <Zap size={12} /> STP AUTO-APPROVED
          </span>
        );
      case "REJECTED":
        return <span className="badge badge-status-rejected">REJECTED</span>;
      case "FLAGGED_AML":
        return <span className="badge badge-high">FLAGGED AML</span>;
      case "RESCREEN_MATCH":
        return (
          <span className="badge badge-status-flagged">
            <AlertTriangle size={12} /> RESCREEN ALERT
          </span>
        );
      case "ESCALATED_EDD":
        return <span className="badge badge-med">ESCALATED EDD</span>;
      default:
        return <span className="badge">{action}</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "rgba(99, 102, 241, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <History size={20} color="#818cf8" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", color: "#f8fafc" }}>
              Feature 4: Immutable Regulatory Compliance Audit Trail
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Tamper-evident chronological log of every officer adjudication, automated STP pass, and sanctions alert
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            className="form-select"
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            style={{ width: "auto" }}
          >
            <option value="ALL">All Actions ({auditLogs.length})</option>
            <option value="APPROVED">Approved Decisions</option>
            <option value="STP_AUTO_APPROVED">STP Automated Approvals</option>
            <option value="REJECTED">Rejections</option>
            <option value="FLAGGED_AML">AML Risk Flags</option>
            <option value="RESCREEN_MATCH">Retroactive Rescreen Matches</option>
            <option value="ESCALATED_EDD">EDD Escalations</option>
          </select>

          <button className="btn btn-secondary" onClick={exportAuditCsv}>
            <Download size={14} />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Audit Table */}
      <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border-subtle)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log Ref</th>
              <th>Adjudicating Officer / System</th>
              <th>Action</th>
              <th>Target Applicant</th>
              <th>Reason Code</th>
              <th>Audit Narrative & Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.log_id}>
                  <td style={{ fontSize: "0.775rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {new Date(log.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    })}
                  </td>
                  <td className="mono" style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600 }}>
                    {log.log_id}
                  </td>
                  <td style={{ fontSize: "0.825rem", fontWeight: 600, color: "#fff" }}>
                    {log.officer_name}
                  </td>
                  <td>
                    {getActionBadge(log.action)}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#f8fafc", fontSize: "0.85rem" }}>
                      {log.applicant_name}
                    </div>
                    <span className="mono" style={{ fontSize: "0.725rem", color: "var(--text-dim)" }}>
                      {log.applicant_id}
                    </span>
                  </td>
                  <td>
                    <span className="mono" style={{
                      fontSize: "0.725rem",
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: "#cbd5e1"
                    }}>
                      {log.reason_code}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: 320 }}>
                    {log.notes}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 30, color: "var(--text-muted)" }}>
                  No audit logs recorded for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
