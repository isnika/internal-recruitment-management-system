import React from "react";
import styles from "../pages/StatisticalReport.module.css";

interface RoleDistributionChartProps {
  totalUsers: number;
}

const RoleDistributionChart: React.FC<RoleDistributionChartProps> = ({
  totalUsers,
}) => {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>User Role Distribution</h3>
      <div className={styles.donutSection}>
        <div className={styles.donutRing}>
          <div className={styles.donutCenter}>
            <span className={styles.donutTotal}>{totalUsers}</span>
            <span className={styles.donutLabel}>Total Users</span>
          </div>
        </div>
        <div className={styles.donutLegend}>
          <div className={styles.legendRow}>
            <div
              className={styles.legendDot}
              style={{ backgroundColor: "#faad14" }}
            ></div>
            <span className={styles.legendName}>Admins</span>
            <span className={styles.legendValue}>3</span>
            <span className={styles.legendPct}>30%</span>
          </div>
          <div className={styles.legendRow}>
            <div
              className={styles.legendDot}
              style={{ backgroundColor: "#52c41a" }}
            ></div>
            <span className={styles.legendName}>Employers</span>
            <span className={styles.legendValue}>2</span>
            <span className={styles.legendPct}>20%</span>
          </div>
          <div className={styles.legendRow}>
            <div
              className={styles.legendDot}
              style={{ backgroundColor: "#1677ff" }}
            ></div>
            <span className={styles.legendName}>Candidates</span>
            <span className={styles.legendValue}>5</span>
            <span className={styles.legendPct}>50%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDistributionChart;
