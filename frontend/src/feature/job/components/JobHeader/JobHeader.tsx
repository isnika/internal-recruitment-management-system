import styles from "./JobHeader.module.css";
import { BsCash } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

import { formatSalary } from "../../../../utils/format";
import type { Job } from "../../../../types/job";

const JobHeader = ({
  job,
  onBookmark,
  onApply,
}: {
  job: Job;
  onBookmark: () => void;
  onApply: () => void;
}) => {
  return (
    <div className={styles.headerCard}>
      <div className={styles.logoWrapper}>
        <img
          src={job.company?.logoUrl}
          alt={job.title}
          className={styles.logoImage}
        />
      </div>

      <div className={styles.headerInfo}>
        <h1 className={styles.jobTitle}>{job.title}</h1>

        <p className={styles.jobCategory}>
          {job.category?.name}
        </p>

        <div className={styles.skillsRow}>
          <span className={styles.skillsLabel}>Skills:</span>

          {job.skills?.map((skill) => (
            <span key={skill.id} className={styles.skillTag}>
              {skill.name}
            </span>
          ))}
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <BsCash className={styles.metaIconYellow} />
            <span>
              {formatSalary(job.salaryMin)} -{" "}
              {formatSalary(job.salaryMax)}
            </span>
          </div>

          <div className={styles.metaItem}>
            <FiMapPin className={styles.metaIconRed} />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.topRight}>
          <span className={styles.postedAt}>
            {job.deadline}
          </span>

          <button
            className={styles.bookmarkBtn}
            onClick={onBookmark}
          >
            <FaBookmark
              className={
                job.isBookmarked
                  ? styles.bookmarkIconActive
                  : styles.bookmarkIcon
              }
            />
          </button>
        </div>

        <button
          className={styles.applyBtn}
          onClick={onApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobHeader;