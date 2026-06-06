import React from "react";
import { FiX } from "react-icons/fi";
import styles from "../pages/ApplicationMonitoring.module.css";
import type { AdminApplicationRecord } from "../pages/ApplicationMonitoring";

interface ApplicationDetailModalProps {
  auditingApp: AdminApplicationRecord;
  onClose: () => void;
  auditNotes: string;
  setAuditNotes: (val: string) => void;
  onConfirm: () => void;
}

const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  auditingApp,
  onClose,
  auditNotes,
  setAuditNotes,
  onConfirm,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderTitle}>
            <h2>Audit Candidate Profile</h2>
            <p className={styles.modalCompany}>
              Checking compliance details for {auditingApp.candidateName}
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.auditInfoGrid}>
            <div className={styles.auditInfoCard}>
              <span className={styles.auditLabel}>Citizen ID</span>
              <span className={styles.auditVal}>{auditingApp.citizenId}</span>
            </div>
            <div className={styles.auditInfoCard}>
              <span className={styles.auditLabel}>Tax ID</span>
              <span className={styles.auditVal}>{auditingApp.taxId}</span>
            </div>
            <div className={styles.auditInfoCard}>
              <span className={styles.auditLabel}>Bank Account</span>
              <span className={styles.auditVal}>{auditingApp.bankAccount}</span>
            </div>
            <div className={styles.auditInfoCard}>
              <span className={styles.auditLabel}>Social Profile</span>
              <span className={styles.auditVal}>{auditingApp.socialLink}</span>
            </div>
          </div>

          <div className={styles.notesSection}>
            <h4>Compliance Audit Notes</h4>
            <textarea
              className={styles.textarea}
              placeholder="Enter audit review comments, background checks verification notes..."
              value={auditNotes}
              onChange={(e) => setAuditNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={!auditNotes.trim()}
          >
            Submit Audit Log
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
