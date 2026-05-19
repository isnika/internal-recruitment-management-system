import React from "react";
import styles from "../pages/StatisticalReport.module.css";

interface StatCardProps {
  title: string;
  value: number | string;
  trend: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className={styles.summaryCard}>
      <div
        className={styles.summaryIcon}
        style={{ backgroundColor: bgColor, color: iconColor }}
      >
        {icon}
      </div>
      <div className={styles.summaryInfo}>
        <span className={styles.summaryLabel}>{title}</span>
        <h2 className={styles.summaryValue}>{value}</h2>
        <span className={styles.summaryTrend}>{trend}</span>
      </div>
    </div>
  );
};

export default StatCard;
