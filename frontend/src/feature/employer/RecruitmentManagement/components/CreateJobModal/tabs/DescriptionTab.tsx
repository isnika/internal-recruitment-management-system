import React, { KeyboardEvent } from "react";
import styles from "../CreateJobModal.module.css";

interface DescriptionTabProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ formData, handleChange, handleKeyDown }) => {
  return (
    <div className={styles.formGroup}>
      <label>Job Description</label>
      <textarea 
        name="description"
        className={styles.textarea}
        placeholder="- Job description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default DescriptionTab;
