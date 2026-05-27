import React from "react";
import styles from "../CreateJobModal.module.css";
import { FiUploadCloud, FiPauseCircle, FiXCircle, FiFileText } from "react-icons/fi";

const STATUS_OPTIONS = [
  { id: "ACTIVE", label: "Active", desc: "Visible to the public, candidates can apply", icon: FiUploadCloud, bg: "#e6f7ed", color: "#2e7d32", className: styles.statusActive },
  { id: "PAUSED", label: "Paused", desc: "Temporarily hidden, not visible to candidates", icon: FiPauseCircle, bg: "#fff8e1", color: "#f57f17", className: styles.statusPaused },
  { id: "CLOSED", label: "Closed", desc: "No longer accepting applications", icon: FiXCircle, bg: "#ffebee", color: "#c62828", className: styles.statusClosed },
  { id: "DRAFT", label: "Draft", desc: "Saved as draft, not public", icon: FiFileText, bg: "#f5f5f5", color: "#616161", className: styles.statusDraft },
];

const StatusTab: React.FC<{ formData: any; handleChange: (f: string, v: any) => void }> = ({ formData, handleChange }) => {
  const currentStatus = (formData.status || "DRAFT").toUpperCase();
  const selectedOption = STATUS_OPTIONS.find(opt => opt.id === currentStatus) || STATUS_OPTIONS[3];

  return (
    <div>
      <div className={`${styles.statusBadge} ${selectedOption.className}`}>
        Current status: {selectedOption.label}
      </div>

      <p style={{ marginBottom: 16, fontWeight: 600 }}>Select new status</p>

      <div className={styles.statusContainer}>
        {STATUS_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            className={`${styles.statusCard} ${currentStatus === opt.id ? styles.statusCardActive : ""}`}
            onClick={() => handleChange("status", opt.id)}
          >
            <div className={styles.statusInfo}>
              <div className={styles.statusIcon} style={{ background: opt.bg, color: opt.color }}>
                <opt.icon />
              </div>
              <div>
                <div className={styles.statusTitle}>{opt.label}</div>
                <div className={styles.statusDesc}>{opt.desc}</div>
              </div>
            </div>
            <div className={`${styles.radioCircle} ${currentStatus === opt.id ? styles.radioCircleActive : ""}`}>
              {currentStatus === opt.id && <div className={styles.radioDot} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTab;