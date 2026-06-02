import React from "react";
import styles from "../pages/StatisticalReport.module.css";
import type { CandidateReport, NewCandidatesReport } from "../../../../service/reportApi";

interface CandidateAnalyticsProps {
  candidateAnalytics: CandidateReport | null;
  newCandidates: NewCandidatesReport | null;
}

const CandidateAnalytics: React.FC<CandidateAnalyticsProps> = ({ candidateAnalytics, newCandidates }) => {
  return (
    <div className={styles.reportSection}>
      <h2 className={styles.sectionTitle}>Candidate Analytics</h2>
      <div className={styles.cardGrid}>
        {/* Top Skills Card */}
        <div className={styles.card}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '1.2rem' }}>Top Skills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {candidateAnalytics?.topSkills?.slice(0, 5).map((skill, i) => {
              const maxCount = candidateAnalytics.topSkills[0]?.count || 1;
              const percentage = (skill.count / maxCount) * 100;
              return (
                <div key={i}>
                  <div className={styles.metricValue}>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{skill.skillName}</span>
                    <span style={{ color: '#3b82f6' }}>{skill.count}</span>
                  </div>
                  <div className={styles.progressBarContainer} style={{ height: '6px' }}>
                    <div className={styles.progressBarFill} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
            {(!candidateAnalytics?.topSkills || candidateAnalytics.topSkills.length === 0) && (
              <div style={{ color: '#94a3b8' }}>No skill data available</div>
            )}
          </div>
        </div>

        {/* Experience Level Card */}
        <div className={styles.card}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '1.2rem' }}>Experience Levels</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {candidateAnalytics?.byLevel && Object.entries(candidateAnalytics.byLevel).map(([level, count], i) => (
              <div key={i} style={{ 
                background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', 
                padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                flex: '1 1 calc(50% - 12px)', minWidth: '100px'
              }}>
                <span style={{ textTransform: 'capitalize', color: '#64748b', fontSize: '0.85rem', marginBottom: '4px' }}>{level}</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>{count}</span>
              </div>
            ))}
            {!candidateAnalytics?.byLevel && (
              <div style={{ color: '#94a3b8' }}>No level data available</div>
            )}
          </div>
        </div>
        
        {/* New Candidates Trend Card */}
        <div className={styles.card}>
          <h3 style={{ margin: '0 0 20px', color: '#0f172a', fontSize: '1.2rem' }}>New Candidates Trend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {newCandidates?.data?.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#475569', fontWeight: 500 }}>{item.label}</span>
                <span className={styles.badge} style={{ background: '#eff6ff', color: '#2563eb' }}>
                  +{item.count} new
                </span>
              </div>
            ))}
            {(!newCandidates?.data || newCandidates.data.length === 0) && (
              <div style={{ color: '#94a3b8' }}>No trend data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAnalytics;
