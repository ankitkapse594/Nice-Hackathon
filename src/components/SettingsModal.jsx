import React, { useState } from "react";
import { X, Database, CheckCircle, RotateCcw, Shield, ExternalLink, Info } from "lucide-react";
import { saveSupabaseConfig, isSupabaseConfigured } from "../services/supabaseClient";

export default function SettingsModal({ isOpen, onClose, onResetData }) {
  const [url, setUrl] = useState(localStorage.getItem("kyc_supabase_url") || "");
  const [key, setKey] = useState(localStorage.getItem("kyc_supabase_key") || "");
  const [savedMessage, setSavedMessage] = useState(false);
  const isConnected = isSupabaseConfigured();

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveSupabaseConfig(url, key);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
        {/* Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Database size={20} color="#38bdf8" />
            <h2 style={{ fontSize: "1.15rem", color: "#f8fafc" }}>
              System Configuration & Hackathon Info
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Dual Persistence Status Alert */}
          <div style={{
            padding: 16,
            borderRadius: 10,
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
                Data Persistence Mode
              </span>
              <span className={`badge ${isConnected ? "badge-low" : "badge-status-pending"}`}>
                {isConnected ? "Supabase Cloud Active" : "Local In-Memory Engine (Offline Safe)"}
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              The portal features an autonomous dual-engine architecture. It defaults to an ultra-fast in-memory and local storage layer pre-seeded with 100 applicants and 30 watchlist targets so live hackathon demos never fail if Wi-Fi drops.
            </p>
          </div>

          {/* Supabase Cloud Connect Form */}
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ fontSize: "0.9rem", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Connect Supabase PostgreSQL (Optional)
            </h3>
            <div>
              <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 4 }}>
                Supabase Project URL
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="https://xyzcompany.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 4 }}>
                Supabase Anon Public API Key
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
              {savedMessage ? (
                <span style={{ color: "#34d399", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={14} /> Credentials Saved!
                </span>
              ) : <div />}
              <button type="submit" className="btn btn-primary" style={{ padding: "6px 16px" }}>
                Save Configuration
              </button>
            </div>
          </form>

          {/* Team Feature Ownership Guide for Mentors & Judges */}
          <div style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10
          }}>
            <h3 style={{ fontSize: "0.9rem", color: "#f8fafc", display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={16} color="#818cf8" />
              <span>Judging Guide — Feature Ownership</span>
            </h3>

            <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 6 }}>
              <div><strong>Feature 1 — Ankit Kapse:</strong> Customer Intake modal & 100-record applicant table with filtering.</div>
              <div><strong>Feature 2 — Shruti Khadatkar:</strong> Side-by-side ID registry comparison & regex ID format validator.</div>
              <div><strong>Feature 3 — Yash Bharambe:</strong> Fuzzy Watchlist matching (Levenshtein + Soundex) & multi-factor risk scoring.</div>
              <div><strong>Feature 4 — Divyani Katre:</strong> Compliance officer decision queue & tamper-evident audit logs.</div>
              <div><strong>Feature 5 — Anurag Pathak (Killer Feature):</strong> Continuous Watchlist Monitoring, Retroactive Rescreening & 1-Click SAR generator.</div>
            </div>
          </div>

          {/* Seed Data Reset */}
          <div style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", display: "block" }}>
                Reset Synthetic Demo Data
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Restores original 100 applicants and 30 sanctions targets.
              </span>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                onResetData();
                onClose();
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
