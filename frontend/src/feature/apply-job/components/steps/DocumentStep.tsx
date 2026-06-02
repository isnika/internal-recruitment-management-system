import { useEffect, useState } from "react";
import CVPreview from "../preview/CVPreview";
import styles from "./DocumentStep.module.css";

import { getMyCandidateProfile } from "../../../../service/userApi";

const DocumentStep = ({ cv }: any) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyCandidateProfile();
        setProfile(res);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!cv) return <div>Loading CV...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Document Information</h2>

      {/* PROFILE INFO */}
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Tax Code</label>
          <input value={profile?.taxCode ?? "Not provided"} readOnly />
        </div>

        <div className={styles.field}>
          <label>Citizen ID</label>
          <input value={profile?.citizenId ?? "Not provided"} readOnly />
        </div>

        <div className={styles.field}>
          <label>Bank Account</label>
          <input
            value={profile?.bankAccountName ?? "Not provided"}
            readOnly
          />
        </div>

        <div className={styles.field}>
          <label>Social Link</label>
          <input value={profile?.socialLink ?? "Not provided"} readOnly />
        </div>
      </div>

      {/* CV FILE */}
      <div className={styles.preview}>
        <h3>CV File</h3>

        {cv?.fileUrl ? (
          <CVPreview fileUrl={cv.fileUrl} />
        ) : (
          <div className={styles.empty}>
            No CV file uploaded
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentStep;