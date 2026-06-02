import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import styles from "./StatisticalReport.module.css";
import reportApi from "../../../../service/reportApi";
import type { 
  RecruiterReport, 
  DepartmentReport, 
  JobReport,
  NewCandidatesReport,
  CandidateReport
} from "../../../../service/reportApi";

import RecruitersPerformance from "../components/RecruitersPerformance";
import DepartmentsOverview from "../components/DepartmentsOverview";
import JobsAnalytics from "../components/JobsAnalytics";
import CandidateAnalytics from "../components/CandidateAnalytics";

const StatisticalReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState<RecruiterReport[]>([]);
  const [departments, setDepartments] = useState<DepartmentReport[]>([]);
  const [jobs, setJobs] = useState<JobReport[]>([]);
  const [newCandidates, setNewCandidates] = useState<NewCandidatesReport | null>(null);
  const [candidateAnalytics, setCandidateAnalytics] = useState<CandidateReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"recruiters" | "departments" | "jobs" | "candidates">("recruiters");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using allSettled to ensure that if one API fails, the rest still load
        const results = await Promise.allSettled([
          reportApi.getRecruiters(),
          reportApi.getDepartments(),
          reportApi.getJobs(),
          reportApi.getNewCandidates({ period: "month" }),
          reportApi.getCandidates()
        ]);
        
        // Extract .result if it's wrapped in ApiResponse, fallback to null if rejected
        const extractData = (promiseResult: PromiseSettledResult<any>) => {
          if (promiseResult.status === 'fulfilled') {
            const res = promiseResult.value;
            if (res && typeof res === 'object' && 'result' in res) {
              return res.result;
            }
            return res;
          }
          return null; // or empty array depending on usage, handled below
        };

        setRecruiters(extractData(results[0]) || []);
        setDepartments(extractData(results[1]) || []);
        setJobs(extractData(results[2]) || []);
        setNewCandidates(extractData(results[3]) || null);
        setCandidateAnalytics(extractData(results[4]) || null);
        
        // If ALL of them failed, then we show an error
        if (results.every(r => r.status === 'rejected')) {
          setError("Failed to load all statistical reports from the backend.");
        } else if (results.some(r => r.status === 'rejected')) {
          // Just log a warning, partial data will be shown
          console.warn("Some report APIs failed to load.");
        }
        
      } catch (err) {
        console.error("Report error:", err);
        setError("An unexpected error occurred while loading reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.page} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading statistical reports...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '20px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #ef4444' }}>
          <h3>Report Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Statistics & Reports</h1>
          <p className={styles.pageSub}>
            Detailed analytics for Recruiters, Departments, and Jobs.
          </p>
        </div>
        <button
          className={styles.btnExport}
          onClick={() => {
            alert("Export functionality will trigger a CSV/Excel download from backend.");
          }}
        >
          <FiDownload /> Export Reports
        </button>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabItem} ${activeTab === 'recruiters' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('recruiters')}
        >
          Recruiters Performance
        </button>
        <button 
          className={`${styles.tabItem} ${activeTab === 'departments' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          Departments Overview
        </button>
        <button 
          className={`${styles.tabItem} ${activeTab === 'jobs' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Jobs Analytics
        </button>
        <button 
          className={`${styles.tabItem} ${activeTab === 'candidates' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          Candidate Pool
        </button>
      </div>

      {activeTab === 'recruiters' && <RecruitersPerformance recruiters={recruiters} />}
      {activeTab === 'departments' && <DepartmentsOverview departments={departments} />}
      {activeTab === 'jobs' && <JobsAnalytics jobs={jobs} />}
      {activeTab === 'candidates' && <CandidateAnalytics candidateAnalytics={candidateAnalytics} newCandidates={newCandidates} />}
    </div>
  );
};

export default StatisticalReport;
