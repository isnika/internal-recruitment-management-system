import { useNavigate, useParams } from "react-router-dom";
import styles from "./JobHeader.module.css";
import { BsCash } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { formatSalary } from "../../../../service/jobApi";
import type { Job } from "../../../../types/job";

const JobHeader = ({
  job,
  onBookmark,
}: {
  job: Job;
  onBookmark: () => void;
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

  return (
    <div className={styles.headerCard}>
      <div className={styles.logoWrapper}>
        <img
          src={job.logo}
          alt={job.title}
          className={styles.logoImage}
        />
      </div>

      <div className={styles.headerInfo}>
        <h1 className={styles.jobTitle}>{job.title}</h1>
        <p className={styles.jobCategory}>{job.category}</p>

        <div className={styles.skillsRow}>
          <span className={styles.skillsLabel}>Skills:</span>
          {job.skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>

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

      <div className={styles.headerRight}>
        <div className={styles.topRight}>
          <span className={styles.postedAt}>{job.postedAt}</span>

          <button
            className={styles.bookmarkBtn}
            onClick={onBookmark}
            title={
              job.isBookmarked
                ? "Remove bookmark"
                : "Bookmark this job"
            }
          >
            <FaBookmark
              className={`${styles.bookmarkIcon} ${
                job.isBookmarked ? styles.bookmarkIconActive : ""
              }`}
            />
          </button>
        </div>

        <button className={styles.applyBtn} onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobHeader;