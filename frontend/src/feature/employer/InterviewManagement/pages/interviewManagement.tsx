import { useMemo, useState } from "react";
import styles from "./InterviewManagement.module.css";

import { mockData } from "../mockData/mockData";
import type { InterviewStatus } from "../types/types";

import InterviewHeader from "../components/InterviewHeader/InterviewHeader";
import InterviewTable from "../components/InterviewTable/InterviewTable";

import ViewInterviewModal from "../components/ViewInterviewModal/ViewInterviewModal";
import RescheduleModal from "../components/RescheduleModal/RescheduleModal";
import UpdateResultModal from "../components/UpdateResultModal/UpdateResultModal";

import useInterviewModals from "../hooks/useInterviewModals";
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi"; // Consistent Iconography System

export default function InterviewManagement() {
  const [statusFilter, setStatusFilter] = useState<InterviewStatus | "ALL">("ALL");

  const {
    selected,
    setSelected,
    openView,
    setOpenView,
    openReschedule,
    setOpenReschedule,
    openUpdate,
    setOpenUpdate,
  } = useInterviewModals();

  // ── CORE LOGIC: FILTER DATA STREAM ──
  const filteredData = useMemo(() => {
    if (statusFilter === "ALL") return mockData;
    return mockData.filter((i) => i.status === statusFilter);
  }, [statusFilter]);

  // ── OPERATIONAL METRICS CALCULATIONS ──
  const metrics = useMemo(() => {
    return {
      total: mockData.length,
      pending: mockData.filter((i) => i.status === "PENDING").length,
      passed: mockData.filter((i) => i.status === "PASSED").length,
      failed: mockData.filter((i) => i.status === "FAILED").length,
    };
  }, []);

  return (
    <div className={styles.wrapper}>

      {/* GLOBAL MANAGEMENT HEADER */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.title}>Interview Management</h1>
          <p className={styles.subtitle}>
            Coordinate interview schedules, update evaluation outcomes, and optimize candidate interaction loops.
          </p>
        </div>
        <div className={styles.activeFilterBadge}>
          <span>View Mode: <strong>{statusFilter === "ALL" ? "All Schedules" : statusFilter}</strong></span>
        </div>
      </header>

      {/* QUAD OPERATIONAL TELEMETRY METRICS DECK */}
      <div className={styles.statsGrid}>

        {/* Card 1: Total Interviews */}
        <div className={styles.statsCard}>
          <div className={`${styles.iconWrapper} ${styles.totalAccent}`}>
            <FiCalendar />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.statsLabel}>Total Interviews</span>
            <strong className={styles.statsValue}>{metrics.total}</strong>
            <span className={styles.cardFooterSubtext}>Campaign cumulative</span>
          </div>
        </div>

        {/* Card 2: Pending Interviews */}
        <div className={styles.statsCard}>
          <div className={`${styles.iconWrapper} ${styles.pendingAccent}`}>
            <FiClock />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.statsLabel}>Awaiting Interview</span>
            <strong className={styles.statsValue}>{metrics.pending}</strong>
            <span className={styles.cardFooterSubtext}>Panel preparation required</span>
          </div>
        </div>

        {/* Card 3: Passed Interviews */}
        <div className={styles.statsCard}>
          <div className={`${styles.iconWrapper} ${styles.passedAccent}`}>
            <FiCheckCircle />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.statsLabel}>Completed / Passed</span>
            <strong className={styles.statsValue}>{metrics.passed}</strong>
            <span className={styles.cardFooterSubtext}>Ready for offer generation</span>
          </div>
        </div>

        {/* Card 4: Failed / Canceled Interviews */}
        <div className={styles.statsCard}>
          <div className={`${styles.iconWrapper} ${styles.failedAccent}`}>
            <FiXCircle />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.statsLabel}>Rejected / Canceled</span>
            <strong className={styles.statsValue}>{metrics.failed}</strong>
            <span className={styles.cardFooterSubtext}>Archived profiles</span>
          </div>
        </div>

      </div>

      {/* FILTER CONTROLS BAR */}
      <div className={styles.filterSectionCard}>
        <InterviewHeader
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <div className={styles.gridSummaryText}>
          Showing <strong>{filteredData.length}</strong> out of <strong>{metrics.total}</strong> interview results.
        </div>
      </div>

      {/* MAIN DATA INTERACTION MATRIX TABLE */}
      <main className={styles.tableDataContainer}>
        <InterviewTable
          data={filteredData}
          onView={(i) => {
            setSelected(i);
            setOpenView(true);
          }}
          onReschedule={(i) => {
            setSelected(i);
            setOpenView(false); // Clear the profile view safely before invoking the scheduler panel
            setSelected(i);
            setOpenReschedule(true);
          }}
          onUpdate={(i) => {
            setSelected(i);
            setOpenUpdate(true);
          }}
        />
      </main>

      {/* MODULAR MODAL CONDITIONAL PORTALS */}
      <ViewInterviewModal
        open={openView}
        onClose={() => setOpenView(false)}
        data={selected}
      />

      <RescheduleModal
        open={openReschedule}
        onClose={() => setOpenReschedule(false)}
        data={selected}
        onSave={(d) => console.log("reschedule:", d)}
      />

      <UpdateResultModal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        data={selected}
        onSave={(d) => console.log("update:", d)}
      />
    </div>
  );
}