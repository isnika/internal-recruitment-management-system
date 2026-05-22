import React from "react";
import { FiAward } from "react-icons/fi";
import styles from "../pages/StatisticalReport.module.css";

interface TopCompaniesListProps {
  companies: [string, number][];
}

const TopCompaniesList: React.FC<TopCompaniesListProps> = ({ companies }) => {
  if (companies.length === 0) return null;

  return (
    <div className={styles.topCompaniesCard}>
      <h3 className={styles.sectionTitle}>
        <FiAward className={styles.sectionIcon} /> Top Companies by Jobs Posted
      </h3>
      <div className={styles.companyList}>
        {companies.map(([name, count], i) => {
          const maxCount = companies[0][1];
          const barWidth = `${(count / maxCount) * 100}%`;
          return (
            <div key={name} className={styles.companyRow}>
              <div className={styles.companyRank}>#{i + 1}</div>
              <div className={styles.companyInfo}>
                <span className={styles.companyName}>{name}</span>
                <div className={styles.companyBarTrack}>
                  <div
                    className={styles.companyBarFill}
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
              <span className={styles.companyCount}>{count} jobs</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCompaniesList;
