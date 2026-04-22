import React from "react";
import styles from "./HeroBanner.module.css";

type Props = {
  isFilterOpen: boolean;
  onApply: () => void;
};

const HeroBanner = ({ isFilterOpen, onApply }: Props) => {
  if (isFilterOpen) return null;

  return (
    <section className={styles.heroSection}>
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
          className={styles.primaryButton}
          onClick={onApply}
        >
          Apply Job Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;