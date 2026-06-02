import React from "react";
import styles from "./DeleteJobModal.module.css";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteJobModalProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteJobModal: React.FC<DeleteJobModalProps> = ({ isOpen, jobTitle, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <FiAlertTriangle className={styles.warningIcon} />
        </div>
        <h3 className={styles.title}>Confirm Delete Job</h3>
        <p className={styles.message}>
          Are you sure you want to delete the job <br />
          <span className={styles.jobName}>"{jobTitle}"</span>?
        </p>
        <p className={styles.warning}>This action cannot be undone.</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
