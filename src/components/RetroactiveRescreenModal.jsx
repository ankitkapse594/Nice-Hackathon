import React, { useState } from "react";
import { X, AlertOctagon, Sparkles, ShieldAlert, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { addWatchlistEntityAndRescreen } from "../services/storageService";

export default function RetroactiveRescreenModal({ isOpen, onClose, onOpenSar }) {
  const [entityData, setEntityData] = useState({
    name: "Nikolai Sokolov",
    country: "Russia",
    category: "Sanction",
    reason: "OFAC Special Designation - Illicit Dual-Use Technology Procurement",
    alias_names: "Nikolay Sokolov, N. Sokoloff"
  });

  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleQuickPreset = (name, country, reason, aliases) => {
    setEntityData({
      name,
      country,
      category: "Sanction",
      reason,
      alias_names: aliases
    });
    setScanResult(null);
  };

  const handleExecuteScan = (e) => {
    e.preventDefault();
    if (!entityData.name) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const result = addWatchlistEntityAndRescreen(entityData);
      setIsScanning(false);
      setScanResult(result);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 740 }}>
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
              background: "rgba(244, 63, 94, 0.2)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <AlertOctagon size={22} color="#f43f5e" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: "1.2rem", color: "#f8fafc" }}>
                  Feature 5: Continuous Sanctions Monitoring & Retroactive Rescreening
                </h2>
                <span className="badge badge-high">Killer Feature</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Addresses: <em>"What happens to existing customers when a new name is added to the watchlist?"</em>
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Demo Fast Presets */}
        <div style={{
          padding: "12px 24px",
          background: "rgba(244, 63, 94, 0.08)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap"
        }}>
          <span style={{ fontSize: "0.775rem", fontWeight: 700, color: "#fda4af", display: "flex", alignItems: "center", gap: 4 }}>
            <Sparkles size={14} /> LIVE DEMO PRESETS:
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "4px 10px", fontSize: "0.75rem", borderColor: "rgba(244, 63, 94, 0.4)" }}
            onClick={() => handleQuickPreset("Nikolai Sokolov", "Russia", "OFAC Special Designation - Illicit Dual-Use Technology", "Nikolay Sokolov, N. Sokoloff")}
          >
            Target: Nikolai Sokolov (Approved Customer APP-1006)
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "4px 10px", fontSize: "0.75rem" }}
            onClick={() => handleQuickPreset("Carlos Mendoza Silva", "Colombia", "Cartel Narcotics Trafficking & Shell Operator", "Carlos Mendoza")}
          >
            Target: Carlos Mendoza
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <form onSubmit={handleExecuteScan} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                  Sanctioned Entity Legal Name *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={entityData.name}
                  onChange={(e) => setEntityData({ ...entityData, name: e.target.value })}
                  placeholder="e.g. Nikolai Sokolov"
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                  Jurisdiction / Country *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={entityData.country}
                  onChange={(e) => setEntityData({ ...entityData, country: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Regulatory Designation Reason & Enforcement Agency *
              </label>
              <input
                type="text"
                className="form-input"
                value={entityData.reason}
                onChange={(e) => setEntityData({ ...entityData, reason: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Known Aliases / Transliterations (comma-separated)
              </label>
              <input
                type="text"
                className="form-input"
                value={entityData.alias_names}
                onChange={(e) => setEntityData({ ...entityData, alias_names: e.target.value })}
                placeholder="e.g. Nikolay Sokolov, N. Sokoloff"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={isScanning}
                style={{ padding: "10px 20px" }}
              >
                <AlertOctagon size={16} />
                <span>{isScanning ? "Scanning Entire Customer Base..." : "Add to Watchlist & Trigger Batch Rescreen"}</span>
              </button>
            </div>
          </form>

          {/* Scan Results Feedback */}
          {scanResult && (
            <div style={{
              padding: 16,
              borderRadius: 12,
              background: scanResult.flaggedCount > 0 ? "rgba(225, 29, 72, 0.15)" : "rgba(16, 185, 129, 0.15)",
              border: `1px solid ${scanResult.flaggedCount > 0 ? "rgba(225, 29, 72, 0.4)" : "rgba(16, 185, 129, 0.4)"}`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              animation: "modalIn 0.2s ease"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {scanResult.flaggedCount > 0 ? (
                    <ShieldAlert size={20} color="#f43f5e" />
                  ) : (
                    <CheckCircle2 size={20} color="#34d399" />
                  )}
                  <h4 style={{ fontSize: "0.95rem", color: "#fff" }}>
                    Rescreening Complete: Scanned {scanResult.totalScreened} Total Customers
                  </h4>
                </div>
                <span className={`badge ${scanResult.flaggedCount > 0 ? "badge-high" : "badge-low"}`}>
                  {scanResult.flaggedCount} Matches Flagged
                </span>
              </div>

              {scanResult.flaggedCount > 0 ? (
                <div>
                  <p style={{ fontSize: "0.85rem", color: "#fda4af", marginBottom: 10 }}>
                    <strong>CRITICAL ACTION TAKEN:</strong> The following historical customers matched the newly added sanction and their accounts have been automatically <strong>FROZEN</strong> pending supervisory investigation.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {scanResult.flaggedCustomers.map((hit, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: "10px 14px",
                          background: "rgba(15, 23, 42, 0.8)",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          border: "1px solid rgba(244, 63, 94, 0.3)"
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: "#fff" }}>
                            {hit.applicant.full_name} ({hit.applicant.applicant_id})
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Matched against: <strong>{hit.matchedEntity.name}</strong> ({hit.similarity}% similarity)
                          </div>
                        </div>

                        <button
                          className="btn"
                          style={{
                            padding: "6px 12px",
                            fontSize: "0.775rem",
                            background: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
                            color: "#fff"
                          }}
                          onClick={() => {
                            onClose();
                            onOpenSar(hit.applicant, hit);
                          }}
                        >
                          <FileText size={14} />
                          <span>1-Click SAR Report</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "#a7f3d0" }}>
                  All {scanResult.totalScreened} historical customers were screened against '{scanResult.newEntity.name}'. Zero matches detected. All customer accounts remain in good standing.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
