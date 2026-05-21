import React from "react";
import styles from "./JobHeader.module.css";
import { AiOutlineMenu } from "react-icons/ai";

type Props = {
  startIndex: number;
  jobsPerPage: number;
  totalJobs: number;
  isFilterOpen: boolean;
  activeCount: number;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const JobHeader = ({
  startIndex,
  jobsPerPage,
  totalJobs,
  isFilterOpen,
  activeCount,
  setIsFilterOpen,
}: Props) => {
  return (
    <div className={styles.jobsHeader}>
      <span className={styles.showingText}>
        Showing {startIndex + 1} -{" "}
        {Math.min(startIndex + jobsPerPage, totalJobs)} of{" "}
        {totalJobs}
      </span>

      <button
        className={`${styles.filterToggleBtn} ${
          isFilterOpen ? styles.filterToggleBtnActive : ""
        }`}
        onClick={() => setIsFilterOpen(prev => !prev)}
      >
        <AiOutlineMenu size={18} />

        {activeCount > 0 && (
          <span className={styles.filterBadge}>
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default JobHeader;