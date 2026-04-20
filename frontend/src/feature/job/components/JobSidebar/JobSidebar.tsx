import styles from "./JobSidebar.module.css";

import { FiUsers, FiClock, FiBriefcase } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { PiGraduationCap } from "react-icons/pi";

const JobSidebar = ({ job, isApplying = false }: any) => {
  return (
    <>
      {/* General Info */}
      <div className={styles.generalInfoCard}>
        <h3 className={styles.generalInfoTitle}>General Information</h3>

        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <AiOutlineUser className={styles.infoIcon} />
            <span className={styles.infoText}>
              Job Title: {job?.title || "Employee"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <PiGraduationCap className={styles.infoIcon} />
            <span className={styles.infoText}>
              Education: {job?.education || "University degree or higher"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiUsers className={styles.infoIcon} />
            <span className={styles.infoText}>
              Number of Vacancies: {job?.vacancies || 1}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiBriefcase className={styles.infoIcon} />
            <span className={styles.infoText}>
              Employment Type: {job?.jobType || "Full-time"}
            </span>
          </div>

          <div className={styles.infoItem}>
            <FiClock className={styles.infoIcon} />
            <span className={styles.infoText}>
              Application Deadline: {job?.deadline || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {!isApplying && (
        <>
          {/* See more */}
      <h3 className={styles.seeMoreTitle}>See more</h3>

      {/* Skill Tags */}
      <div className={styles.blueCard}>
        <h4 className={styles.blueCardTitle}>Skill Tags</h4>
        <div className={styles.blueCardList}>
          {(job?.skills || [
            "ReactJs",
            "Java",
            "JavaScript",
            "TypeScript",
            "Adobe",
            "UI/UX",
            "Data Analyst",
            "Python",
          ]).map((skill: string) => (
            <span key={skill} className={styles.blueCardItem}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Department */}
      <div className={styles.blueCard}>
        <h4 className={styles.blueCardTitle}>Department</h4>
        <div className={styles.blueCardList}>
          {(job?.departments || [
            "IT / Software",
            "Marketing",
            "Business / Sales",
            "Design",
            "Finance",
            "HR",
            "Operations",
            "Customer Service",
          ]).map((dep: string, i: number) => (
            <span
              key={dep}
              className={
                i === 2
                  ? styles.blueCardItemActive
                  : styles.blueCardItem
              }
            >
              {dep}
            </span>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className={styles.blueCard}>
        <h4 className={styles.blueCardTitle}>Salary</h4>
        <div className={styles.blueCardList}>
          {(job?.salaryRanges || [
            "Under 10M",
            "10M - 20M",
            "20M - 30M",
            "> 30M",
            "Negotiable",
          ]).map((salary: string) => (
            <span key={salary} className={styles.blueCardItem}>
              {salary}
            </span>
          ))}
        </div>
      </div>
      </>
      )}
    </>
  );
};

export default JobSidebar;