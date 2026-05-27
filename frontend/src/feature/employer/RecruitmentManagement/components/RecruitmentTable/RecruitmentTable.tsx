import React from "react";
import styles from "./RecruitmentTable.module.css";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

import type { Job } from "../../../../../types/job";
import { formatSalary } from "../../../../../utils/format"; // FIX đúng utils

// STATUS CONFIG (match backend)
const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  OPEN: { label: "Open", className: styles.statusActive },
  DRAFT: { label: "Draft", className: styles.statusDraft },
  CLOSED: { label: "Closed", className: styles.statusClosed },
};

interface RecruitmentTableProps {
  jobs: Job[];
  onEditJob: (job: Job) => void;
  onDeleteJob: (job: Job) => void;
  onViewJob?: (job: Job) => void;
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({
  jobs,
  onEditJob,
  onDeleteJob,
  onViewJob,
}) => {
  const renderStatus = (status: string) => {
    const config =
      STATUS_CONFIG[status?.toUpperCase()] || STATUS_CONFIG.DRAFT;

    return (
      <span className={`${styles.statusBadge} ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <input type="checkbox" className={styles.checkbox} />
            </th>
            <th style={{ width: 60 }}>ID</th>
            <th>Job</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Deadline</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id} className={styles.tableRow}>
              {/* checkbox */}
              <td>
                <input type="checkbox" className={styles.checkbox} />
              </td>

              {/* ID */}
              <td className={styles.techId}>
                {(index + 1).toString().padStart(2, "0")}
              </td>

              {/* JOB TITLE + CATEGORY */}
              <td>
                <div className={styles.jobMainInfo}>
                  <span className={styles.jobTitle}>
                    {job.title}
                  </span>

                  <span className={styles.jobDepartment}>
                    {job.category?.name || "General"}
                  </span>
                </div>
              </td>

              {/* COMPANY */}
              <td>
                <div className={styles.creatorFlex}>
                  <FiUser className={styles.miniIcon} />
                  <span>{job.company?.name || "System"}</span>
                </div>
              </td>

              {/* SALARY */}
              <td className={styles.salaryCell}>
                <div className={styles.salaryFlex}>
                  <FiDollarSign className={styles.salaryIcon} />
                  <span>
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                </div>
              </td>

              {/* STATUS */}
              <td>{renderStatus(job.status)}</td>

              {/* DEADLINE */}
              <td className={styles.dateCell}>
                <div className={styles.dateFlex}>
                  <FiCalendar className={styles.miniIcon} />
                  <span>{job.deadline || "N/A"}</span>
                </div>
              </td>

              {/* ACTIONS */}
              <td>
                <div className={styles.actionIcons}>
                  <button
                    className={`${styles.actionBtn} ${styles.viewBtn}`}
                    onClick={() => onViewJob?.(job)}
                  >
                    <FiEye />
                  </button>

                  <button
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => onEditJob(job)}
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => onDeleteJob(job)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitmentTable;