import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../pages/StatisticalReport.module.css";
import type { JobReport } from "../../../../service/reportApi";

interface JobsAnalyticsProps {
  jobs: JobReport[];
}

const JobsAnalytics: React.FC<JobsAnalyticsProps> = ({ jobs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(j => 
    j.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.reportSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Jobs Analytics</h2>
        <div className={styles.filterBar} style={{ margin: 0, padding: 0, border: 'none', boxShadow: 'none', background: 'transparent' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
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
              <th>Job Title</th>
              <th>Applied</th>
              <th>CV Passed</th>
              <th>Interviewed</th>
              <th>Offered</th>
              <th>Hired</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((j) => {
              const hireRate = j.totalApplied ? (j.totalHired / j.totalApplied) * 100 : 0;
              return (
                <tr key={j.jobId}>
                  <td style={{ fontWeight: 600, color: '#2563eb' }}>{j.jobTitle}</td>
                  <td>{j.totalApplied}</td>
                  <td>{j.totalCvPassed}</td>
                  <td>{j.totalInterviewed}</td>
                  <td>{j.totalOffered}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#10b981' }}>{j.totalHired}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({hireRate.toFixed(0)}%)</span>
                    </div>
                  </td>
                </tr>
              );
            })}
            {jobs.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: '40px' }}>No job data found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsAnalytics;
