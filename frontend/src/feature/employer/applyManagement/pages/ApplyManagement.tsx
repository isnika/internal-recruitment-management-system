import React, { useMemo } from "react";
import styles from "./ApplyManagement.module.css";

import Filters from "../components/Filters/Filters";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import CVModal from "../components/CVModal/CVModal";
import ProfileModal from "../components/ProfileModal/ProfileModal";

import { useApplications } from "../hooks/useApplications";
import { mockData } from "../mockData/mockData";
import { FiUsers, FiClock, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

export default function ApplyManagement() {
  const {
    jobs,
    jobFilter,
    setJobFilter,
    statusFilter,
    setStatusFilter,
    filteredData,
    updateStatus,
    selectedCV,
    setSelectedCV,
    selectedProfile,
    setSelectedProfile,
  } = useApplications(mockData);

  // ── FIX: CALCULATE METRICS AGAINST THE ENTIRE DATASET INSTEAD OF FILTERED STREAM ──
  const metrics = useMemo(() => {
    return {
      activePool: filteredData.length, // Shows current query results size dynamically
      totalGlobal: mockData.length,
      pendingGlobal: mockData.filter((app) => app.status === "PENDING").length,
      passedGlobal: mockData.filter((app) => app.status === "PASSED").length,
    };
  }, [filteredData, mockData]);

  return (
    <div className={styles.dashboardContainer}>

      {/* SECTION 1: GLOBAL HEADER BLOCK */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.mainTitle}>Candidate Pipeline</h1>
          <p className={styles.subTitle}>Manage incoming applications, screen professional parameters, and coordinate scheduling paths.</p>
        </div>
        <div className={styles.liveIndicatorBadge}>
          <span className={styles.pulseDot}></span>
          <span>Live Telemetry Channel</span>
        </div>
      </header>

      {/* SECTION 2: METRICS COMPASS BAR GRID */}
      <div className={styles.analyticsStatsGrid}>

        {/* Dynamic Aggregated Metric Card: Total Matching Query */}
        <div className={styles.statCard}>
          <div className={`${styles.iconContainer} ${styles.totalAccent}`}>
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Active Pool Volume</span>
            <h3 className={styles.statValue}>{metrics.activePool}</h3>
            <p className={styles.statFooterSubtext}>Matching current filters</p>
          </div>
        </div>

        {/* Static Aggregated Metric Card: Global Pending Screening */}
        <div className={styles.statCard}>
          <div className={`${styles.iconContainer} ${styles.pendingAccent}`}>
            <FiClock />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Awaiting Initial Review</span>
            <h3 className={styles.statValue}>{metrics.pendingGlobal}</h3>
            <p className={styles.statFooterSubtext}>Total action requested</p>
          </div>
        </div>

        {/* Static Aggregated Metric Card: Global Passed Pipeline */}
        <div className={styles.statCard}>
          <div className={`${styles.iconContainer} ${styles.passedAccent}`}>
            <FiCheckCircle />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Advanced to Next Stage</span>
            <h3 className={styles.statValue}>{metrics.passedGlobal}</h3>
            <p className={styles.statFooterSubtext}>Global qualification pool</p>
          </div>
        </div>

        {/* Informational Global Context Trend Card */}
        <div className={styles.statCard}>
          <div className={`${styles.iconContainer} ${styles.trendAccent}`}>
            <FiTrendingUp />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Target Conversions</span>
            <h3 className={styles.statValue}>
              {metrics.totalGlobal > 0 ? `${Math.round((metrics.passedGlobal / metrics.totalGlobal) * 100)}%` : "0%"}
            </h3>
            <p className={styles.statFooterSubtext}>Overall throughput velocity</p>
          </div>
        </div>

      </div>

      {/* SECTION 3: RECTIFIED PIPELINE FILTERS CONTROL */}
      <div className={styles.controlSectionWrapper}>
        <Filters
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          jobs={jobs}
        />
      </div>

      {/* SECTION 4: DATA TABLE INTERACTION LEDGER */}
      <main className={styles.tableCardContainer}>
        <ApplicationTable
          data={filteredData}
          onViewCV={setSelectedCV}
          onViewProfile={setSelectedProfile}
          onUpdateStatus={updateStatus}
        />
      </main>

      {/* SECTION 5: MODAL MODULAR PORTAL SYSTEM OVERLAYS */}
      <CVModal url={selectedCV} onClose={() => setSelectedCV(null)} />
      <ProfileModal data={selectedProfile} onClose={() => setSelectedProfile(null)} />

    </div>
  );
}