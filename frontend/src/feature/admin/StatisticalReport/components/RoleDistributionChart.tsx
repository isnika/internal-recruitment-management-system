import React from "react";
import styles from "../pages/StatisticalReport.module.css";

interface RoleDistributionChartProps {
  totalUsers: number;
  users?: Array<{ role: string }>;
}

const RoleDistributionChart: React.FC<RoleDistributionChartProps> = ({
  totalUsers,
  users = [],
}) => {
  // Calculate role distribution from actual users data
  const roleCounts = users.reduce((acc, user) => {
    const role = user.role.toLowerCase();
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const adminCount = roleCounts.admin || 0;
  const employerCount = roleCounts.company || 0;
  const candidateCount = roleCounts.candidate || 0;
  const hrCount = roleCounts.hr || 0;

  const adminPct = totalUsers > 0 ? Math.round((adminCount / totalUsers) * 100) : 0;
  const employerPct = totalUsers > 0 ? Math.round((employerCount / totalUsers) * 100) : 0;
  const candidatePct = totalUsers > 0 ? Math.round((candidateCount / totalUsers) * 100) : 0;
  const hrPct = totalUsers > 0 ? Math.round((hrCount / totalUsers) * 100) : 0;

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
            <span className={styles.legendValue}>{adminCount}</span>
            <span className={styles.legendPct}>{adminPct}%</span>
          </div>
          <div className={styles.legendRow}>
            <div
              className={styles.legendDot}
              style={{ backgroundColor: "#52c41a" }}
            ></div>
            <span className={styles.legendName}>Employers</span>
            <span className={styles.legendValue}>{employerCount}</span>
            <span className={styles.legendPct}>{employerPct}%</span>
          </div>
          <div className={styles.legendRow}>
            <div
              className={styles.legendDot}
              style={{ backgroundColor: "#1677ff" }}
            ></div>
            <span className={styles.legendName}>Candidates</span>
            <span className={styles.legendValue}>{candidateCount}</span>
            <span className={styles.legendPct}>{candidatePct}%</span>
          </div>
          {hrCount > 0 && (
            <div className={styles.legendRow}>
              <div
                className={styles.legendDot}
                style={{ backgroundColor: "#722ed1" }}
              ></div>
              <span className={styles.legendName}>HR</span>
              <span className={styles.legendValue}>{hrCount}</span>
              <span className={styles.legendPct}>{hrPct}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleDistributionChart;
