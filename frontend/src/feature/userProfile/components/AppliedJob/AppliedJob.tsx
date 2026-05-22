import React, { useState } from "react";
import styles from "./AppliedJob.module.css";
import ViewDetailsAppliedJobsModal from "./ViewDetailsAppliedJobsModal/ViewDetailsAppliedJobsModal";

const APPLIED_JOBS_MOCK = [
  { id: 1, title: "Senior Frontend Developer", company: "TechVibe Solutions", appliedDate: "May 20, 2026", status: "Pending" },
  { id: 2, title: "UI/UX Product Designer", company: "Nexus Studio", appliedDate: "May 15, 2026", status: "Accepted" },
];

export default function AppliedJobs() {
  // State quản lý job đang được chọn để view chi tiết
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Applied Jobs</h2>
        <span className={styles.jobCount}>{APPLIED_JOBS_MOCK.length} applications</span>
      </div>
      <p className={styles.subtitle}>Track your application status and progress.</p>

      <div className={styles.tableWrapper}>
        <table className={styles.jobTable}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {APPLIED_JOBS_MOCK.map((job) => (
              <tr key={job.id}>
                <td><strong>{job.title}</strong></td>
                <td>{job.company}</td>
                <td>{job.appliedDate}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[job.status.toLowerCase()]}`}>
                    {job.status}
                  </span>
                </td>
                <td>
                  {/* Nút trigger mở Modal */}
                  <button
                    className={styles.viewBtn}
                    onClick={() => setSelectedJob(job)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị khi có job được chọn */}
      <ViewDetailsAppliedJobsModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
    </div>
  );
}