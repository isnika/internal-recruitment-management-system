import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./JobCard.module.css";

import {
  FiMapPin,
  FiBookmark,
} from "react-icons/fi";

import { BsCash } from "react-icons/bs";

import { FaBookmark } from "react-icons/fa";

import type { Job } from "../../../../types/job";

// =========================
// FORMAT SALARY
// =========================

const formatMoney = (
  value?: number | null
) => {
  if (value == null) {
    return "Thoả thuận";
  }

  return new Intl.NumberFormat(
    "vi-VN"
  ).format(value);
};

const formatSalary = (job: Job) => {
  if (
    job.salaryMin == null &&
    job.salaryMax == null
  ) {
    return "Thoả thuận";
  }

  return `${formatMoney(
    job.salaryMin
  )} - ${formatMoney(
    job.salaryMax
  )} VND`;
};

interface JobCardProps {
  job: Job;

  onBookmark: (
    id: number,
    saved: boolean
  ) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onBookmark,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.jobCard}>
      {/* LOGO */}
      <div className={styles.jobLogoCol}>
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
      <div className={styles.jobInfoCol}>
        <h3 className={styles.jobTitle}>
          {job.title}
        </h3>

        <p className={styles.jobCategory}>
          {job.category?.name}
        </p>

        {/* SKILLS */}
        <div className={styles.jobSkills}>
          <span className={styles.skillLabel}>
            Skills:
          </span>

          {job.skills
            ?.slice(0, 3)
            .map((skill) => (
              <span
                key={skill.id}
                className={styles.skillTag}
              >
                {skill.name}
              </span>
            ))}

          {(job.skills?.length || 0) >
            3 && (
            <span
              className={
                styles.moreSkill
              }
            >
              +
              {job.skills.length -
                3}
            </span>
          )}
        </div>

        {/* META */}
        <div className={styles.jobMetaList}>
          <div className={styles.metaItem}>
            <BsCash
              className={
                styles.metaIconYellow
              }
            />

            <span
              className={
                styles.metaBold
              }
            >
              {formatSalary(job)}
            </span>
          </div>

          <div className={styles.metaItem}>
            <FiMapPin
              className={
                styles.metaIconRed
              }
            />

            <span
              className={
                styles.metaText
              }
            >
              {job.location}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className={styles.jobActionCol}>
        <div className={styles.jobTopRight}>
          <span
            className={
              styles.jobPostedAt
            }
          >
            {job.deadline}
          </span>

          <button
            type="button"
            className={
              styles.bookmarkBtn
            }
            onClick={(e) => {
              e.stopPropagation();

              onBookmark(
                job.id,
                !!job.isSaved
              );
            }}
          >
            {job.isSaved ? (
              <FaBookmark
                className={`${styles.bookmarkIcon} ${styles.bookmarkIconActive}`}
              />
            ) : (
              <FiBookmark
                className={
                  styles.bookmarkIcon
                }
              />
            )}
          </button>
        </div>

        <div
          className={
            styles.actionButtons
          }
        >
          <button
            className={
              styles.viewDetailsBtn
            }
            onClick={() => {
              navigate(
                `/jobs/${job.id}`
              );

              window.scrollTo(
                0,
                0
              );
            }}
          >
            View Details
          </button>

          <button
            className={
              styles.applyBtn
            }
            onClick={() => {
              navigate(
                `/jobs/${job.id}`,
                {
                  state: {
                    autoApply: true,
                  },
                }
              );

              window.scrollTo(
                0,
                0
              );
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;