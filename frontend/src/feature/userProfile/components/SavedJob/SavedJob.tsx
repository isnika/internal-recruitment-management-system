import React, { useState } from "react";
import JobCard from "../../../job/components/JobCard/JobCard";
import styles from "./SavedJob.module.css";
import type { Job } from "../../../../service/jobApi";


const INITIAL_SAVED_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer (ReactJS)",
    category: "Development / IT",
    logo: "https://via.placeholder.com/150",
    skills: ["React", "TypeScript", "CSS Modules", "Next.js", "Redux"],
    salary: { min: 30000000, max: 50000000, currency: "VND" },
    location: "Ho Chi Minh City",
    postedAt: "2 days ago",
    isBookmarked: true,
  },
  {
    id: "job-2",
    title: "UI/UX Product Designer",
    category: "Design / Creative",
    logo: "https://via.placeholder.com/150",
    skills: ["Figma", "Wireframing", "Prototyping"],
    salary: { min: 20000000, max: 35000000, currency: "VND" },
    location: "Ha Noi City (Hybrid)",
    postedAt: "1 week ago",
    isBookmarked: true,
  },
];

export default function SavedJobs() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_SAVED_JOBS);


  const handleBookmark = (id: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
    // Note: Khi kết nối API thật, bạn sẽ gọi một hàm dispatch hoặc hàm API xóa tại đây
  };


  const activeSavedJobs = jobs.filter((job) => job.isBookmarked);

  return (
    <div className={styles.container}>
      {/* Khối Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.pageTitle}>Saved Jobs</h2>
          <span className={styles.jobCount}>
            {activeSavedJobs.length} positions
          </span>
        </div>
        <p className={styles.subtitle}>
          Manage and apply to the career opportunities you have saved.
        </p>
      </div>

      {/* Danh sách JobCard tái sử dụng UI của bạn */}
      {activeSavedJobs.length > 0 ? (
        <div className={styles.jobList}>
          {activeSavedJobs.map((job) => (
            <JobCard key={job.id} job={job} onBookmark={handleBookmark} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📂</div>
          <h3>No saved jobs yet</h3>
          <p>Explore openings and bookmark them to view them here later.</p>
        </div>
      )}
    </div>
  );
}