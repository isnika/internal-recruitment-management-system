import styles from "./JobSidebar.module.css";

import {
  FiUsers,
  FiClock,
  FiBriefcase,
  FiMapPin,
} from "react-icons/fi";

import { AiOutlineUser } from "react-icons/ai";

import { PiGraduationCap } from "react-icons/pi";

import type { Job } from "../../../../types/job";

interface JobSidebarProps {
  job: Job;

  isApplying?: boolean;
}

const JobSidebar = ({
  job,
  isApplying = false,
}: JobSidebarProps) => {
  // FORMAT SALARY
  const formatSalary = () => {
    const min =
      job?.salary?.min / 1000000 || 0;

    const max =
      job?.salary?.max / 1000000 || 0;

    return `${min}M - ${max}M VND`;
  };

  return (
    <>
      {/* GENERAL INFO */}
      <div className={styles.generalInfoCard}>
        <h3 className={styles.generalInfoTitle}>
          General Information
        </h3>

        <div className={styles.infoList}>
          {/* JOB TITLE */}
          <div className={styles.infoItem}>
            <AiOutlineUser
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Job Title:{" "}
              {job?.title || "Employee"}
            </span>
          </div>

          {/* EXPERIENCE */}
          <div className={styles.infoItem}>
            <PiGraduationCap
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Experience Level:{" "}
              {job?.experienceLevel ||
                "Not specified"}
            </span>
          </div>

          {/* LOCATION */}
          <div className={styles.infoItem}>
            <FiMapPin
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Location:{" "}
              {job?.location ||
                "Not specified"}
            </span>
          </div>

          {/* JOB TYPE */}
          <div className={styles.infoItem}>
            <FiBriefcase
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Employment Type:{" "}
              {job?.jobType || "Full-time"}
            </span>
          </div>

          {/* DEADLINE */}
          <div className={styles.infoItem}>
            <FiClock
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Application Deadline:{" "}
              {job?.deadline || "N/A"}
            </span>
          </div>

          {/* COMPANY */}
          <div className={styles.infoItem}>
            <FiUsers
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Company:{" "}
              {job?.company?.name ||
                "Unknown"}
            </span>
          </div>
        </div>
      </div>

      {!isApplying && (
        <>
          {/* SEE MORE */}
          <h3 className={styles.seeMoreTitle}>
            See more
          </h3>

          {/* SKILLS */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Skill Tags
            </h4>

            <div
              className={styles.blueCardList}
            >
              {(job?.skills || []).map(
                (skill: string) => (
                  <span
                    key={skill}
                    className={
                      styles.blueCardItem
                    }
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* DEPARTMENT */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Department
            </h4>

            <div
              className={styles.blueCardList}
            >
              <span
                className={
                  styles.blueCardItemActive
                }
              >
                {job?.department ||
                  job?.category ||
                  "General"}
              </span>
            </div>
          </div>

          {/* SALARY */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Salary
            </h4>

            <div
              className={styles.blueCardList}
            >
              <span
                className={
                  styles.blueCardItem
                }
              >
                {formatSalary()}
              </span>
            </div>
          </div>

          {/* STATUS */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Status
            </h4>

            <div
              className={styles.blueCardList}
            >
              <span
                className={
                  styles.blueCardItem
                }
              >
                {job?.status || "OPEN"}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobSidebar;