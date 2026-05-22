import React from "react";
import styles from "../pages/StatisticalReport.module.css";

export interface MonthlyData {
  month: string;
  jobs: number;
  candidates: number;
  applications: number;
}

interface MonthlyBreakdownTableProps {
  data: MonthlyData[];
}

const MonthlyBreakdownTable: React.FC<MonthlyBreakdownTableProps> = ({ data }) => {
  return (
    <div className={styles.monthlyCard}>
      <h3 className={styles.sectionTitle}>Monthly Breakdown</h3>
      <div className={styles.monthlyTableWrapper}>
        <table className={styles.monthlyTable}>
          <thead>
            <tr>
              <th>Month</th>
              <th>New Jobs</th>
              <th>Active Candidates</th>
              <th>Applications</th>
              <th>Job Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const prev = data[i - 1];
              const trend = prev ? row.jobs - prev.jobs : 0;
              return (
                <tr key={row.month}>
                  <td className={styles.monthCol}>{row.month}</td>
                  <td>{row.jobs}</td>
                  <td>{row.candidates}</td>
                  <td>{row.applications}</td>
                  <td>
                    {i === 0 ? (
                      <span className={styles.trendNeutral}>—</span>
                    ) : trend >= 0 ? (
                      <span className={styles.trendUp}>▲ +{trend}</span>
                    ) : (
                      <span className={styles.trendDown}>▼ {trend}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyBreakdownTable;
