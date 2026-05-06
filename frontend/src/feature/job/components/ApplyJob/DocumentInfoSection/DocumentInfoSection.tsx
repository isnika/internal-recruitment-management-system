import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./DocumentInfoSection.module.css";
import { useAuth } from "../../../../auth/context/AuthContext";

const DocumentInfoSection = () => {

  const { user } = useAuth();
  const [socialNetworks, setSocialNetworks] = useState(
    user?.recruitment?.social
      ? [{ name: user.recruitment.social, link: "" }]
      : [{ name: "", link: "" }]
  );
  const [bankAccounts, setBankAccounts] = useState(
    user?.recruitment?.bank ? [user.recruitment.bank] : [""]
  );

  const addSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { name: "", link: "" }]);
  };

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, ""]);
  };

useEffect(() => {
  if (!user) return;

  setSocialNetworks(
    user.recruitment?.social
      ? [{ name: user.recruitment.social, link: "" }]
      : [{ name: "", link: "" }]
  );

  setBankAccounts(
    user.recruitment?.bank ? [user.recruitment.bank] : [""]
  );
}, [user]);

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
            value={user?.recruitment?.taxId || ""}
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
            value={user?.recruitment?.citizenId || ""}
            placeholder="Citizen ID Number"
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
            value={
              user?.recruitment?.releaseDate
                ? user.recruitment.releaseDate.split("-").reverse().join("/")
                : ""
            }
            placeholder="Release Date"
          />
        </div>
      </div>

      {/* Social Network */}
      <div className={styles.row}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Social Network</label>
          {socialNetworks.map((item, index) => (
            <div key={index} className={styles.socialRow}>
              <input
                type="text"
                className={styles.inputSmall}
                value={item.name}
                onChange={(e) => {
                  const newList = [...socialNetworks];
                  newList[index].name = e.target.value;
                  setSocialNetworks(newList);
                }}
                placeholder="Name"
              />

              <input
                type="text"
                className={styles.inputSmall}
                value={item.link}
                onChange={(e) => {
                  const newList = [...socialNetworks];
                  newList[index].link = e.target.value;
                  setSocialNetworks(newList);
                }}
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
          {bankAccounts.map((item, index) => (
            <input
              key={index}
              type="text"
              className={styles.input}
              value={item}
              onChange={(e) => {
                const newList = [...bankAccounts];
                newList[index] = e.target.value;
                setBankAccounts(newList);
              }}
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
