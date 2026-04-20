
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

import styles from "./JobHeader.module.css";
import { formatSalary, toggleBookmarkApi } from "../../../../service/jobApi";
import type { Job } from "../../../../types/job";

interface JobHeaderProps {
  job: Job;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const JobHeader = ({ job, onBookmarkChange }: JobHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 Sync khi đổi job
  useEffect(() => {
    setIsBookmarked(job.isBookmarked);
  }, [job.isBookmarked]);

  const handleBookmark = async () => {
    if (isLoading) return;

    const nextState = !isBookmarked;

    // ⚡ Optimistic UI (mượt hơn)
    setIsBookmarked(nextState);
    onBookmarkChange?.(nextState);

    try {
      setIsLoading(true);
      await toggleBookmarkApi(job.id);
    } catch (err) {
      // ❌ rollback nếu lỗi
      setIsBookmarked(!nextState);
      onBookmarkChange?.(!nextState);
      console.error("Bookmark error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.headerCard}>
      {/* LOGO */}
      <div className={styles.logoWrapper}>
        <img
          src={job.logo}
          alt={job.title}
          className={styles.logoImage}
        />
      </div>

      {/* INFO */}
      <div className={styles.headerInfo}>
        <h1 className={styles.jobTitle}>{job.title}</h1>
        <p className={styles.jobCategory}>{job.category}</p>

        {/* SKILLS */}
        <div className={styles.skillsRow}>
          <span className={styles.skillsLabel}>Skills:</span>
          {job.skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>

        {/* META */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <BsCash className={styles.metaIconYellow} />
            <span>{formatSalary(job.salary)}</span>
          </div>

          <div className={styles.metaItem}>
            <FiMapPin className={styles.metaIconRed} />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.headerRight}>
        <div className={styles.topRight}>
          <span className={styles.postedAt}>{job.postedAt}</span>

          <button
            className={styles.bookmarkBtn}
            onClick={handleBookmark}
            disabled={isLoading}
            title={isBookmarked ? "Remove bookmark" : "Save job"}
          >
            <FaBookmark
              className={`${styles.bookmarkIcon} ${
                isBookmarked ? styles.bookmarkIconActive : ""
              }`}
            />
          </button>
        </div>

        <button className={styles.applyBtn}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobHeader;

