import React, { useState } from "react";
import { X, UserPlus, Sparkles, AlertCircle, ShieldAlert } from "lucide-react";
import { validateIdFormat } from "../services/matchingEngine";

export default function ApplicantModal({ isOpen, onClose, onSubmitApplicant }) {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "1992-05-15",
    address: "",
    id_type: "Passport",
    id_number: "",
    occupation: "Software Engineer",
    annual_income: 1800000,
    country: "India",
    autoApproveSTP: true
  });

  // Simulated Registry Discrepancy (for Feature 2 demo)
  const [simulateDiscrepancy, setSimulateDiscrepancy] = useState(false);
  const [discrepancyType, setDiscrepancyType] = useState("dob"); // 'dob', 'name', 'address'

  if (!isOpen) return null;

  const handleQuickPreset = (type) => {
    if (type === "near-match") {
      setFormData({
        full_name: "Rajesh Kumar",
        dob: "1988-06-14",
        address: "Flat 402, Lotus Orchid, MG Road, Bengaluru 560001",
        id_type: "Passport",
        id_number: "P8923411",
        occupation: "Business Owner",
        annual_income: 1450000,
        country: "India",
        autoApproveSTP: false
      });
      setSimulateDiscrepancy(false);
    } else if (type === "discrepancy") {
      setFormData({
        full_name: "Sanya Mehra",
        dob: "1994-11-05",
        address: "House 12, Sector 15, Gurgaon, Haryana 122001",
        id_type: "National ID",
        id_number: "N8892110",
        occupation: "Doctor",
        annual_income: 2400000,
        country: "India",
        autoApproveSTP: false
      });
      setSimulateDiscrepancy(true);
      setDiscrepancyType("dob");
    } else if (type === "clean") {
      setFormData({
        full_name: "Ananya Iyer",
        dob: "1995-09-20",
        address: "42 Richmond Circle, Bangalore 560025",
        id_type: "Passport",
        id_number: "P4509122",
        occupation: "Chartered Accountant",
        annual_income: 1950000,
        country: "India",
        autoApproveSTP: true
      });
      setSimulateDiscrepancy(false);
    }
  };

  const idValidation = validateIdFormat(formData.id_number, formData.id_type);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.id_number) return;

    // Build matching or mismatched ID record
    let idRecord = {
      name_on_id: formData.full_name,
      dob_on_id: formData.dob,
      address_on_id: formData.address,
      id_type: formData.id_type
    };

    if (simulateDiscrepancy) {
      if (discrepancyType === "dob") {
        // Swap month/day or offset by 1 month
        idRecord.dob_on_id = "1994-12-05";
      } else if (discrepancyType === "name") {
        idRecord.name_on_id = `${formData.full_name}n`;
      } else if (discrepancyType === "address") {
        idRecord.address_on_id = `Different Block 9, Old Area, ${formData.country}`;
      }
    }

    onSubmitApplicant(formData, idRecord);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
        {/* Modal Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(99, 102, 241, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <UserPlus size={20} color="#818cf8" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", color: "#f8fafc" }}>
                Feature 1: Customer Onboarding Intake
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Capture customer identity, financial profile, and cross-validate against registry
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Demo Fast-Presets */}
        <div style={{
          padding: "12px 24px",
          background: "rgba(99, 102, 241, 0.08)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap"
        }}>
          <span style={{ fontSize: "0.775rem", fontWeight: 700, color: "#818cf8", display: "flex", alignItems: "center", gap: 4 }}>
            <Sparkles size={14} /> LIVE DEMO PRESETS:
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "4px 10px", fontSize: "0.75rem" }}
            onClick={() => handleQuickPreset("clean")}
          >
            Clean Candidate (STP)
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "4px 10px", fontSize: "0.75rem", borderColor: "rgba(244, 63, 94, 0.4)", color: "#fda4af" }}
            onClick={() => handleQuickPreset("near-match")}
          >
            Watchlist Near-Match
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "4px 10px", fontSize: "0.75rem", borderColor: "rgba(245, 158, 11, 0.4)", color: "#fde68a" }}
            onClick={() => handleQuickPreset("discrepancy")}
          >
            ID DOB Mismatch
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Full Legal Name *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Rajesh Kumar"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Date of Birth *
              </label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
              Residential Address *
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="House, Street, City, Postal Code"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Identity Document Type *
              </label>
              <select
                className="form-select"
                value={formData.id_type}
                onChange={(e) => setFormData({ ...formData, id_type: e.target.value })}
              >
                <option value="Passport">Passport (1 letter + 7-8 digits)</option>
                <option value="National ID">National ID (8-12 digits)</option>
                <option value="Driver License">Driver License (DL prefix / 8-10 chars)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                ID Number *
              </label>
              <input
                type="text"
                className="form-input mono"
                placeholder="e.g. P8923411"
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                required
              />
              {formData.id_number && (
                <div style={{ 
                  fontSize: "0.75rem", 
                  marginTop: 4, 
                  color: idValidation.isValid ? "#34d399" : "#fb7185",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}>
                  <AlertCircle size={12} />
                  <span>{idValidation.reason}</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Occupation
              </label>
              <select
                className="form-select"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Chartered Accountant">Chartered Accountant</option>
                <option value="Doctor">Doctor</option>
                <option value="Business Owner">Business Owner</option>
                <option value="University Student">University Student (High Risk Check)</option>
                <option value="Consultant">Consultant</option>
                <option value="Retail Manager">Retail Manager</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                Annual Income (INR/USD)
              </label>
              <input
                type="number"
                className="form-input mono"
                value={formData.annual_income}
                onChange={(e) => setFormData({ ...formData, annual_income: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
              Nationality / Country of Residence
            </label>
            <select
              className="form-select"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Singapore">Singapore</option>
              <option value="UAE">UAE</option>
              <option value="Russia">Russia (High-Risk Jurisdiction Check)</option>
              <option value="Iran">Iran (FATF Blacklist Check)</option>
            </select>
          </div>

          {/* Test Case Discrepancy Toggle (For Judges & Demo) */}
          <div style={{
            padding: 14,
            borderRadius: 10,
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px dashed rgba(255, 255, 255, 0.15)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldAlert size={16} color="#fbbf24" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f8fafc" }}>
                  Feature 2 Demo: Inject Government Registry Discrepancy
                </span>
              </div>
              <input
                type="checkbox"
                checked={simulateDiscrepancy}
                onChange={(e) => setSimulateDiscrepancy(e.target.checked)}
                style={{ cursor: "pointer", width: 16, height: 16 }}
              />
            </div>

            {simulateDiscrepancy && (
              <div style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>Inject Mismatch In:</span>
                <label style={{ fontSize: "0.775rem", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="disc"
                    checked={discrepancyType === "dob"}
                    onChange={() => setDiscrepancyType("dob")}
                  />
                  DOB Mismatch
                </label>
                <label style={{ fontSize: "0.775rem", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="disc"
                    checked={discrepancyType === "name"}
                    onChange={() => setDiscrepancyType("name")}
                  />
                  Name Typo
                </label>
                <label style={{ fontSize: "0.775rem", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="disc"
                    checked={discrepancyType === "address"}
                    onChange={() => setDiscrepancyType("address")}
                  />
                  Address Variance
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
              <UserPlus size={16} />
              Submit & Run KYC Screen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
