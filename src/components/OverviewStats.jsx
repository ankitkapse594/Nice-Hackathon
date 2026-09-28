import React from "react";
import { Users, Clock, AlertTriangle, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

export default function OverviewStats({ applicants = [], watchlist = [] }) {
  const total = applicants.length;
  const pending = applicants.filter(a => a.status === "Pending").length;
  const approved = applicants.filter(a => a.status === "Approved").length;
  const highRisk = applicants.filter(a => a.risk_level === "High" || a.status === "Flagged").length;
  const stpApproved = applicants.filter(a => a.risk_score <= 15 && a.status === "Approved").length;

  const stpRate = total > 0 ? Math.round((stpApproved / total) * 100) : 0;
  const approvedRate = total > 0 ? Math.round((approved / total) * 100) : 0;

  const stats = [
    {
      title: "Total Applicants",
      value: total,
      subtitle: `${approvedRate}% approved`,
      icon: Users,
      iconColor: "#60a5fa",
      glowColor: "rgba(96, 165, 250, 0.12)",
      borderColor: "rgba(255, 255, 255, 0.08)"
    },
    {
      title: "Pending Compliance",
      value: pending,
      subtitle: `${applicants.filter(a => a.status === "Under Review").length} in EDD review`,
      icon: Clock,
      iconColor: "#fbbf24",
      glowColor: "rgba(251, 191, 36, 0.12)",
      borderColor: pending > 0 ? "rgba(251, 191, 36, 0.3)" : "rgba(255, 255, 255, 0.08)"
    },
    {
      title: "Sanctions Alerts",
      value: highRisk,
      subtitle: `${watchlist.length} sanctions monitored`,
      icon: AlertTriangle,
      iconColor: "#f43f5e",
      glowColor: "rgba(244, 63, 94, 0.15)",
      borderColor: highRisk > 0 ? "rgba(244, 63, 94, 0.4)" : "rgba(255, 255, 255, 0.08)",
      isAlert: highRisk > 0
    },
    {
      title: "STP Auto-Pass Rate",
      value: `${stpRate}%`,
      subtitle: `${stpApproved} zero-latency approvals`,
      icon: Zap,
      iconColor: "#34d399",
      glowColor: "rgba(52, 211, 153, 0.12)",
      borderColor: "rgba(255, 255, 255, 0.08)"
    }
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 16,
      marginBottom: 24
    }}>
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx}
            className="glass-panel"
            style={{
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "rgba(15, 23, 42, 0.75)",
              border: `1px solid ${stat.borderColor}`,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Ambient Corner Glow */}
            <div style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: stat.glowColor,
              filter: "blur(25px)",
              pointerEvents: "none"
            }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>
                {stat.title}
              </span>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Icon size={20} color={stat.iconColor} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1 }}>
                {stat.value}
              </span>
              {stat.isAlert && (
                <span className="badge badge-high" style={{ animation: "pulse-border 2s infinite" }}>
                  Action Needed
                </span>
              )}
            </div>

            <p style={{ fontSize: "0.775rem", color: "var(--text-dim)", margin: 0 }}>
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
