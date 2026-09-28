import React, { useState } from "react";
import { X, ShieldCheck, Lock, User, Key, ArrowRight, ShieldAlert, Sparkles, Building2 } from "lucide-react";

export const DEMO_USERS = [
  {
    name: "Ankit Kapse",
    role: "Lead Compliance Architect (Feature 1)",
    roleId: "ANKIT_KAPSE",
    email: "ankit.kapse@nicebank.com",
    avatar: "AK",
    badgeColor: "#34d399",
    description: "Customer ingestion, data pipeline orchestration, and system administration."
  },
  {
    name: "Shruti Khadatkar",
    role: "Senior Identity Verification Engineer (Feature 2)",
    roleId: "SHRUTI_KHADATKAR",
    email: "shruti.khadatkar@nicebank.com",
    avatar: "SK",
    badgeColor: "#60a5fa",
    description: "Registry cross-referencing, DOB variance detection, and ID regex validation."
  },
  {
    name: "Yash Bharambe",
    role: "AML Surveillance & Algorithms Lead (Feature 3)",
    roleId: "YASH_BHARAMBE",
    email: "yash.bharambe@nicebank.com",
    avatar: "YB",
    badgeColor: "#818cf8",
    description: "Levenshtein dynamic matrix, Soundex phonetic encoding, and risk tier evaluation."
  },
  {
    name: "Divyani Katre",
    role: "Adjudication & Audit Director (Feature 4)",
    roleId: "DIVYANI_KATRE",
    email: "divyani.katre@nicebank.com",
    avatar: "DK",
    badgeColor: "#f59e0b",
    description: "Compliance decisioning queues, regulatory reason codes, and immutable audit logs."
  },
  {
    name: "Anurag Pathak",
    role: "Sanctions Intelligence & SAR Lead (Feature 5)",
    roleId: "ANURAG_PATHAK",
    email: "anurag.pathak@nicebank.com",
    avatar: "AP",
    badgeColor: "#f43f5e",
    description: "Continuous sanctions monitoring, retroactive customer sweeps, and SAR generation."
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("CHIEF_COMPLIANCE_OFFICER");

  if (!isOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    const demo = DEMO_USERS.find(u => u.roleId === selectedRole) || DEMO_USERS[0];
    onLoginSuccess({
      name: demo.name,
      role: demo.role,
      roleId: demo.roleId,
      email: email || demo.email,
      avatar: demo.avatar,
      badgeColor: demo.badgeColor
    });
    onClose();
  };

  const handleQuickLogin = (user) => {
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 580, overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{
          padding: "24px 28px 18px",
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
          borderBottom: "1px solid var(--border-subtle)",
          position: "relative"
        }}>
          <button 
            onClick={onClose}
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #4f46e5 0%, #38bdf8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
            }}>
              <Lock size={22} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", color: "#f8fafc" }}>
                Enterprise Compliance Terminal
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Role-Based Authentication Gate • Banking Security Level 4
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Quick Demo 1-Click Login Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <Sparkles size={15} color="#818cf8" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Judges & Live Demo 1-Click Access
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DEMO_USERS.map((user) => (
                <div
                  key={user.roleId}
                  onClick={() => handleQuickLogin(user)}
                  className="card-3d"
                  style={{
                    padding: "12px 16px",
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      border: `1px solid ${user.badgeColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: user.badgeColor
                    }}>
                      {user.avatar}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 600, color: "#f8fafc", fontSize: "0.9rem" }}>
                          {user.name}
                        </span>
                        <span style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "1px 7px",
                          borderRadius: 9999,
                          background: `${user.badgeColor}20`,
                          color: user.badgeColor,
                          border: `1px solid ${user.badgeColor}40`
                        }}>
                          {user.role}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                        {user.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight size={16} color="var(--text-dim)" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase" }}>Or Enter Credentials</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
          </div>

          {/* Standard Form */}
          <form onSubmit={handleCustomLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 4 }}>
                Corporate Banking Email
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} color="var(--text-dim)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="officer.name@nicebank.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 36 }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.775rem", color: "var(--text-muted)", marginBottom: 4 }}>
                Security Token / Password
              </label>
              <div style={{ position: "relative" }}>
                <Key size={15} color="var(--text-dim)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 36 }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "10px", marginTop: 4 }}>
              <Lock size={15} />
              <span>Authenticate & Enter Terminal</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
