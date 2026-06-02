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
  const formatSalary = () => {
    return `$${job.salaryMin} - $${job.salaryMax}`;
  };

  return (
    <>
      {/* GENERAL INFO */}
      <div className={styles.generalInfoCard}>
        <h3 className={styles.generalInfoTitle}>
          General Information
        </h3>

        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <AiOutlineUser
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Job Title: {job.title}
            </span>
          </div>

          <div className={styles.infoItem}>
            <PiGraduationCap
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Experience Level:{" "}
              {job.experienceLevel?.name ||
                "Not specified"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiMapPin
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Location: {job.location}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Employment Type: {job.type}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiClock
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Deadline: {job.deadline}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiUsers
              className={styles.infoIcon}
            />

            <span className={styles.infoText}>
              Company:{" "}
              {job.company?.name}
            </span>
          </div>
        </div>
      </div>

      {!isApplying && (
        <>
          {/* SKILLS */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Skills
            </h4>

            <div
              className={styles.blueCardList}
            >
              {(job.skills || []).map(
                (skill) => (
                  <span
                    key={skill.id}
                    className={
                      styles.blueCardItem
                    }
                  >
                    {skill.name}
                  </span>
                )
              )}
            </div>
          </div>

          {/* CATEGORY */}
          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>
              Category
            </h4>

            <div
              className={styles.blueCardList}
            >
              <span
                className={
                  styles.blueCardItemActive
                }
              >
                {job.category?.name}
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
       {/* STATUS */}
                 <div className={styles.blueCard}>
                   <h4 className={styles.blueCardTitle}>
                     Status
                   </h4>

                   <div className={styles.blueCardList}>
                     {(() => {
                       const statusUpper = job.status?.toUpperCase();
                       let statusClass = styles.statusActive;
                       let dotClass = styles.dotActive;

                       if (statusUpper === "CLOSED") {
                         statusClass = styles.statusClosed;
                         dotClass = styles.dotClosed;
                       } else if (statusUpper === "PAUSED") {
                         statusClass = styles.statusPaused;
                         dotClass = styles.dotPaused;
                       }

                       return (
                         <span className={`${styles.statusBadge} ${statusClass}`}>
                           <span className={`${styles.statusDot} ${dotClass}`}></span>
                           {job.status}
                         </span>
                       );
                     })()}
                   </div>
                 </div>
        </>
      )}
    </>
  );
};

export default JobSidebar;