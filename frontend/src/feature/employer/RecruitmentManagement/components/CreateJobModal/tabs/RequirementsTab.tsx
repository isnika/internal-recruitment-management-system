import React, {
  KeyboardEvent,
} from "react";

import styles from "../CreateJobModal.module.css";

// =========================
// TYPES
// =========================
interface RequirementsTabProps {
  formData: {
    requirements: string;
  };

  handleChange: (
    field: "requirements",
    value: string
  ) => void;

  handleKeyDown: (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const RequirementsTab: React.FC<
  RequirementsTabProps
> = ({
  formData,
  handleChange,
  handleKeyDown,
}) => {
  return (
    <div className={styles.formGroup}>
      {/* LABEL */}
      <label htmlFor="requirements">
        Candidate Requirements
      </label>

      {/* TEXTAREA */}
      <textarea
        id="requirements"
        name="requirements"
        className={styles.textarea}
        placeholder={`- Minimum 2 years of experience
- Strong knowledge of React and TypeScript
- Good communication skills`}
        value={formData.requirements}
        onChange={(e) =>
          handleChange(
            "requirements",
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
  RequirementsTab
);