import React from "react";
import styles from "../../pages/Home/Home.module.css";

const CTASection = ({ onExplore }) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaOverlay}></div>
        <div className={styles.ctaContent}>
          <h2>Grow Your Career Within Company A</h2>
          <p>
            Explore internal opportunities across all branches and take your
            next step in your career journey.
          </p>
          <button className={styles.ctaBtn} onClick={onExplore}>
            Explore Internal Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;