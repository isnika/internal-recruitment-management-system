import React, { useState, useEffect } from "react";
import { FiUsers, FiBriefcase, FiFileText } from "react-icons/fi";
import styles from "./Dashboard.module.css";
import type { User } from "../../../../types/user";
import type { Job } from "../../../../types/job";
import type { ApplicationMock } from "../../../../dataMock/adminMock";

import { users as initialUsers } from "../../../../dataMock/User";
import { jobs as initialJobs } from "../../../../dataMock/Job";
import { initialApplications } from "../../../../dataMock/adminMock";

const Dashboard: React.FC = () => {
  const users = initialUsers;
  const jobs = initialJobs;
  const applications = initialApplications;
  const totalUsers = users.length;
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simple growth chart calculation (derived values)
  const maxCount = totalApplications;
  const growthData = [
    { month: "Jan", count: Math.floor(maxCount * 0.3), percent: "30%" },
    { month: "Feb", count: Math.floor(maxCount * 0.45), percent: "45%" },
    { month: "Mar", count: Math.floor(maxCount * 0.65), percent: "65%" },
    { month: "Apr", count: Math.floor(maxCount * 0.85), percent: "85%" },
    { month: "May", count: maxCount, percent: "100%" },
  ];

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
            <span className={styles.label}>Total Users</span>
            <h2 className={styles.value}>{totalUsers}</h2>
            <span className={styles.trendUp}>+12.4% vs last month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.green}`}>
            <FiBriefcase />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Total Jobs</span>
            <h2 className={styles.value}>{totalJobs}</h2>
            <span className={styles.trendUp}>+8.1% vs last month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.orange}`}>
            <FiFileText />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Total Applications</span>
            <h2 className={styles.value}>{totalApplications}</h2>
            <span className={styles.trendUp}>+24.5% vs last month</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Monthly Applications Growth</h3>
        <div className={styles.chart}>
          {growthData.map((item, index) => (
            <div key={item.month} className={styles.chartBarRow}>
              <span className={styles.monthLabel}>{item.month}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ 
                    width: animate ? item.percent : "0%",
                    transitionDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>
              <span className={styles.barCount}>{item.count} applications</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
