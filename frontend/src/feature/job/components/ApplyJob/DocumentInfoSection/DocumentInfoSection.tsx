import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./DocumentInfoSection.module.css";

const DocumentInfoSection = () => {
  const [socialNetworks, setSocialNetworks] = useState([{ name: "", link: "" }]);
  const [bankAccounts, setBankAccounts] = useState([""]);

  const addSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { name: "", link: "" }]);
  };

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, ""]);
  };

  return (
    <div className={styles.section}>
      {/* Personal Tax ID */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>
            Personal Tax Identification Number (Currenly Use)
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Personal Tax Identification Number"
          />
        </div>
      </div>

      {/* Citizen ID */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>
            Citizen ID Number/Citizen Card Number (Currenly Use)
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Citizen ID Number/Citizen Card Number"
          />
        </div>
      </div>

      {/* Release Date */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Release Date</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Release Date"
          />
        </div>
      </div>

      {/* Social Network */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Social Network</label>
          {socialNetworks.map((_, index) => (
            <div key={index} className={styles.socialRow}>
              <input
                type="text"
                className={styles.inputSmall}
                placeholder="Name"
              />
              <input
                type="text"
                className={styles.inputSmall}
                placeholder="Link"
              />
            </div>
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={addSocialNetwork}
          >
            Add
          </button>
        </div>
      </div>

      {/* Bank Account */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>
            Bank Account Name (Currently Use)
          </label>
          {bankAccounts.map((_, index) => (
            <input
              key={index}
              type="text"
              className={styles.input}
              placeholder="Bank Account Name"
            />
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={addBankAccount}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentInfoSection;
