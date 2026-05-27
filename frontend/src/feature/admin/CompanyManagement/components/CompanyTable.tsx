import React from "react";
import { FiCheck, FiSlash, FiShield } from "react-icons/fi";
import styles from "../pages/CompanyManagement.module.css";
import type { Company } from "../../../../types/company";

interface CompanyTableProps {
  filteredCompanies: Company[];
  onApprove: (id: number) => void;
  onBlock: (id: number) => void;
  onVerify: (id: number) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  filteredCompanies,
  onApprove,
  onBlock,
  onVerify,
}) => {
  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Website</th>
            <th>Address</th>
            <th>Description</th>
            <th>Status</th>
            <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((c) => (
            <tr key={c.id}>
              <td className={styles.nameCell}>
                <div className={styles.nameWrapper}>
                  <span className={styles.companyName}>{c.name}</span>
                  {c.verified && (
                    <span className={styles.verifiedBadge} title="Verified Account">
                      <FiCheck className={styles.verifiedIcon} /> Verified
                    </span>
                  )}
                </div>
              </td>
              <td>{c.website}</td>
              <td>{c.address}</td>
              <td>
                <span className={styles.industryTag}>{c.description ? (c.description.length > 30 ? c.description.substring(0, 30) + '...' : c.description) : ''}</span>
              </td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[c.status?.toLowerCase()] || styles.active
                  }`}
                >
                  {c.status || "ACTIVE"}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  {c.status === "PENDING" && (
                    <button
                      className={styles.actionBtnGreen}
                      onClick={() => onApprove(c.id)}
                      aria-label={`Approve ${c.name}`}
                    >
                      <FiCheck /> Approve
                    </button>
                  )}
                  {c.status !== "PENDING" && (
                    <button
                      className={`${styles.actionBtnBlock} ${
                        c.status === "BLOCKED" ? styles.blockedBtn : ""
                      }`}
                      onClick={() => onBlock(c.id)}
                      title={c.status === "BLOCKED" ? "Unblock Company" : "Block Company"}
                      aria-label={c.status === "BLOCKED" ? `Unblock ${c.name}` : `Block ${c.name}`}
                    >
                      <FiSlash /> {c.status === "BLOCKED" ? "Unblock" : "Block"}
                    </button>
                  )}
                  <button
                    className={`${styles.actionBtnVerify} ${
                      c.verified ? styles.verifiedBtnActive : ""
                    }`}
                    onClick={() => onVerify(c.id)}
                    title={c.verified ? "Remove Verification" : "Verify Company"}
                    aria-label={c.verified ? `Remove verification for ${c.name}` : `Verify ${c.name}`}
                  >
                    <FiShield /> {c.verified ? "Unverify" : "Verify"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredCompanies.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
