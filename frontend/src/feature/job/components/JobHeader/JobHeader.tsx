import styles from "./JobHeader.module.css";

import { BsCash } from "react-icons/bs";

import { FiMapPin } from "react-icons/fi";

import {
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import { formatSalary } from "../../../../utils/format";

import type { Job } from "../../../../types/job";

interface JobHeaderProps {
  job: Job;
  onBookmark: () => void;
  onApply: () => void;
}

const JobHeader: React.FC<
  JobHeaderProps
> = ({
  job,
  onBookmark,
  onApply,
}) => {
  return (
    <div className={styles.headerCard}>
      {/* LOGO */}
      <div className={styles.logoWrapper}>
        <img
          src={
            job.company?.logoUrl ||
            "/images/default-company.png"
          }
          alt={job.title}
          className={styles.logoImage}
        />
      </div>

      {/* INFO */}
      <div className={styles.headerInfo}>
        <h1 className={styles.jobTitle}>
          {job.title}
        </h1>

        <p className={styles.jobCategory}>
          {job.category?.name}
        </p>

        {/* SKILLS */}
        <div className={styles.skillsRow}>
          <span
            className={
              styles.skillsLabel
            }
          >
            Skills:
          </span>

          {job.skills?.map(
            (skill) => (
              <span
                key={skill.id}
                className={
                  styles.skillTag
                }
              >
                {skill.name}
              </span>
            )
          )}
        </div>

        {/* META */}
        <div className={styles.metaRow}>
          <div
            className={
              styles.metaItem
            }
          >
            <BsCash
              className={
                styles.metaIconYellow
              }
            />

            <span>
              {job.salaryMin !=
                null ||
              job.salaryMax != null
                ? `${formatSalary(
                    job.salaryMin
                  )} - ${formatSalary(
                    job.salaryMax
                  )}`
                : "Thoả thuận"}
            </span>
          </div>

          <div
            className={
              styles.metaItem
            }
          >
            <FiMapPin
              className={
                styles.metaIconRed
              }
            />

            <span>
              {job.location}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div
        className={
          styles.headerRight
        }
      >
        <div
          className={
            styles.topRight
          }
        >
          <span
            className={
              styles.postedAt
            }
          >
            {job.deadline}
          </span>

          <button
            type="button"
            className={
              styles.bookmarkBtn
            }
            onClick={onBookmark}
          >
            {job.isSaved ? (
              <FaBookmark
                className={`${styles.bookmarkIcon} ${styles.bookmarkIconActive}`}
              />
            ) : (
              <FaRegBookmark
                className={
                  styles.bookmarkIcon
                }
              />
            )}
          </button>
        </div>

        <button
          className={
            styles.applyBtn
          }
          onClick={onApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobHeader;