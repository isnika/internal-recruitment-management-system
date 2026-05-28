import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import styles from "../pages/JobApproval.module.css";
import type { Job } from "../../../../types/job";

interface JobDetailModalProps {
  selectedJob: Job;
  onClose: () => void;
  onApprove: (job: Job) => void;
  onReject: (job: Job) => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  selectedJob,
  onClose,
  onApprove,
  onReject,
}) => {
  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderTitle}>
            <h2>{selectedJob.title}</h2>

            <p className={styles.modalCompany}>
              {selectedJob.company?.name}
            </p>
          </div>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* BODY */}
        <div className={styles.modalBody}>
          {/* GENERAL INFO */}
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <h4>Job Title</h4>
              <p>{selectedJob.title}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Company</h4>
              <p>{selectedJob.company?.name || "-"}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Category</h4>
              <p>{selectedJob.category?.name || "-"}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Experience Level</h4>
              <p>
                {selectedJob.experienceLevel?.name || "-"}
              </p>
            </div>

            <div className={styles.detailItem}>
              <h4>Employment Type</h4>
              <p>{selectedJob.type}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Location</h4>
              <p>{selectedJob.location}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Deadline</h4>
              <p>
                {selectedJob.deadline
                  ? new Date(
                      selectedJob.deadline
                    ).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className={styles.detailItem}>
              <h4>Status</h4>
              <p>{selectedJob.status}</p>
            </div>

            <div className={styles.detailItem}>
              <h4>Salary Range</h4>
              <p>
                {selectedJob.salaryMin?.toLocaleString()} -{" "}
                {selectedJob.salaryMax?.toLocaleString()} VND
              </p>
            </div>
          </div>

          {/* SKILLS */}
          <div className={styles.detailSection}>
            <h4>Skills</h4>

            <div className={styles.skillsWrapper}>
              {selectedJob.skills?.length > 0 ? (
                selectedJob.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={styles.skillBadge}
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <p>No skills</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className={styles.detailSection}>
            <h4>Description</h4>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {selectedJob.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div className={styles.detailSection}>
            <h4>Requirements</h4>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {selectedJob.requirements}
            </p>
          </div>

          {/* BENEFITS */}
          <div className={styles.detailSection}>
            <h4>Benefits</h4>

            <p style={{ whiteSpace: "pre-wrap" }}>
              {selectedJob.benefits}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          {selectedJob.status !== "ACTIVE" && (
            <button
              className={styles.actionBtnGreen}
              onClick={() => {
                onApprove(selectedJob);
                onClose();
              }}
            >
              <FiCheck /> Approve Job
            </button>
          )}

          {selectedJob.status !== "CLOSED" && (
            <button
              className={styles.actionBtnRed}
              onClick={() => {
                onReject(selectedJob);
                onClose();
              }}
            >
              <FiX /> Reject Job
            </button>
          )}

          <button
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;