import React from "react";
import styles from "./RecruitmentTable.module.css";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatSalary } from "../../../../../service/jobApi";
import type { Job } from "../../../../../types/job";

interface RecruitmentTableProps {
  jobs: Job[];
  onEditJob: (job: Job) => void;
  onDeleteJob: (job: Job) => void;
}

const RecruitmentTable: React.FC<RecruitmentTableProps> = ({ jobs, onEditJob, onDeleteJob }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" className={styles.checkbox} /></th>
            <th>#</th>
            <th>Creator</th>
            <th>Job position</th>
            <th>Department</th>
            <th>Employment type</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id}>
              <td><input type="checkbox" className={styles.checkbox} /></td>
              <td>{index + 1}</td>
              <td>{job.createdBy || "N/A"}</td>
              <td>{job.title}</td>
              <td>{job.department || job.category}</td>
              <td>{job.jobType}</td>
              <td>{formatSalary(job.salary)}</td>
              <td>
                <span className={styles.statusPosted}>Posted</span>
              </td>
              <td>{job.postedAt}</td>
              <td>
                <div className={styles.actionIcons}>
                  <FiEye className={styles.icon} />
                  <FiEdit2 className={styles.icon} onClick={() => onEditJob(job)} />
                  <FiTrash2 className={styles.icon} onClick={() => onDeleteJob(job)} />
                </div>
              </td>
            </tr>
          ))}
          
          {/* Fallback if empty */}
          {jobs.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>No jobs found matching your criteria.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitmentTable;
