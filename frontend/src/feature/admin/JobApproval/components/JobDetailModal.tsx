import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import styles from "../pages/JobApproval.module.css";
import type { Job } from "../../../../types/job";

interface JobDetailModalProps {
  selectedJob: Job;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  selectedJob,
  onClose,
  onApprove,
  onReject,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderTitle}>
            <h2>{selectedJob.title}</h2>
            <p className={styles.modalCompany}>{selectedJob.company?.name}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.detailSection}>
            <h4>Salary Range</h4>
            <p>
              {selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()}{" "}
              {selectedJob.salary.currency}
            </p>
          </div>

          <div className={styles.detailSection}>
            <h4>Job Description</h4>
            <ul>
              {selectedJob.description?.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailSection}>
            <h4>Requirements</h4>
            <ul>
              {selectedJob.requirements?.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailSection}>
            <h4>Benefits</h4>
            <ul>
              {selectedJob.benefits?.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.modalFooter}>
          {selectedJob.status?.toLowerCase() !== "active" && (
            <button
              className={styles.actionBtnGreen}
              onClick={() => {
                onApprove(selectedJob.id);
                onClose();
              }}
            >
              <FiCheck /> Approve Job
            </button>
          )}
          {selectedJob.status?.toLowerCase() !== "rejected" && (
            <button
              className={styles.actionBtnRed}
              onClick={() => {
                onReject(selectedJob.id);
                onClose();
              }}
            >
              <FiX /> Reject Job
            </button>
          )}
          <button className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
