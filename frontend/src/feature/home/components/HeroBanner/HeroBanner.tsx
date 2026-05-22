import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroBanner.module.css";

type Props = {
  isFilterOpen?: boolean;
};

const HeroBanner = ({ isFilterOpen }: Props) => {
  const navigate = useNavigate();

  if (isFilterOpen) return null;

  const handleGoToJobs = () => {
    navigate("/jobPage"); // j
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Build a sustainable career with{" "}
            <span className={styles.logoWhite}>H</span>
            <span className={styles.logoBlue}>KK</span>
            <span className={styles.logoWhite}>Q</span>
          </h1>

          <p className={styles.heroSubtitle}>
            We are looking for talented individuals who are ready to
            innovate and create value that makes a difference.
          </p>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGoToJobs}
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;