import React from "react";
import styles from "./JobList.module.css";

import JobCard from "../../../job/components/JobCard/JobCard";

import type { Job } from "../../../../types/job";

type Props = {
  jobs?: Job[];
  isLoading: boolean;

  jobListRef?: React.RefObject<HTMLDivElement | null>;

  handleBookmark?: (
    id: number,
    saved: boolean
  ) => void;
};

const JobList = ({
  jobs = [],
  isLoading,
  jobListRef,
  handleBookmark,
}: Props) => {
  return (
    <section
      ref={jobListRef}
      className={styles.jobList}
    >
      {isLoading ? (
        <div className={styles.loadingInfo}>
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className={styles.loadingInfo}>
          No jobs found
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onBookmark={
              handleBookmark ??
              (() => undefined)
            }
          />
        ))
      )}
    </section>
  );
};

export default JobList;