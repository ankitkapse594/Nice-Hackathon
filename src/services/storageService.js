// Central Storage and Orchestration Service
// Synchronizes local in-memory/localStorage with dual support for Supabase and live broadcast events.

import { generateSeedData, initialWatchlist, initialAuditLogs } from "../data/syntheticData";
import { runConsistencyCheck, screenAgainstWatchlist, evaluateRiskRating } from "./matchingEngine";
import { getSupabaseClient, isSupabaseConfigured } from "./supabaseClient";

const STORAGE_KEYS = {
  APPLICANTS: "kyc_applicants_v1",
  ID_RECORDS: "kyc_id_records_v1",
  WATCHLIST: "kyc_watchlist_v1",
  AUDIT_LOGS: "kyc_audit_logs_v1"
};

const subscribers = new Set();
export const subscribeToData = (callback) => {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
};

const notifySubscribers = () => {
  subscribers.forEach(cb => {
    try {
      cb();
    } catch (e) {
      console.error("Subscriber notification error", e);
    }
  });
};

// Initialize Storage with Seed Data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.APPLICANTS)) {
    resetToInitialData();
  }
};

export const resetToInitialData = () => {
  const { applicants, idRecords } = generateSeedData();
  localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  localStorage.setItem(STORAGE_KEYS.ID_RECORDS, JSON.stringify(idRecords));
  localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(initialWatchlist));
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
  notifySubscribers();
};

export const getApplicants = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getIdRecords = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ID_RECORDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getWatchlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getAuditLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Feature 1: Add Applicant with Automated Feature 2 (Consistency) and Feature 3 (Watchlist) Assessment
export const addApplicant = (formData, idData = null) => {
  const applicants = getApplicants();
  const idRecords = getIdRecords();
  const watchlist = getWatchlist();

  const applicantId = `APP-${1000 + applicants.length + 1}`;

  const applicantRecord = {
    applicant_id: applicantId,
    full_name: formData.full_name.trim(),
    dob: formData.dob,
    address: formData.address.trim(),
    id_number: formData.id_number.trim().toUpperCase(),
    occupation: formData.occupation,
    annual_income: Number(formData.annual_income) || 0,
    country: formData.country,
    status: "Pending",
    created_at: new Date().toISOString()
  };

  const idRecord = idData ? {
    applicant_id: applicantId,
    name_on_id: idData.name_on_id?.trim() || applicantRecord.full_name,
    dob_on_id: idData.dob_on_id || applicantRecord.dob,
    address_on_id: idData.address_on_id?.trim() || applicantRecord.address,
    id_type: idData.id_type || "Passport",
    id_format_valid: true
  } : {
    applicant_id: applicantId,
    name_on_id: applicantRecord.full_name,
    dob_on_id: applicantRecord.dob,
    address_on_id: applicantRecord.address,
    id_type: "Passport",
    id_format_valid: true
  };

  // Run Consistency Check (Feature 2)
  const consistencyResult = runConsistencyCheck(applicantRecord, idRecord);
  idRecord.id_format_valid = consistencyResult.idFormatValid;

  // Run Watchlist Screening (Feature 3)
  const watchlistResult = screenAgainstWatchlist(applicantRecord, watchlist);

  // Evaluate Multi-factor Risk
  const riskEval = evaluateRiskRating(applicantRecord, consistencyResult, watchlistResult);

  applicantRecord.risk_level = riskEval.riskLevel;
  applicantRecord.risk_score = riskEval.riskScore;
  applicantRecord.risk_reasons = riskEval.riskReasons;
  applicantRecord.is_stp_eligible = riskEval.isStpEligible;

  // Automatic Straight-Through Processing if completely clean
  if (riskEval.isStpEligible && formData.autoApproveSTP) {
    applicantRecord.status = "Approved";
    addAuditLog({
      applicant_id: applicantId,
      applicant_name: applicantRecord.full_name,
      action: "STP_AUTO_APPROVED",
      officer_name: "System STP Engine",
      reason_code: "CLEAN_RECORD_FAST_TRACK",
      notes: "Automatic STP approval granted. 0% Watchlist match score, 100% ID consistency."
    });
  }

  applicants.unshift(applicantRecord);
  idRecords.unshift(idRecord);

  localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  localStorage.setItem(STORAGE_KEYS.ID_RECORDS, JSON.stringify(idRecords));

  notifySubscribers();
  return { applicant: applicantRecord, idRecord, consistencyResult, watchlistResult, riskEval };
};

// Feature 4: Compliance Officer Decision Workflow
export const updateApplicantDecision = (applicantId, status, officerName = "Compliance Officer", reasonCode = "OFFICER_REVIEW", notes = "") => {
  const applicants = getApplicants();
  const applicant = applicants.find(a => a.applicant_id === applicantId);
  if (!applicant) return false;

  const previousStatus = applicant.status;
  applicant.status = status;

  localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));

  // Log to Audit Trail
  addAuditLog({
    applicant_id: applicantId,
    applicant_name: applicant.full_name,
    action: status === "Approved" ? "APPROVED" : status === "Rejected" ? "REJECTED" : "FLAGGED_AML",
    officer_name: officerName,
    reason_code: reasonCode,
    notes: notes || `Status changed from ${previousStatus} to ${status}.`
  });

  notifySubscribers();
  return true;
};

// Feature 4: Audit Logging
export const addAuditLog = ({ applicant_id, applicant_name, action, officer_name, reason_code, notes }) => {
  const logs = getAuditLogs();
  const newLog = {
    log_id: `LOG-${5000 + logs.length + 1}`,
    applicant_id,
    applicant_name,
    action,
    officer_name,
    reason_code,
    notes,
    timestamp: new Date().toISOString()
  };
  logs.unshift(newLog);
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  return newLog;
};

// Feature 5 (Killer Feature): Continuous Watchlist Monitoring & Retroactive Batch Rescreening
export const addWatchlistEntityAndRescreen = (newEntity, officerName = "Lead Compliance Officer") => {
  const watchlist = getWatchlist();
  const applicants = getApplicants();

  const watchlistId = `WL-${String(watchlist.length + 1).padStart(3, "0")}`;
  const entity = {
    watchlist_id: watchlistId,
    name: newEntity.name.trim(),
    country: newEntity.country?.trim() || "Global",
    reason: newEntity.reason?.trim() || "Regulatory Sanctions Enforcement",
    category: newEntity.category || "Sanction",
    alias_names: Array.isArray(newEntity.alias_names) 
      ? newEntity.alias_names 
      : newEntity.alias_names ? newEntity.alias_names.split(",").map(s => s.trim()) : []
  };

  watchlist.unshift(entity);
  localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));

  // Retroactive batch scan across ALL existing approved & active customers!
  const flaggedExistingCustomers = [];

  applicants.forEach(applicant => {
    // Screen against the new sanction
    const screening = screenAgainstWatchlist(applicant, [entity]);
    if (screening.hasHit || screening.topSimilarity >= 75 || screening.isPhoneticMatch) {
      flaggedExistingCustomers.push({
        applicant,
        similarity: screening.topSimilarity,
        matchedEntity: entity,
        isPhonetic: screening.isPhoneticMatch
      });

      // Escalate and freeze status
      const oldStatus = applicant.status;
      applicant.status = "Flagged";
      applicant.risk_level = "High";
      applicant.risk_score = Math.max(applicant.risk_score || 50, 95);
      if (!applicant.risk_reasons) applicant.risk_reasons = [];
      applicant.risk_reasons.unshift(
        `[URGENT AML RETROACTIVE ALERT] Matched newly designated entity '${entity.name}' (${screening.topSimilarity}% similarity). Account frozen pending SAR.`
      );

      // Add critical audit log
      addAuditLog({
        applicant_id: applicant.applicant_id,
        applicant_name: applicant.full_name,
        action: "RESCREEN_MATCH",
        officer_name: "Automated AML Watchdog",
        reason_code: "RETROACTIVE_SANCTION_MATCH",
        notes: `CRITICAL ALERT: Customer previously '${oldStatus}' was matched to new sanction '${entity.name}' (${screening.topSimilarity}% similarity). Account frozen automatically.`
      });
    }
  });

  localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  notifySubscribers();

  return {
    newEntity: entity,
    totalScreened: applicants.length,
    flaggedCount: flaggedExistingCustomers.length,
    flaggedCustomers: flaggedExistingCustomers
  };
};

// Bonus Feature: Straight-Through Processing (STP) Fast-Track Batch Execution
export const runStpBatchApproval = (officerName = "System STP Engine") => {
  const applicants = getApplicants();
  const idRecords = getIdRecords();
  const watchlist = getWatchlist();
  let approvedCount = 0;

  applicants.forEach(applicant => {
    if (applicant.status === "Pending") {
      const idRec = idRecords.find(r => r.applicant_id === applicant.applicant_id);
      const consistency = runConsistencyCheck(applicant, idRec);
      const screening = screenAgainstWatchlist(applicant, watchlist);
      const risk = evaluateRiskRating(applicant, consistency, screening);

      if (risk.isStpEligible) {
        applicant.status = "Approved";
        applicant.risk_level = "Low";
        approvedCount++;

        addAuditLog({
          applicant_id: applicant.applicant_id,
          applicant_name: applicant.full_name,
          action: "STP_AUTO_APPROVED",
          officer_name: officerName,
          reason_code: "STP_BATCH_EXECUTION",
          notes: "Applicant cleared 100% ID consistency check and zero watchlist matches. Fast-track straight-through approval applied."
        });
      }
    }
  });

  localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  notifySubscribers();
  return approvedCount;
};
