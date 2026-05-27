import React, { useMemo } from "react";

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
import { formatSalary } from "../../../../../utils/format";

// =========================
// STATUS CONFIG
// =========================
const STATUS_CONFIG: Record<
  JobStatus,
  {
    label: string;
    className: string;
  }
> = {
  DRAFT: {
    label: "Draft",
    className: styles.statusDraft,
  },

  ACTIVE: {
    label: "Active",
    className: styles.statusActive,
  },

  PAUSED: {
    label: "Paused",
    className: styles.statusPaused,
  },

  CLOSED: {
    label: "Closed",
    className: styles.statusClosed,
  },
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
  // =========================
  // MEMOIZED JOBS
  // =========================
  const tableRows = useMemo(() => {
    return jobs.map((job, index) => {
      const status =
        STATUS_CONFIG[job.status?.toUpperCase()] ||
        STATUS_CONFIG.DRAFT;

      return (
        <tr
          key={job.id}
          className={styles.tableRow}
        >
          {/* CHECKBOX */}
          <td>
            <input
              type="checkbox"
              className={styles.checkbox}
              aria-label={`Select job ${job.title}`}
            />
          </td>

          {/* ID */}
          <td className={styles.techId}>
            {job.id}
          </td>

          {/* JOB INFO */}
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

              <span>
                {job.company?.name || "System"}
              </span>
            </div>
          </td>

          {/* SALARY */}
          <td className={styles.salaryCell}>
            <div className={styles.salaryFlex}>
              <FiDollarSign
                className={styles.salaryIcon}
              />

              <span>
                {formatSalary(
                  job.salaryMin,
                  job.salaryMax
                )}
              </span>
            </div>
          </td>

          {/* STATUS */}
          <td>
            <span
              className={`${styles.statusBadge} ${status.className}`}
            >
              {status.label}
            </span>
          </td>

          {/* DEADLINE */}
          <td className={styles.dateCell}>
            <div className={styles.dateFlex}>
              <FiCalendar
                className={styles.miniIcon}
              />

              <span>
                {job.deadline
                  ? new Date(
                      job.deadline
                    ).toLocaleDateString("vi-VN")
                  : "N/A"}
              </span>
            </div>
          </td>

          {/* ACTIONS */}
          <td>
            <div className={styles.actionIcons}>
              {/* VIEW */}
              {onViewJob && (
                <button
                  type="button"
                  className={`${styles.actionBtn} ${styles.viewBtn}`}
                  onClick={() => onViewJob(job)}
                  aria-label={`View ${job.title}`}
                >
                  <FiEye />
                </button>
              )}

              {/* EDIT */}
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.editBtn}`}
                onClick={() => onEditJob(job)}
                aria-label={`Edit ${job.title}`}
              >
                <FiEdit2 />
              </button>

              {/* DELETE */}
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => onDeleteJob(job)}
                aria-label={`Delete ${job.title}`}
              >
                <FiTrash2 />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }, [jobs, onEditJob, onDeleteJob, onViewJob]);

  // =========================
  // EMPTY STATE
  // =========================
  if (!jobs.length) {
    return (
      <div className={styles.emptyWrapper}>
        <p className={styles.emptyText}>
          No jobs found.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {/* ========================= */}
        {/* TABLE HEAD */}
        {/* ========================= */}
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <input
                type="checkbox"
                className={styles.checkbox}
                aria-label="Select all jobs"
              />
            </th>

            <th style={{ width: 60 }}>
              ID
            </th>

            <th>Job</th>

            <th>Company</th>

            <th>Salary</th>

            <th>Status</th>

            <th>Deadline</th>

            <th style={{ textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>

        {/* ========================= */}
        {/* TABLE BODY */}
        {/* ========================= */}
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default React.memo(RecruitmentTable);