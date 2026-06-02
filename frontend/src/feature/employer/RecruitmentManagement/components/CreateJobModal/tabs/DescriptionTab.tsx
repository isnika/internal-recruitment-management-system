import React, {
  KeyboardEvent,
} from "react";

import styles from "../CreateJobModal.module.css";

// =========================
// TYPES
// =========================
interface DescriptionTabProps {
  formData: {
    description: string;
  };

  handleChange: (
    field: "description",
    value: string
  ) => void;

  handleKeyDown: (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const DescriptionTab: React.FC<
  DescriptionTabProps
> = ({
  formData,
  handleChange,
  handleKeyDown,
}) => {
  return (
    <div className={styles.formGroup}>
      {/* LABEL */}
      <label htmlFor="description">
        Job Description
      </label>

      {/* TEXTAREA */}
      <textarea
        id="description"
        name="description"
        className={styles.textarea}
        placeholder={`- Build scalable frontend applications
- Collaborate with backend team
- Optimize performance`}
        value={formData.description}
        onChange={(e) =>
          handleChange(
            "description",
            e.target.value
          )
        }
        onKeyDown={handleKeyDown}
        rows={12}
      />

      {/* HELPER */}
      <small className={styles.helperText}>
        Press Enter to create bullet
        points automatically.
      </small>
    </div>
  );
};

export default React.memo(
  DescriptionTab
);