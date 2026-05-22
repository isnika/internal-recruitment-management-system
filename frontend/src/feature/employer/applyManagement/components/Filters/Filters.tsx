import React from "react";
import type { ApplicationStatus } from "../../types/application.types";
import styles from "./Filters.module.css";
import { FiSliders, FiBriefcase, FiActivity } from "react-icons/fi"; // Premium UI iconography icons

type Props = {
  jobFilter: string;
  setJobFilter: (v: string) => void;
  statusFilter: ApplicationStatus | "all";
  setStatusFilter: (v: ApplicationStatus | "all") => void;
  jobs: string[];
};

export default function Filters({
  jobFilter,
  setJobFilter,
  statusFilter,
  setStatusFilter,
  jobs,
}: Props) {
  return (
    <div className={styles.filterControlBar}>
      <div className={styles.sectionTitle}>
        <FiSliders className={styles.titleIcon} />
        <span>Filter Pipeline</span>
      </div>

      <div className={styles.selectorsGroup}>
        {/* Target Job Filter */}
        <div className={styles.selectWrapper}>
          <FiBriefcase className={styles.fieldIcon} />
          <select
            className={styles.customSelect}
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
          >
            <option value="all">All Vancancies / Positions</option>
            {jobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        {/* Application Status Filter */}
        <div className={styles.selectWrapper}>
          <FiActivity className={styles.fieldIcon} />
          <select
            className={styles.customSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
          >
            <option value="all">All Application Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="REVIEWING">In Screening / Reviewing</option>
            <option value="PASSED">Passed / Advanced</option>
            <option value="FAILED">Failed / Rejected</option>
          </select>
        </div>
      </div>
    </div>
  );
}