import React from "react";
import styles from "../pages/StatisticalReport.module.css";
import type { DepartmentReport } from "../../../../service/reportApi";

interface DepartmentsOverviewProps {
  departments: DepartmentReport[];
}

const DepartmentsOverview: React.FC<DepartmentsOverviewProps> = ({ departments }) => {
  return (
    <div className={styles.reportSection}>
      <h2 className={styles.sectionTitle}>Departments Overview</h2>
      <div className={styles.cardGrid}>
        {departments.map((d, i) => (
          <div key={i} className={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: '#0f172a' }}>{d.departmentName}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Open Headcount</span>
                <span className={`${styles.badge} ${d.openHeadcount > 0 ? styles.badgePrimary : styles.badgeSuccess}`}>
                  {d.openHeadcount} positions
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Total Jobs</span>
                <span style={{ fontWeight: 600 }}>{d.totalJobs}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Candidates Processed</span>
                <span style={{ fontWeight: 600 }}>{d.totalCandidates}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Successful Hires</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>{d.totalHired}</span>
              </div>
            </div>
          </div>
        ))}
        {departments.length === 0 && (
          <div style={{ padding: '20px', color: '#64748b' }}>No department data available.</div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsOverview;
