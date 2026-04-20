import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./ProfessionalInfoSection.module.css";

const ProfessionalInfoSection = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.columns}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Self-Introduction */}
          <div className={styles.field}>
            <label className={styles.label}>
              Self-Introduction (Strengths and Weaknesses)
            </label>
            <textarea
              className={styles.textarea}
              placeholder="Self-Introduction (Strengths and Weaknesses)"
              rows={3}
            />
          </div>

          {/* Job Title */}
          <div className={styles.field}>
            <label className={styles.label}>Job Title</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Job Title"
            />
          </div>

          {/* Desired Salary */}
          <div className={styles.field}>
            <label className={styles.label}>Desired Salary</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Desired Salary"
            />
          </div>

          {/* Start Date */}
          <div className={styles.field}>
            <label className={styles.label}>Start Date</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Start Date"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* File CV */}
          <div className={styles.field}>
            <label className={styles.label}>
              File CV{" "}
              <span className={styles.labelHint}>
                (PDF namefile: numberphoneNameDateOfBirth.pdf)
              </span>
            </label>
            <div className={styles.uploadArea}>
              <label className={styles.uploadBox} htmlFor="cv-upload">
                <FiPlus className={styles.uploadIcon} />
                <input
                  type="file"
                  id="cv-upload"
                  className={styles.fileInput}
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {fileName && (
              <div className={styles.fileInfo}>
                <span className={styles.fileLabel}>numberphoneName</span>
                <span className={styles.fileName}>{fileName}</span>
              </div>
            )}
            {!fileName && (
              <div className={styles.fileInfo}>
                <span className={styles.fileLabel}>numberphoneName</span>
                <span className={styles.fileName}>DateOfBirth.pdf</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;
