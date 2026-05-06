import styles from "./PersonalInfoSection.module.css";
import { useAuth } from "../../../../auth/context/AuthContext";


const PersonalInfoSection = () => {

  const { user } = useAuth();

  const nameParts = user?.fullName?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const dobParts = user?.dob?.split("-") || ["", "", ""];

  return (
    <div className={styles.section}>
      {/* Row: First Name + Last Name */}
      <div className={styles.row}>
        <div className={styles.fieldHalf}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            readOnly
          />
        </div>
        <div className={styles.fieldHalf}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            readOnly
          />
        </div>
      </div>

      {/* Row: Gender */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Gender</label>
          <input
            type="text"
            className={styles.input}
            value={user?.gender || ""}
            readOnly
          />
        </div>
      </div>

      {/* Row: Date of Birth */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Date of Birth</label>
          <div className={styles.dateGroup}>
            <input
              type="text"
              className={styles.inputSmall}
              value={dobParts[2] || ""}
              readOnly
            />

            <input
              type="text"
              className={styles.inputSmall}
              value={dobParts[1] || ""}
              readOnly
            />

            <input
              type="text"
              className={styles.inputSmall}
              value={dobParts[0] || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Row: Email */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={user?.email || ""}
            readOnly
          />
        </div>
      </div>

      {/* Row: Phone number */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Phone number</label>
          <input
            type="tel"
            className={styles.input}
            value={user?.phone || ""}
            readOnly
          />
        </div>
      </div>

      {/* Row: Address */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            className={styles.input}
            value={user?.address || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
