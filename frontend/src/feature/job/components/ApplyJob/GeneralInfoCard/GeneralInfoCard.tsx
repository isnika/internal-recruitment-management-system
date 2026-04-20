import styles from "./GeneralInfoCard.module.css";

import { FiUsers, FiClock, FiBriefcase } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { PiGraduationCap } from "react-icons/pi";
import type { Job } from "../../../../../types/job";

const GeneralInfoCard = ({ job }: { job: Job }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>General Information</h3>

      <div className={styles.list}>
        <div className={styles.item}>
          <AiOutlineUser className={styles.icon} />
          <span className={styles.text}>
            Job Title: {job?.title || "Employee"}
          </span>
        </div>

        <div className={styles.item}>
          <PiGraduationCap className={styles.icon} />
          <span className={styles.text}>
            Education: University degree or higher
          </span>
        </div>

        <div className={styles.item}>
          <FiUsers className={styles.icon} />
          <span className={styles.text}>
            Number of Vacancies: 1 person
          </span>
        </div>

        <div className={styles.item}>
          <FiBriefcase className={styles.icon} />
          <span className={styles.text}>
            Employment Type: {job?.jobType || "Full-time"}
          </span>
        </div>

        <div className={styles.item}>
          <FiClock className={styles.icon} />
          <span className={styles.text}>
            Application Deadline: {job?.deadline || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
