import styles from "./PersonalInfoSection.module.css";
import { useAuth } from "../../../../auth/context/AuthContext";

const PersonalInfoSection = () => {
  const { user } = useAuth();

  if (!user) return null;

  const nameParts = (user.fullName || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const dobParts = user.dob?.includes("-")
    ? user.dob.split("-")
    : ["", "", ""];

  console.log("AUTH USER =", user);

  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <div className={styles.fieldHalf}>
          <label className={styles.label}>First Name</label>
          <input className={styles.input} value={firstName} readOnly />
        </div>

        <div className={styles.fieldHalf}>
          <label className={styles.label}>Last Name</label>
          <input className={styles.input} value={lastName} readOnly />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Gender</label>
          <input className={styles.input} value={user.gender || ""} readOnly />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Date of Birth</label>

          <div className={styles.dateGroup}>
            <input className={styles.inputSmall} value={dobParts[2]} readOnly />
            <input className={styles.inputSmall} value={dobParts[1]} readOnly />
            <input className={styles.inputSmall} value={dobParts[0]} readOnly />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} value={user.email || ""} readOnly />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Phone number</label>
          <input className={styles.input} value={user.phone || ""} readOnly />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Address</label>
          <input className={styles.input} value={user.address || ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;