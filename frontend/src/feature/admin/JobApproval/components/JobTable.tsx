import React from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import styles from "../pages/JobApproval.module.css";
import type { Job } from "../../../../types/job";

interface JobTableProps {
  filteredJobs: Job[];
  onViewDetails: (job: Job) => void;
  onApprove: (job: Job) => void;
  onReject: (job: Job) => void;
}

const JobTable: React.FC<JobTableProps> = ({
  filteredJobs,
  onViewDetails,
  onApprove,
  onReject,
}) => {
  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Category</th>
            <th>Salary Range</th>
            <th>Location</th>
            <th>Status</th>

            <th
              style={{
                textAlign: "right",
                paddingRight: "24px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              {/* JOB */}
              <td className={styles.jobTitleCell}>
                <div className={styles.jobWrapper}>
                  <img
                    src={
                      job.company?.logoUrl ||
                      "https://images.unsplash.com/photo-1549923746-c502d488f3aa?w=64"
                    }
                    alt={job.title}
                    className={styles.companyLogo}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1549923746-c502d488f3aa?w=64";
                    }}
                  />

                  <div className={styles.jobMeta}>
                    <span className={styles.jobTitle}>
                      {job.title}
                    </span>

                    <span className={styles.jobDepartment}>
                      {job.category?.name || "No Category"} ·{" "}
                      {job.type || "Unknown"}
                    </span>
                  </div>
                </div>
              </td>

              {/* COMPANY */}
              <td className={styles.companyName}>
                {job.company?.name || "Unknown"}
              </td>

              {/* CATEGORY */}
              <td>
                {job.category?.name || "No Category"}
              </td>

              {/* SALARY */}
              <td>
                {job.salaryMin?.toLocaleString()} -{" "}
                {job.salaryMax?.toLocaleString()} VND
              </td>

              {/* LOCATION */}
              <td>{job.location}</td>

              {/* STATUS */}
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[
                      job.status?.toLowerCase() || "draft"
                    ]
                  }`}
                >
                  {job.status}
                </span>
              </td>

              {/* ACTIONS */}
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionBtnBlue}
                    onClick={() => onViewDetails(job)}
                  >
                    <FiEye /> View
                  </button>

                  {job.status !== "ACTIVE" && (
                    <button
                      className={styles.actionBtnGreen}
                      onClick={() => onApprove(job)}
                    >
                      <FiCheck /> Approve
                    </button>
                  )}

                  {job.status !== "CLOSED" && (
                    <button
                      className={styles.actionBtnRed}
                      onClick={() => onReject(job)}
                    >
                      <FiX /> Reject
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {filteredJobs.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className={styles.empty}
              >
                No jobs found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;