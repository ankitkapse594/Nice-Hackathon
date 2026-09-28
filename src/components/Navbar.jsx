import React, { useState } from "react";
import { 
  ShieldCheck, 
  UserPlus, 
  AlertOctagon, 
  Zap, 
  RotateCcw, 
  Settings, 
  Database,
  CheckCircle2
} from "lucide-react";
import { isSupabaseConfigured } from "../services/supabaseClient";

export default function Navbar({ 
  onOpenNewApplicant, 
  onOpenRescreen, 
  onOpenSettings, 
  onRunStp, 
  onResetData,
  stpCount = 0 
}) {
  const [stpLoading, setStpLoading] = useState(false);
  const [stpMessage, setStpMessage] = useState(null);
  const hasSupabase = isSupabaseConfigured();

  const handleStpClick = () => {
    setStpLoading(true);
    setTimeout(() => {
      const count = onRunStp();
      setStpLoading(false);
      setStpMessage(`Instant STP: ${count} clean applicants auto-approved!`);
      setTimeout(() => setStpMessage(null), 4000);
    }, 400);
  };

  return (
    <header style={{
      borderBottom: "1px solid var(--border-subtle)",
      background: "rgba(9, 13, 22, 0.85)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "14px 24px"
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)"
          }}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>
                NICE AML & KYC
              </h1>
              <span style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                background: "rgba(99, 102, 241, 0.2)",
                color: "#818cf8",
                padding: "2px 8px",
                borderRadius: 6,
                fontWeight: 700,
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}>
                v2.4 Enterprise
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Autonomous Onboarding & Sanctions Surveillance Engine
            </p>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Feature 5 Killer Feature Trigger */}
          <button 
            className="btn"
            onClick={onOpenRescreen}
            style={{
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(225, 29, 72, 0.3) 100%)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              color: "#fda4af"
            }}
            title="Add a new sanction and automatically rescreen all existing approved customers"
          >
            <AlertOctagon size={16} color="#f43f5e" />
            <span>Add Sanction & Rescreen (Feature 5)</span>
          </button>

          {/* Bonus STP Fast Track */}
          <button 
            className="btn btn-success"
            onClick={handleStpClick}
            disabled={stpLoading}
            title="Auto-approve all low-risk applicants with 100% ID consistency"
          >
            <Zap size={16} />
            <span>Fast-Track STP</span>
            {stpCount > 0 && (
              <span style={{
                background: "rgba(255, 255, 255, 0.25)",
                padding: "1px 6px",
                borderRadius: 10,
                fontSize: "0.75rem",
                marginLeft: 4
              }}>
                {stpCount}
              </span>
            )}
          </button>

          {/* Feature 1 Intake Form */}
          <button 
            className="btn btn-primary"
            onClick={onOpenNewApplicant}
          >
            <UserPlus size={16} />
            <span>+ New Applicant</span>
          </button>

          {/* Seed Data Reset */}
          <button 
            className="btn btn-secondary"
            onClick={onResetData}
            title="Reset to 100 Synthetic Applicants & 30 Watchlist Targets"
          >
            <RotateCcw size={16} />
            <span>Reset Demo Data</span>
          </button>

          {/* Supabase Status & Settings */}
          <button 
            className="btn btn-secondary"
            onClick={onOpenSettings}
            style={{ padding: "8px 12px" }}
            title="Configure Supabase Cloud & View System Settings"
          >
            <Database size={16} color={hasSupabase ? "#34d399" : "#94a3b8"} />
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* STP Toast Feedback */}
      {stpMessage && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#065f46",
          border: "1px solid #10b981",
          color: "#ecfdf5",
          padding: "12px 20px",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          zIndex: 9999,
          animation: "modalIn 0.2s ease"
        }}>
          <CheckCircle2 size={20} color="#34d399" />
          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{stpMessage}</span>
        </div>
      )}
    </header>
  );
}
