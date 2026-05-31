import { useAuth } from "../../../auth/context/AuthContext";
import styles from "./PersonalStep.module.css";

const PersonalStep = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal Information</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>First Name</label>
          <input value={user.firstName || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Last Name</label>
          <input value={user.lastName || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input value={user.email || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Phone</label>
          <input value={user.phone || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <input value={user.gender || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Date of Birth</label>
          <input
            value={user.dateOfBirth || ""}
            readOnly
          />
        </div>

        <div className={styles.fieldFull}>
          <label>Address</label>
          <input value={user.address || ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default PersonalStep;