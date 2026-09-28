import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import OverviewStats from "./components/OverviewStats";
import ApplicantTable from "./components/ApplicantTable";
import ComplianceDashboard from "./components/ComplianceDashboard";
import AuditLogView from "./components/AuditLogView";
import ApplicantModal from "./components/ApplicantModal";
import ConsistencyCheckModal from "./components/ConsistencyCheckModal";
import WatchlistScreeningModal from "./components/WatchlistScreeningModal";
import RetroactiveRescreenModal from "./components/RetroactiveRescreenModal";
import SARReportModal from "./components/SARReportModal";
import SettingsModal from "./components/SettingsModal";
import BusinessRoiModal from "./components/BusinessRoiModal";
import CodeExplainerModal from "./components/CodeExplainerModal";

import { 
  initializeStorage, 
  subscribeToData, 
  getApplicants, 
  getIdRecords, 
  getWatchlist, 
  getAuditLogs, 
  addApplicant, 
  resetToInitialData,
  runStpBatchApproval 
} from "./services/storageService";

import { 
  Users, 
  ShieldCheck, 
  History, 
  AlertOctagon, 
  Search, 
  Globe2,
  FileText
} from "lucide-react";

import LandingPage from "./components/LandingPage";
import LoginModal, { DEMO_USERS } from "./components/LoginModal";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kyc_active_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeMainTab, setActiveMainTab] = useState("applicants"); // 'applicants', 'adjudication', 'audit', 'watchlist'

  // Application Data State
  const [applicants, setApplicants] = useState([]);
  const [idRecords, setIdRecords] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);
  const [isRescreenModalOpen, setIsRescreenModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);
  const [isCodeExplainerOpen, setIsCodeExplainerOpen] = useState(false);

  // Inspector Modals
  const [selectedApplicantForConsistency, setSelectedApplicantForConsistency] = useState(null);
  const [selectedApplicantForWatchlist, setSelectedApplicantForWatchlist] = useState(null);
  const [sarModalData, setSarModalData] = useState({ isOpen: false, applicant: null, match: null });

  // Watchlist Search in UI
  const [watchlistSearch, setWatchlistSearch] = useState("");

  const refreshState = () => {
    setApplicants(getApplicants());
    setIdRecords(getIdRecords());
    setWatchlist(getWatchlist());
    setAuditLogs(getAuditLogs());
  };

  useEffect(() => {
    initializeStorage();
    refreshState();
    const unsubscribe = subscribeToData(refreshState);
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleCreateApplicant = (formData, idData) => {
    addApplicant(formData, idData);
  };

  const handleOpenConsistency = (applicant) => {
    setSelectedApplicantForConsistency(applicant);
  };

  const handleOpenWatchlist = (applicant) => {
    setSelectedApplicantForWatchlist(applicant);
  };

  const handleOpenSar = (applicant, match = null) => {
    setSarModalData({ isOpen: true, applicant, match });
  };

  const eligibleStpCount = applicants.filter(a => a.status === "Pending" && a.risk_score <= 15).length;

  // Filtered Watchlist tab
  const filteredWatchlist = watchlist.filter(w => 
    w.name.toLowerCase().includes(watchlistSearch.toLowerCase()) ||
    w.country.toLowerCase().includes(watchlistSearch.toLowerCase()) ||
    w.reason.toLowerCase().includes(watchlistSearch.toLowerCase()) ||
    (w.alias_names && w.alias_names.some(al => al.toLowerCase().includes(watchlistSearch.toLowerCase())))
  );

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("kyc_active_user", JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("kyc_active_user");
  };

  if (!currentUser) {
    return (
      <>
        <LandingPage
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onEnterDemo={() => handleLoginSuccess(DEMO_USERS[0])}
          onOpenRoi={() => setIsRoiModalOpen(true)}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <BusinessRoiModal
          isOpen={isRoiModalOpen}
          onClose={() => setIsRoiModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenNewApplicant={() => setIsApplicantModalOpen(true)}
        onOpenRescreen={() => setIsRescreenModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRoi={() => setIsRoiModalOpen(true)}
        onOpenCodeExplainer={() => setIsCodeExplainerOpen(true)}
        onRunStp={() => runStpBatchApproval(currentUser?.name || "Lead Compliance Officer")}
        onResetData={resetToInitialData}
        stpCount={eligibleStpCount}
      />

      {/* Main Container */}
      <main style={{ maxWidth: 1400, margin: "0 auto", width: "100%", padding: "24px 24px 60px", flex: 1 }}>
        {/* Overview Stats Top Bar */}
        <OverviewStats applicants={applicants} watchlist={watchlist} />

        {/* Primary Navigation Tabs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: 14,
          marginBottom: 20,
          overflowX: "auto"
        }}>
          <button
            onClick={() => setActiveMainTab("applicants")}
            style={{
              background: activeMainTab === "applicants" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: activeMainTab === "applicants" ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
              color: activeMainTab === "applicants" ? "#818cf8" : "var(--text-muted)",
              padding: "10px 18px",
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.15s ease"
            }}
          >
            <Users size={18} />
            <span>Applicant Intake & Directory (Feature 1 & 2)</span>
            <span style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 7px",
              borderRadius: 10,
              fontSize: "0.75rem"
            }}>
              {applicants.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab("adjudication")}
            style={{
              background: activeMainTab === "adjudication" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: activeMainTab === "adjudication" ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
              color: activeMainTab === "adjudication" ? "#818cf8" : "var(--text-muted)",
              padding: "10px 18px",
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.15s ease"
            }}
          >
            <ShieldCheck size={18} />
            <span>Compliance Adjudication Center (Feature 4)</span>
            <span style={{
              background: applicants.filter(a => a.status === "Pending").length > 0 ? "#38bdf8" : "rgba(255,255,255,0.08)",
              color: applicants.filter(a => a.status === "Pending").length > 0 ? "#000" : "var(--text-muted)",
              fontWeight: 700,
              padding: "1px 7px",
              borderRadius: 10,
              fontSize: "0.75rem"
            }}>
              {applicants.filter(a => a.status === "Pending").length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab("watchlist")}
            style={{
              background: activeMainTab === "watchlist" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: activeMainTab === "watchlist" ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
              color: activeMainTab === "watchlist" ? "#818cf8" : "var(--text-muted)",
              padding: "10px 18px",
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.15s ease"
            }}
          >
            <Globe2 size={18} />
            <span>Global Watchlist & Sanctions (Feature 3)</span>
            <span style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 7px",
              borderRadius: 10,
              fontSize: "0.75rem"
            }}>
              {watchlist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveMainTab("audit")}
            style={{
              background: activeMainTab === "audit" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: activeMainTab === "audit" ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
              color: activeMainTab === "audit" ? "#818cf8" : "var(--text-muted)",
              padding: "10px 18px",
              borderRadius: 8,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.15s ease"
            }}
          >
            <History size={18} />
            <span>Regulatory Audit Trail (Feature 4)</span>
            <span style={{
              background: "rgba(255,255,255,0.08)",
              padding: "1px 7px",
              borderRadius: 10,
              fontSize: "0.75rem"
            }}>
              {auditLogs.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Applicant Intake & Directory (Feature 1 & 2) */}
        {activeMainTab === "applicants" && (
          <ApplicantTable
            applicants={applicants}
            onOpenConsistency={handleOpenConsistency}
            onOpenWatchlist={handleOpenWatchlist}
            onOpenSar={(app) => handleOpenSar(app)}
          />
        )}

        {/* Tab 2: Compliance Adjudication Center (Feature 4) */}
        {activeMainTab === "adjudication" && (
          <ComplianceDashboard
            applicants={applicants}
            onOpenConsistency={handleOpenConsistency}
            onOpenWatchlist={handleOpenWatchlist}
            onOpenSar={(app) => handleOpenSar(app)}
          />
        )}

        {/* Tab 3: Global Watchlist Registry (Feature 3) */}
        {activeMainTab === "watchlist" && (
          <div className="glass-panel" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div style={{ position: "relative", minWidth: 280, maxWidth: 400 }}>
                <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search sanctions, aliases, countries..."
                  value={watchlistSearch}
                  onChange={(e) => setWatchlistSearch(e.target.value)}
                  style={{ paddingLeft: 36 }}
                />
              </div>

              <button
                className="btn"
                onClick={() => setIsRescreenModalOpen(true)}
                style={{
                  background: "linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(225, 29, 72, 0.3) 100%)",
                  border: "1px solid rgba(244, 63, 94, 0.4)",
                  color: "#fda4af"
                }}
              >
                <AlertOctagon size={16} color="#f43f5e" />
                <span>Add New Sanction & Trigger Continuous Rescreen (Feature 5)</span>
              </button>
            </div>

            <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--border-subtle)" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Sanctioned Entity Name</th>
                    <th>Country / Jurisdiction</th>
                    <th>Classification</th>
                    <th>Known Aliases / Transliterations</th>
                    <th>Regulatory Designation Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWatchlist.map((target) => (
                    <tr key={target.watchlist_id}>
                      <td className="mono" style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600 }}>
                        {target.watchlist_id}
                      </td>
                      <td style={{ fontWeight: 700, color: "#fff" }}>
                        {target.name}
                      </td>
                      <td>{target.country}</td>
                      <td>
                        <span className="badge badge-high" style={{ fontSize: "0.72rem" }}>
                          {target.category || "Sanction"}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#93c5fd" }}>
                        {target.alias_names && target.alias_names.length > 0 
                          ? target.alias_names.join(", ") 
                          : "None"}
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: 350 }}>
                        {target.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Regulatory Audit Trail (Feature 4) */}
        {activeMainTab === "audit" && (
          <AuditLogView auditLogs={auditLogs} />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "rgba(9, 13, 22, 0.8)",
        padding: "16px 24px",
        textAlign: "center",
        fontSize: "0.8rem",
        color: "var(--text-dim)"
      }}>
        Nice Software Solutions — Innovation Hackathon | Use Case 3: Banking (KYC & AML Onboarding Checker) | Ready for Local Demo & Presentation
      </footer>

      {/* Modals */}
      <ApplicantModal
        isOpen={isApplicantModalOpen}
        onClose={() => setIsApplicantModalOpen(false)}
        onSubmitApplicant={handleCreateApplicant}
      />

      <ConsistencyCheckModal
        isOpen={Boolean(selectedApplicantForConsistency)}
        onClose={() => setSelectedApplicantForConsistency(null)}
        applicant={selectedApplicantForConsistency}
        idRecord={selectedApplicantForConsistency ? idRecords.find(r => r.applicant_id === selectedApplicantForConsistency.applicant_id) : null}
      />

      <WatchlistScreeningModal
        isOpen={Boolean(selectedApplicantForWatchlist)}
        onClose={() => setSelectedApplicantForWatchlist(null)}
        applicant={selectedApplicantForWatchlist}
        watchlist={watchlist}
        onOpenSar={(app, match) => handleOpenSar(app, match)}
      />

      <RetroactiveRescreenModal
        isOpen={isRescreenModalOpen}
        onClose={() => setIsRescreenModalOpen(false)}
        onOpenSar={(app, match) => handleOpenSar(app, match)}
      />

      <SARReportModal
        isOpen={sarModalData.isOpen}
        onClose={() => setSarModalData({ isOpen: false, applicant: null, match: null })}
        applicant={sarModalData.applicant}
        watchlistMatch={sarModalData.match}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetData={resetToInitialData}
      />

      <BusinessRoiModal
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
      />

      <CodeExplainerModal
        isOpen={isCodeExplainerOpen}
        onClose={() => setIsCodeExplainerOpen(false)}
      />
    </div>
  );
}
