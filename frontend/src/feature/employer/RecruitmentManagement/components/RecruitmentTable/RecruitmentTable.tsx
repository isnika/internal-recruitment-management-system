import React from "react";
import styles from "./RecruitmentTable.module.css";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiDollarSign
} from "react-icons/fi";
import { formatSalary } from "../../../../../service/jobApi";
import type { Job } from "../../../../../types/job";

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
  onViewJob
}) => {
  const renderStatus = (status: string) => {
    const normalized = status?.toLowerCase();

    if (normalized === "draft") {
      return (
        <span className={`${styles.statusBadge} ${styles.statusDraft}`}>
          Draft
        </span>
      );
    }

    if (normalized === "closed") {
      return (
        <span className={`${styles.statusBadge} ${styles.statusClosed}`}>
          Closed
        </span>
      );
    }

    return (
      <span className={`${styles.statusBadge} ${styles.statusPosted}`}>
        Posted
      </span>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>
              <input type="checkbox" className={styles.checkbox} />
            </th>
            <th style={{ width: "50px" }}>ID</th>
            <th>Job Position & Department</th>
            <th>Job Details</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Created Date</th>
            <th style={{ width: "100px", textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id || index} className={styles.tableRow}>
              {/* Checkbox */}
              <td>
                <input type="checkbox" className={styles.checkbox} />
              </td>

              {/* ID */}
              <td className={styles.techId}>
                {(index + 1).toString().padStart(2, "0")}
              </td>

              {/* Title + Department */}
              <td>
                <div className={styles.jobMainInfo}>
                  <span className={styles.jobTitle}>{job.title}</span>
                  <span className={styles.jobDepartment}>
                    {job.department || job.category || "General"}
                  </span>
                </div>
              </td>

              {/* Job details */}
              <td>
                <div className={styles.metaDataBlock}>
                  <span className={styles.typeTag}>{job.jobType}</span>

                  <div className={styles.creatorFlex}>
                    <FiUser className={styles.miniIcon} />
                    <span>{job.createdBy || "System"}</span>
                  </div>
                </div>
              </td>

              {/* Salary */}
              <td className={styles.salaryCell}>
                <div className={styles.salaryFlex}>
                  <FiDollarSign className={styles.salaryIcon} />
                  <span>{formatSalary(job.salary)}</span>
                </div>
              </td>

              {/* Status */}
              <td>{renderStatus(job.status || "Posted")}</td>

              {/* Date */}
              <td className={styles.dateCell}>
                <div className={styles.dateFlex}>
                  <FiCalendar className={styles.miniIcon} />
                  <span>{job.postedAt || "N/A"}</span>
                </div>
              </td>

              {/* Actions */}
              <td>
                <div className={styles.actionIcons}>
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.viewBtn}`}
                    onClick={() => onViewJob?.(job)}
                    title="View details"
                  >
                    <FiEye />
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => onEditJob(job)}
                    title="Edit job"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => onDeleteJob(job)}
                    title="Delete job"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {/* Empty state */}
          {jobs.length === 0 && (
            <tr>
              <td colSpan={8} className={styles.emptyRow}>
                <div className={styles.emptyContainer}>
                  <p>No job postings match your current filters.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitmentTable;