import CVPreview from "../preview/CVPreview";
import styles from "./DocumentStep.module.css";

const DocumentStep = ({ cv }: any) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Document Information</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Tax Code</label>
          <input value={cv?.taxId ?? "Not provided"} readOnly />
        </div>

        <div className={styles.field}>
          <label>Citizen ID</label>
          <input value={cv?.citizenId ?? "Not provided"} readOnly />
        </div>

        <div className={styles.field}>
          <label>Bank Account</label>
          <input value={cv?.bankAccount ?? "Not provided"} readOnly />
        </div>

        <div className={styles.field}>
          <label>Social Link</label>
          <input value={cv?.socialLink ?? "Not provided"} readOnly />
        </div>
      </div>

      <div className={styles.preview}>
        <h3>CV File</h3>

        {cv?.fileUrl ? (
          <CVPreview fileUrl={cv.fileUrl} />
        ) : (
          <div className={styles.empty}>No CV file uploaded</div>
        )}
      </div>
    </div>
  );
};

export default DocumentStep;