import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./ProfessionalInfoSection.module.css";

type Props = {
  jobTitle?: string;
};

const ProfessionalInfoSection = ({ jobTitle }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // validate PDF
    if (file.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    setFileName(file.name);
  };

  return (
    <div className={styles.section}>
      <div className={styles.columns}>
        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.field}>
            <label className={styles.label}>
              Self-Introduction (Strengths and Weaknesses)
            </label>
            <textarea
              className={styles.textarea}
              placeholder="Self-Introduction"
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Job Title</label>
            <input
              type="text"
              className={styles.input}
              value={jobTitle || ""}
              readOnly
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Desired Salary</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Desired Salary"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Start Date</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Start Date"
            />
          </div>
        </div>

        {/* Right */}
        <div className={styles.rightCol}>
          <div className={styles.field}>
            <label className={styles.label}>
              File CV{" "}
              <span className={styles.labelHint}>
                (PDF: phoneNameDOB.pdf)
              </span>
            </label>

            <div className={styles.uploadArea}>
              <label className={styles.uploadBox}>
                <FiPlus className={styles.uploadIcon} />
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className={styles.fileInfo}>
              <span className={styles.fileLabel}>numberphoneName</span>
              <span className={styles.fileName}>
                {fileName || "DateOfBirth.pdf"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;