import React, { KeyboardEvent } from "react";
import styles from "../CreateJobModal.module.css";

interface RequirementsTabProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const RequirementsTab: React.FC<RequirementsTabProps> = ({ formData, handleChange, handleKeyDown }) => {
  return (
    <div className={styles.formGroup}>
      <label>Candidate Requirements:</label>
      <textarea 
        name="requirements"
        className={styles.textarea}
        placeholder="- Candidate Requirements"
        value={formData.requirements}
        onChange={(e) => handleChange("requirements", e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default RequirementsTab;
