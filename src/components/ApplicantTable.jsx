import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Download
} from "lucide-react";

export default function ApplicantTable({ 
  applicants = [], 
  onOpenConsistency, 
  onOpenWatchlist, 
  onOpenSar,
  onOpenDecision 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Filter logic
  const filtered = applicants.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    const matchesRisk = riskFilter === "ALL" || app.risk_level === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportCsv = () => {
    const headers = "applicant_id,full_name,dob,address,id_number,occupation,annual_income,country,status,risk_level,risk_score\n";
    const rows = filtered.map(a => 
      `"${a.applicant_id}","${a.full_name}","${a.dob}","${a.address}","${a.id_number}","${a.occupation}",${a.annual_income},"${a.country}","${a.status}","${a.risk_level}",${a.risk_score}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kyc_applicants_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Table Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12
      }}>
        {/* Search */}
        <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 420 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, ID number, applicant ref, or country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ paddingLeft: 36 }}
          />
        </div>

        {/* Filters & Export */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <select 
            className="form-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{ width: "auto" }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Flagged">Flagged</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select 
            className="form-select"
            value={riskFilter}
            onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }}
            style={{ width: "auto" }}
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          <button 
            className="btn btn-secondary"
            onClick={exportCsv}
            title="Export filtered records to CSV"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border-subtle)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Ref ID</th>
              <th>Applicant Name</th>
              <th>DOB / Age</th>
              <th>ID Number</th>
              <th>Occupation & Income</th>
              <th>Country</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Surveillance Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((app) => (
                <tr key={app.applicant_id}>
                  <td className="mono" style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600 }}>
                    {app.applicant_id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#f8fafc" }}>{app.full_name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {app.address}
                    </div>
                  </td>
                  <td style={{ fontSize: "0.825rem", color: "var(--text-main)" }}>
                    {app.dob}
                  </td>
                  <td>
                    <span className="mono" style={{ fontSize: "0.825rem", color: "#93c5fd" }}>
                      {app.id_number}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: "0.825rem", color: "#e2e8f0" }}>{app.occupation}</div>
                    <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      INR {Number(app.annual_income).toLocaleString()}
                    </div>
                  </td>
                  <td style={{ fontSize: "0.825rem" }}>
                    {app.country}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className={`badge ${
                        app.risk_level === "High" ? "badge-high" :
                        app.risk_level === "Medium" ? "badge-med" : "badge-low"
                      }`}>
                        {app.risk_level} ({app.risk_score || 0})
                      </span>
                    </div>
                  </td>
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
                  <td>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                        onClick={() => onOpenConsistency(app)}
                        title="Feature 2: Compare Form with Registry ID"
                      >
                        ID Match
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                        onClick={() => onOpenWatchlist(app)}
                        title="Feature 3: View Watchlist Fuzzy Match"
                      >
                        Watchlist
                      </button>
                      {(app.risk_level === "High" || app.status === "Flagged") && (
                        <button
                          className="btn"
                          style={{
                            padding: "4px 8px",
                            fontSize: "0.75rem",
                            background: "rgba(244, 63, 94, 0.2)",
                            border: "1px solid rgba(244, 63, 94, 0.4)",
                            color: "#fda4af"
                          }}
                          onClick={() => onOpenSar(app)}
                          title="Feature 5: Generate SAR Filing"
                        >
                          SAR
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 30, color: "var(--text-muted)" }}>
                  No applicant records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        paddingTop: 4
      }}>
        <span>
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} applicants
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            className="btn btn-secondary"
            style={{ padding: "4px 8px" }}
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontWeight: 600, color: "#fff" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            style={{ padding: "4px 8px" }}
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
