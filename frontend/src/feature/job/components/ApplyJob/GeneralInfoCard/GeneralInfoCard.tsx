import styles from "./GeneralInfoCard.module.css";

import { FiUsers, FiClock, FiBriefcase } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { PiGraduationCap } from "react-icons/pi";
import type { Job } from "../../../../../types/job";

const GeneralInfoCard = ({ job }: { job: Job }) => {
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
    </>
  );
};

export default GeneralInfoCard;
