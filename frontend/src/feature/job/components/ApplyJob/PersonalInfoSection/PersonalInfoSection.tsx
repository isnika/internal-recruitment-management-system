import styles from "./PersonalInfoSection.module.css";

const PersonalInfoSection = () => {
  return (
    <div className={styles.section}>
      {/* Row: First Name + Last Name */}
      <div className={styles.row}>
        <div className={styles.fieldHalf}>
          <label className={styles.label}>First Name</label>
          <input type="text" className={styles.input} placeholder="First Name" />
        </div>
        <div className={styles.fieldHalf}>
          <label className={styles.label}>Last Name</label>
          <input type="text" className={styles.input} placeholder="Last Name" />
        </div>
      </div>

      {/* Row: Gender */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Gender</label>
          <input type="text" className={styles.input} placeholder="Gender" />
        </div>
      </div>

      {/* Row: Date of Birth */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Date of Birth</label>
          <div className={styles.dateGroup}>
            <input type="text" className={styles.inputSmall} placeholder="Day" />
            <input type="text" className={styles.inputSmall} placeholder="Month" />
            <input type="text" className={styles.inputSmall} placeholder="Year" />
          </div>
        </div>
      </div>

      {/* Row: Email */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Email</label>
          <input type="email" className={styles.input} placeholder="Email" />
        </div>
      </div>

      {/* Row: Phone number */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Phone number</label>
          <input type="tel" className={styles.input} placeholder="Phone number" />
        </div>
      </div>

      {/* Row: Address */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Address</label>
          <input type="text" className={styles.input} placeholder="Address" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
