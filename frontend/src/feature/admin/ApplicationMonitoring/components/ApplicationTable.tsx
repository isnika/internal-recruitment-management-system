import React from "react";
import { FiShield, FiFileText } from "react-icons/fi";
import styles from "../pages/ApplicationMonitoring.module.css";
import type { AdminApplicationRecord } from "../pages/ApplicationMonitoring";

interface ApplicationTableProps {
  filteredApps: AdminApplicationRecord[];
  onAudit: (app: AdminApplicationRecord) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  filteredApps,
  onAudit,
}) => {
  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Applied Job</th>
            <th>Company</th>
            <th>Date Submitted</th>
            <th>Resume/CV</th>
            <th>Status</th>
            <th style={{ textAlign: "right", paddingRight: "24px" }}>Audit</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((app) => (
            <tr key={app.id}>
              <td className={styles.candidateName}>{app.candidateName}</td>
              <td className={styles.jobTitle}>{app.jobTitle}</td>
              <td>{app.companyName}</td>
              <td>{app.date}</td>
              <td>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // In production, this would trigger actual file download
                    console.log(`Downloading CV file: ${app.cvFileName}`);
                  }}
                  className={styles.cvLink}
                  aria-label={`Download CV for ${app.candidateName}`}
                >
                  <FiFileText /> {app.cvFileName}
                </a>
              </td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[app.status.toLowerCase()]
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionBtnAudit}
                    onClick={() => onAudit(app)}
                    aria-label={`Audit application from ${app.candidateName}`}
                  >
                    <FiShield /> Audit
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredApps.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
