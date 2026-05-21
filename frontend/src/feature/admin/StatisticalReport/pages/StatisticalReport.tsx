import React from "react";
import { FiUsers, FiBriefcase, FiFileText, FiDownload, FiTrendingUp, FiAward } from "react-icons/fi";
import styles from "./StatisticalReport.module.css";
import StatCard from "../components/StatCard";
import RoleDistributionChart from "../components/RoleDistributionChart";
import JobCategoriesChart from "../components/JobCategoriesChart";
import GrowthChart from "../components/GrowthChart";
import type { User } from "../../../../types/user";
import type { Job } from "../../../../types/job";
import type { ApplicationMock } from "../../../../dataMock/adminMock";

interface StatisticalReportProps {
  users: User[];
  jobs: Job[];
  applications: ApplicationMock[];
}

const StatisticalReport: React.FC<StatisticalReportProps> = ({ users, jobs, applications }) => {
  const totalJobs = jobs.length;
  const totalUsers = users.length;
  const totalApplications = applications.length;

  // Top companies (derived from jobs mock)
  const companyCounts: Record<string, number> = {};
  jobs.forEach((j) => {
    const name = j.company?.name || "Unknown";
    companyCounts[name] = (companyCounts[name] || 0) + 1;
  });
  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Conversion rate: applications / total users
  const conversionRate =
    totalUsers > 0 ? ((totalApplications / totalUsers) * 100).toFixed(1) : "0";

  // Monthly jobs data - calculate based on current totals
  const monthlyData = [
    { month: "Jan", jobs: Math.floor(totalJobs * 0.3), candidates: Math.floor(totalUsers * 0.3), applications: Math.floor(totalApplications * 0.3) },
    { month: "Feb", jobs: Math.floor(totalJobs * 0.45), candidates: Math.floor(totalUsers * 0.45), applications: Math.floor(totalApplications * 0.45) },
    { month: "Mar", jobs: Math.floor(totalJobs * 0.65), candidates: Math.floor(totalUsers * 0.65), applications: Math.floor(totalApplications * 0.65) },
    { month: "Apr", jobs: Math.floor(totalJobs * 0.85), candidates: Math.floor(totalUsers * 0.85), applications: Math.floor(totalApplications * 0.85) },
    { month: "May", jobs: totalJobs, candidates: totalUsers, applications: totalApplications },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Statistics & Reports</h1>
          <p className={styles.pageSub}>
            Monthly performance metrics, top companies, and conversion analytics.
          </p>
        </div>
        <button
          className={styles.btnExport}
          onClick={() => {
            // Simulate export functionality
            const data = {
              totalJobs,
              totalUsers,
              totalApplications,
              conversionRate,
              monthlyData,
              topCompanies,
              exportDate: new Date().toISOString(),
            };
            console.log("Exporting report:", data);
            // In production, this would trigger actual file download
            alert("Report export feature will be implemented with backend integration.");
          }}
        >
          <FiDownload /> Export Report
        </button>
      </div>

      {/* SUMMARY GRID */}
      <div className={styles.summaryGrid}>
        <StatCard
          title="Total Jobs"
          value={totalJobs}
          trend="+12% this month"
          icon={<FiBriefcase />}
          bgColor="#e6f4ff"
          iconColor="#1677ff"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          trend="+8% this month"
          icon={<FiUsers />}
          bgColor="#f6ffed"
          iconColor="#52c41a"
        />
        <StatCard
          title="Applications"
          value={totalApplications}
          trend="+24% this month"
          icon={<FiFileText />}
          bgColor="#fff7e6"
          iconColor="#faad14"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          trend="Candidates → Applications"
          icon={<FiTrendingUp />}
          bgColor="#f9f0ff"
          iconColor="#722ed1"
        />
      </div>

      {/* MONTHLY BREAKDOWN TABLE */}
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
              {monthlyData.map((row, i) => {
                const prev = monthlyData[i - 1];
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

      {/* TOP COMPANIES + CHARTS */}
      <div className={styles.bottomGrid}>
        {/* Top Companies */}
        <div className={styles.topCompaniesCard}>
          <h3 className={styles.sectionTitle}>
            <FiAward className={styles.sectionIcon} /> Top Companies by Jobs Posted
          </h3>
          <div className={styles.companyList}>
            {topCompanies.map(([name, count], i) => {
              const maxCount = topCompanies[0][1];
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

        {/* Role Distribution */}
        <RoleDistributionChart totalUsers={totalUsers} users={users} />
      </div>

      {/* CHARTS GRID */}
      <div className={styles.chartsGrid}>
        <JobCategoriesChart />
        <GrowthChart applications={applications} />
      </div>
    </div>
  );
};

export default StatisticalReport;
