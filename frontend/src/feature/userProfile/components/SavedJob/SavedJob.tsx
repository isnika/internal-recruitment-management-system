import React, {
  useEffect,
  useState,
} from "react";

import JobCard from "../../../job/components/JobCard/JobCard";

import styles from "./SavedJob.module.css";

import type { Job } from "../../../../types/job";

import savedJobApi from "../../../../service/savedJobApi";

const SavedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(
    []
  );

  const [loading, setLoading] =
    useState(false);

  // FETCH SAVED JOBS
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const res =
        await savedJobApi.getAll();

      // Gắn isSaved để đồng bộ UI
      const jobsWithSaved = res.map(
        (job: Job) => ({
          ...job,
          isSaved: true,
        })
      );

      setJobs(jobsWithSaved);
    } catch (error) {
      console.error(
        "Fetch saved jobs failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // BOOKMARK / UNBOOKMARK
  const handleBookmark = async (
    id: number,
    saved: boolean
  ) => {
    try {
      // Optimistic UI
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id
            ? {
                ...job,
                isSaved: !saved,
              }
            : job
        )
      );

      if (saved) {
        await savedJobApi.remove(id);

        // Remove khỏi danh sách saved
        setJobs((prevJobs) =>
          prevJobs.filter(
            (job) => job.id !== id
          )
        );
      } else {
        await savedJobApi.save(id);
      }
    } catch (error) {
      console.error(
        "Bookmark action failed:",
        error
      );

      // rollback nếu lỗi
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === id
            ? {
                ...job,
                isSaved: saved,
              }
            : job
        )
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.pageTitle}>
            Saved Jobs
          </h2>

          <span className={styles.jobCount}>
            {jobs.length} positions
          </span>
        </div>

        <p className={styles.subtitle}>
          Manage and apply to the career
          opportunities you have saved.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className={styles.loadingState}>
          Loading saved jobs...
        </div>
      ) : jobs.length > 0 ? (
        /* JOB LIST */
        <div className={styles.jobList}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onBookmark={
                handleBookmark
              }
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            📂
          </div>

          <h3>No saved jobs yet</h3>

          <p>
            Explore openings and bookmark
            them to view them here later.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;