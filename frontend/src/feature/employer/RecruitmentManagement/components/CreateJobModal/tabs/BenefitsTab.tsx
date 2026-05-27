import React, {
  KeyboardEvent,
} from "react";

import styles from "../CreateJobModal.module.css";

// =========================
// TYPES
// =========================
interface BenefitsTabProps {
  formData: {
    benefits: string;
  };

  handleChange: (
    field: "benefits",
    value: string
  ) => void;

  handleKeyDown: (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const BenefitsTab: React.FC<
  BenefitsTabProps
> = ({
  formData,
  handleChange,
  handleKeyDown,
}) => {
  return (
    <div className={styles.formGroup}>
      {/* LABEL */}
      <label htmlFor="benefits">
        Benefits & Perks
      </label>

      {/* TEXTAREA */}
      <textarea
        id="benefits"
        name="benefits"
        className={styles.textarea}
        placeholder={`- Competitive salary and bonus
- Health insurance package
- Flexible working hours
- Remote working support`}
        value={formData.benefits}
        onChange={(e) =>
          handleChange(
            "benefits",
            e.target.value
          )
        }
        onKeyDown={handleKeyDown}
        rows={12}
      />

      {/* HELPER */}
      <small className={styles.helperText}>
        Press Enter to automatically
        create bullet points.
      </small>
    </div>
  );
};

export default React.memo(
  BenefitsTab
);