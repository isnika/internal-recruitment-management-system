import React from "react";
import styles from "../pages/StatisticalReport.module.css";

const JobCategoriesChart: React.FC = () => {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Popular Job Categories</h3>
      <div className={styles.barList}>
        <div className={styles.barRow}>
          <span className={styles.barName}>Information Technology</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: "85%", backgroundColor: "#1677ff" }}
            ></div>
          </div>
          <span className={styles.barValue}>85</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barName}>Marketing & Sales</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: "65%", backgroundColor: "#52c41a" }}
            ></div>
          </div>
          <span className={styles.barValue}>65</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barName}>Design & Creative</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: "45%", backgroundColor: "#faad14" }}
            ></div>
          </div>
          <span className={styles.barValue}>45</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barName}>Administration</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: "30%", backgroundColor: "#ff4d4f" }}
            ></div>
          </div>
          <span className={styles.barValue}>30</span>
        </div>
      </div>
    </div>
  );
};

export default JobCategoriesChart;
