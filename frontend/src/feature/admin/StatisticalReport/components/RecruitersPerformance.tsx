import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../pages/StatisticalReport.module.css";
import type { RecruiterReport } from "../../../../service/reportApi";

interface RecruitersPerformanceProps {
  recruiters: RecruiterReport[];
}

const RecruitersPerformance: React.FC<RecruitersPerformanceProps> = ({ recruiters }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecruiters = recruiters.filter(r => 
    r.recruiterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.reportSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Recruiters Performance</h2>
        <div className={styles.filterBar} style={{ margin: 0, padding: 0, border: 'none', boxShadow: 'none', background: 'transparent' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search recruiter..." 
              className={styles.searchInput} 
              style={{ paddingLeft: '36px', height: '40px', borderRadius: '8px', border: '1px solid #ddd' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Jobs</th>
              <th>Candidates</th>
              <th>Hired</th>
              <th>Avg Time</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecruiters.map((r) => (
              <tr key={r.recruiterId}>
                <td style={{ fontWeight: 600 }}>{r.recruiterName}</td>
                <td>{r.totalJobsManaged}</td>
                <td>{r.totalCandidatesHandled}</td>
                <td>{r.totalHired}</td>
                <td>{r.avgTimeToFillDays?.toFixed(1) || 0} days</td>
                <td style={{ minWidth: '160px' }}>
                  <div className={styles.metricValue}>
                    {r.successRate?.toFixed(1) || 0}%
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={`${styles.progressBarFill} ${r.successRate > 50 ? styles.success : r.successRate > 20 ? styles.warning : ''}`}
                      style={{ width: `${Math.min(r.successRate || 0, 100)}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
            {recruiters.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: '40px' }}>No recruiter data found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitersPerformance;
