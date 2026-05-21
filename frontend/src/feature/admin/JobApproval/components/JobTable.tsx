import React from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import styles from "../pages/JobApproval.module.css";
import type { Job } from "../../../../types/job";

interface JobTableProps {
  filteredJobs: Job[];
  onViewDetails: (job: Job) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
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
            <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td className={styles.jobTitleCell}>
                <div className={styles.jobWrapper}>
                  <img
                    src={job.logo || "https://images.unsplash.com/photo-1549923746-c502d488f3aa?w=64"}
                    alt={job.title}
                    className={styles.companyLogo}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1549923746-c502d488f3aa?w=64";
                    }}
                  />
                  <div className={styles.jobMeta}>
                    <span className={styles.jobTitle}>{job.title}</span>
                    <span className={styles.jobDepartment}>
                      {job.department} · {job.jobType}
                    </span>
                  </div>
                </div>
              </td>
              <td className={styles.companyName}>{job.company?.name || "Unknown"}</td>
              <td>{job.category}</td>
              <td>
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}{" "}
                {job.salary.currency}
              </td>
              <td>{job.location}</td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    styles[job.status || "pending"]
                  }`}
                >
                  {job.status || "Pending"}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionBtnBlue}
                    title="View Details"
                    onClick={() => onViewDetails(job)}
                    aria-label={`View details for ${job.title}`}
                  >
                    <FiEye /> View
                  </button>
                  {(job.status || "pending") === "pending" && (
                    <>
                      <button
                        className={styles.actionBtnGreen}
                        title="Approve Job"
                        onClick={() => onApprove(job.id)}
                        aria-label={`Approve ${job.title}`}
                      >
                        <FiCheck /> Approve
                      </button>
                      <button
                        className={styles.actionBtnRed}
                        title="Reject Job"
                        onClick={() => onReject(job.id)}
                        aria-label={`Reject ${job.title}`}
                      >
                        <FiX /> Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {filteredJobs.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
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
