import React from "react";
import styles from "./JobHeader.module.css";

type Props = {
  startIndex: number;
  jobsPerPage: number;
  totalJobs: number;
};

const JobHeader = ({
  startIndex,
  jobsPerPage,
  totalJobs,
}: Props) => {
  // Trường hợp không tìm thấy job nào, hiển thị 0 kết quả
  if (totalJobs === 0) {
    return (
      <div className={styles.jobsHeader}>
        <span className={styles.showingText}>Showing 0 results</span>
      </div>
    );
  }

  return (
    <div className={styles.jobsHeader}>
      <span className={styles.showingText}>
        Showing {startIndex + 1} -{" "}
        {Math.min(startIndex + jobsPerPage, totalJobs)} of{" "}
        {totalJobs} jobs
      </span>
    </div>
  );
};

export default JobHeader;