import { useState } from "react";
import PersonalInfoSection from "../PersonalInfoSection/PersonalInfoSection";
import DocumentInfoSection from "../DocumentInfoSection/DocumentInfoSection";
import ProfessionalInfoSection from "../ProfessionalInfoSection/ProfessionalInfoSection";
import { FiX } from "react-icons/fi";
import styles from "./ApplyJobForm.module.css";

interface ApplyJobFormProps {
  onSubmitSuccess: () => void;
  onCancel?: () => void;
}

const ApplyJobForm = ({ onSubmitSuccess, onCancel }: ApplyJobFormProps) => {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess();
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>RECRUITMENT INFORMATION</h2>
        {onCancel && (
          <button type="button" className={styles.closeBtn} onClick={onCancel}>
            <FiX />
          </button>
        )}
      </div>

      <div className={styles.formColumns}>
        {/* Left Column: Personal */}
        <div className={styles.leftCol}>
          <PersonalInfoSection />
        </div>

        {/* Right Column: Documents */}
        <div className={styles.rightCol}>
          <DocumentInfoSection />
        </div>
      </div>

      {/* Separator */}
      <div className={styles.separator} />

      {/* Professional Section (full width, 2 columns inside) */}
      <ProfessionalInfoSection />

      {/* Agreement & Submit */}
      <div className={styles.footerRow}>
        <label className={styles.agreementLabel}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.agreementText}>
            I agree to the{" "}
            <a href="#" className={styles.policyLink}>
              Terms & Privacy Policy
            </a>
          </span>
        </label>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplyJobForm;
