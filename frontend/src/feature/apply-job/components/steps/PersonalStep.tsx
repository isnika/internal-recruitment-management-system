import { useEffect, useState } from "react";
import { getMyCandidateProfile } from "../../../../service/userApi";
import styles from "./PersonalStep.module.css";

const PersonalStep = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PROFILE (SOURCE OF TRUTH)
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await getMyCandidateProfile();

        setProfile(res);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <div>Loading...</div>;
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!profile) {
    return <div>No profile found</div>;
  }

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal Information</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>First Name</label>
          <input value={profile.firstName || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Last Name</label>
          <input value={profile.lastName || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input value={profile.email || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Phone</label>
          <input value={profile.phone || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <input value={profile.gender || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Date of Birth</label>
          <input value={profile.dateOfBirth || ""} readOnly />
        </div>

        <div className={styles.fieldFull}>
          <label>Address</label>
          <input value={profile.address || ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default PersonalStep;