import React from "react";
import styles from "./ViewDetailsAppliedJobsModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any; // Thay 'any' bằng type JobAppliation thực tế của bạn
}

export default function ViewDetailsAppliedJobsModal({ isOpen, onClose, job }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Application Details</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <label>Position</label>
            <p className={styles.value}>{job.title}</p>
          </div>

          <div className={styles.row}>
            <div className={styles.section}>
              <label>Company</label>
              <p className={styles.value}>{job.company}</p>
            </div>
            <div className={styles.section}>
              <label>Date Applied</label>
              <p className={styles.value}>{job.appliedDate}</p>
            </div>
          </div>

          <div className={styles.section}>
            <label>Current Status</label>
            <div className={`${styles.statusBadge} ${styles[job.status.toLowerCase()]}`}>
              {job.status}
            </div>
          </div>

          <div className={styles.section}>
            <label>Recruiter Note</label>
            <p className={styles.note}>
              "Thank you for your interest. We are currently reviewing your qualifications and will reach out shortly."
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>Close</button>
          <button className={styles.btnPrimary}>View Posted Job</button>
        </div>
      </div>
    </div>
  );
}