import { useState, useEffect } from "react";
import styles from "./DocumentInfoSection.module.css";
import { useAuth } from "../../../../auth/context/AuthContext";

const DocumentInfoSection = () => {
  const { user } = useAuth();

  const [socialNetworks, setSocialNetworks] = useState<
    { name: string; link: string }[]
  >([]);

  const [bankAccounts, setBankAccounts] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const recruitment = user.recruitment || {};

    setSocialNetworks(
      recruitment.social
        ? [{ name: recruitment.social, link: "" }]
        : [{ name: "", link: "" }]
    );

    setBankAccounts(
      recruitment.bank ? [recruitment.bank] : [""]
    );
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>
            Personal Tax Identification Number
          </label>
          <input
            className={styles.input}
            value={user.recruitment?.taxId || ""}
            readOnly
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Citizen ID</label>
          <input
            className={styles.input}
            value={user.recruitment?.citizenId || ""}
            readOnly
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Release Date</label>
          <input
            className={styles.input}
            value={
              user.recruitment?.releaseDate
                ? user.recruitment.releaseDate
                    .split("-")
                    .reverse()
                    .join("/")
                : ""
            }
            readOnly
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Social Network</label>

          {socialNetworks.map((item, index) => (
            <div key={index} className={styles.socialRow}>
              <input className={styles.inputSmall} value={item.name} readOnly />
              <input className={styles.inputSmall} value={item.link} readOnly />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Bank Account</label>

          {bankAccounts.map((item, index) => (
            <input key={index} className={styles.input} value={item} readOnly />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentInfoSection;