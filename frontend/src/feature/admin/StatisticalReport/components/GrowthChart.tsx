import React from "react";
import styles from "../pages/StatisticalReport.module.css";

const GrowthChart: React.FC = () => {
  return (
    <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
      <h3 className={styles.chartTitle}>Monthly Application Growth</h3>
      <div className={styles.growthList}>
        <div className={styles.growthRow}>
          <span className={styles.growthMonth}>Jan</span>
          <div className={styles.growthBarTrack}>
            <div className={styles.growthBarFill} style={{ width: "35%" }}></div>
          </div>
          <span className={styles.growthValue}>120</span>
          <span className={styles.growthPct} style={{ color: "#52c41a" }}>
            +15%
          </span>
        </div>
        <div className={styles.growthRow}>
          <span className={styles.growthMonth}>Feb</span>
          <div className={styles.growthBarTrack}>
            <div className={styles.growthBarFill} style={{ width: "50%" }}></div>
          </div>
          <span className={styles.growthValue}>165</span>
          <span className={styles.growthPct} style={{ color: "#52c41a" }}>
            +37%
          </span>
        </div>
        <div className={styles.growthRow}>
          <span className={styles.growthMonth}>Mar</span>
          <div className={styles.growthBarTrack}>
            <div className={styles.growthBarFill} style={{ width: "65%" }}></div>
          </div>
          <span className={styles.growthValue}>210</span>
          <span className={styles.growthPct} style={{ color: "#52c41a" }}>
            +27%
          </span>
        </div>
        <div className={styles.growthRow}>
          <span className={styles.growthMonth}>Apr</span>
          <div className={styles.growthBarTrack}>
            <div className={styles.growthBarFill} style={{ width: "90%" }}></div>
          </div>
          <span className={styles.growthValue}>324</span>
          <span className={styles.growthPct} style={{ color: "#52c41a" }}>
            +54%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;
