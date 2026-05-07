import React, { KeyboardEvent } from "react";
import styles from "../CreateJobModal.module.css";

interface BenefitsTabProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const BenefitsTab: React.FC<BenefitsTabProps> = ({ formData, handleChange, handleKeyDown }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <div className={styles.formGroup}>
        <label>Benefits:</label>
        <textarea 
          name="benefits"
          className={styles.textarea}
          style={{minHeight: 150}}
          placeholder="- Benefits"
          value={formData.benefits}
          onChange={(e) => handleChange("benefits", e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Company</label>
        <textarea 
          name="company"
          className={styles.textarea}
          style={{minHeight: 80}}
          placeholder="Company name:&#10;Company Address:"
          value={`${formData.companyName ? `Company name: ${formData.companyName}\n` : ''}${formData.companyAddress ? `Company Address: ${formData.companyAddress}` : ''}`}
          onChange={(e) => {
            const lines = e.target.value.split('\n');
            handleChange("companyName", lines[0]?.replace('Company name:', '').trim() || "");
            handleChange("companyAddress", lines[1]?.replace('Company Address:', '').trim() || "");
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Working Hours</label>
        <input 
          className={styles.input} 
          placeholder="Working hours: Monday - Friday (8:30 AM to 5:30 PM)"
          value={formData.workingHours}
          onChange={(e) => handleChange("workingHours", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BenefitsTab;
