import React from "react";
import styles from "../CreateJobModal.module.css";
import { FiUploadCloud, FiPauseCircle, FiXCircle, FiFileText } from "react-icons/fi";

interface StatusTabProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

const StatusTab: React.FC<StatusTabProps> = ({ formData, handleChange }) => {
  return (
    <div>
      <div className={styles.statusBadge}>Current status: Posted</div>
      <p style={{marginBottom: 16, fontWeight: 500}}>Select new status</p>
      <div className={styles.statusContainer}>
        <div 
          className={`${styles.statusCard} ${formData.status === "Posted" ? styles.statusCardActive : ""}`}
          onClick={() => handleChange("status", "Posted")}
        >
          <div className={styles.statusInfo}>
            <div className={styles.statusIcon} style={{background: '#22c55e'}}><FiUploadCloud /></div>
            <div>
              <div className={styles.statusTitle}>Posted</div>
              <div className={styles.statusDesc}>Visible to the public, candidates can apply</div>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${formData.status === "Posted" ? styles.radioCircleActive : ""}`}>
            {formData.status === "Posted" && <div className={styles.radioDot} />}
          </div>
        </div>

        <div 
          className={`${styles.statusCard} ${formData.status === "Paused" ? styles.statusCardActive : ""}`}
          onClick={() => handleChange("status", "Paused")}
        >
          <div className={styles.statusInfo}>
            <div className={styles.statusIcon} style={{background: '#f59e0b'}}><FiPauseCircle /></div>
            <div>
              <div className={styles.statusTitle}>Paused</div>
              <div className={styles.statusDesc}>Temporarily hidden, not visible to candidates</div>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${formData.status === "Paused" ? styles.radioCircleActive : ""}`}>
            {formData.status === "Paused" && <div className={styles.radioDot} />}
          </div>
        </div>

        <div 
          className={`${styles.statusCard} ${formData.status === "Closed" ? styles.statusCardActive : ""}`}
          onClick={() => handleChange("status", "Closed")}
        >
          <div className={styles.statusInfo}>
            <div className={styles.statusIcon} style={{background: '#ef4444'}}><FiXCircle /></div>
            <div>
              <div className={styles.statusTitle}>Closed</div>
              <div className={styles.statusDesc}>No longer accepting applications</div>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${formData.status === "Closed" ? styles.radioCircleActive : ""}`}>
            {formData.status === "Closed" && <div className={styles.radioDot} />}
          </div>
        </div>

        <div 
          className={`${styles.statusCard} ${formData.status === "Draft" ? styles.statusCardActive : ""}`}
          onClick={() => handleChange("status", "Draft")}
        >
          <div className={styles.statusInfo}>
            <div className={styles.statusIcon} style={{background: '#64748b'}}><FiFileText /></div>
            <div>
              <div className={styles.statusTitle}>Draft</div>
              <div className={styles.statusDesc}>Saved as draft, not public</div>
            </div>
          </div>
          <div className={`${styles.radioCircle} ${formData.status === "Draft" ? styles.radioCircleActive : ""}`}>
            {formData.status === "Draft" && <div className={styles.radioDot} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTab;
