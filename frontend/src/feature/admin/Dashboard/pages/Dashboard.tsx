import React, { useState, useEffect } from "react";
import { FiUsers, FiBriefcase, FiFileText } from "react-icons/fi";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from "./Dashboard.module.css";
import reportApi from "../../../../service/reportApi";
import type { OverviewReport, TimeSeriesReport, PipelineReport } from "../../../../service/reportApi";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewReport | null>(null);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesReport | null>(null);
  const [pipeline, setPipeline] = useState<PipelineReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, timeSeriesData, pipelineData] = await Promise.all([
          reportApi.getOverview(),
          reportApi.getTimeSeries(),
          reportApi.getPipeline()
        ]);
        
        const getResult = (res: unknown) => {
          if (res && typeof res === 'object' && 'result' in res) {
            return (res as any).result;
          }
          return res;
        };

        setOverview(getResult(overviewData));
        setTimeSeries(getResult(timeSeriesData));
        setPipeline(getResult(pipelineData));
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading dashboard data...</h2>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className={styles.container} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '20px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #ef4444' }}>
          <h3>Dashboard Error</h3>
          <p>{error || "No data returned from the server."}</p>
        </div>
      </div>
    );
  }

  // Transform Pipeline data into array for recharts
  const pipelineChartData = pipeline ? [
    { stage: 'Applied', count: pipeline.applied },
    { stage: 'Screening', count: pipeline.screening },
    { stage: 'Interview', count: pipeline.interview },
    { stage: 'Test', count: pipeline.test },
    { stage: 'Offer', count: pipeline.offer },
    { stage: 'Hired', count: pipeline.hired },
  ] : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>
          Real-time metrics, active campaigns, and recruitment funnels.
        </p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.blue}`}>
            <FiUsers />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Total Candidates</span>
            <h2 className={styles.value}>{overview.totalCandidates}</h2>
            <span className={styles.trendUp}>Real-time data</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.green}`}>
            <FiBriefcase />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Open Jobs</span>
            <h2 className={styles.value}>{overview.totalOpenJobs}</h2>
            <span className={styles.trendUp}>Active right now</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.orange}`}>
            <FiFileText />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Total Applications</span>
            <h2 className={styles.value}>{overview.totalApplications}</h2>
            <span className={styles.trendUp}>All time</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartsRow}>
        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Applications & Hires (Time Series)</h3>
          <div className={styles.rechartsContainer}>
            {timeSeries && timeSeries.data.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeries.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" name="Applications" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="interviews" stroke="#ffc658" name="Interviews" />
                  <Line type="monotone" dataKey="hires" stroke="#82ca9d" name="Hires" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className={styles.noData}>No time series data available.</p>
            )}
          </div>
        </div>

        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Recruitment Pipeline</h3>
          <div className={styles.rechartsContainer}>
            {pipelineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pipelineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="Candidates" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className={styles.noData}>No pipeline data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
