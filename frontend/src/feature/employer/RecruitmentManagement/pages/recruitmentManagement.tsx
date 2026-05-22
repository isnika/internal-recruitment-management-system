import React, { useState, useEffect, useMemo } from "react";
import styles from "./RecruitmentManagement.module.css";
import { fetchJobsApi } from "../../../../service/jobApi";
import type { Job } from "../../../../types/job";

import RecruitmentFilterBar from "../components/RecruitmentFilterBar/RecruitmentFilterBar";
import RecruitmentTable from "../components/RecruitmentTable/RecruitmentTable";
import CreateJobModal from "../components/CreateJobModal/CreateJobModal";
import DeleteJobModal from "../components/DeleteJobModal/DeleteJobModal";

import {
  FiCheckCircle,
  FiXCircle,
  FiFileText,
  FiBriefcase,
  FiPlus
} from "react-icons/fi"; // Consistent Enterprise Icon Set

const normalize = (s?: string) => (s || "").toLowerCase();

const RecruitmentManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [jobType, setJobType] = useState("");

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  // ── LOAD JOBS DATA STREAM ──
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobsApi("View All", 1, 100);
        const myJobs = res.jobs.filter(
          (job: Job) => job.createdBy === "company1"
        );
        setJobs(myJobs);
      } catch (err) {
        console.error("Failed to load jobs from internal telemetry channels", err);
      }
    };
    loadJobs();
  }, []);

  // ── OPERATIONAL STATISTICS DECK GENERATION ──
  const stats = useMemo(() => {
    let posted = 0;
    let closed = 0;
    let draft = 0;

    jobs.forEach((job) => {
      const st = normalize(job.status);
      if (st === "posted") posted++;
      else if (st === "closed") closed++;
      else draft++;
    });

    return {
      total: jobs.length,
      posted,
      closed,
      draft
    };
  }, [jobs]);

  // ── GRANULAR DATAGRID FILTER LOGIC ──
  const filteredJobs = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return jobs.filter((job) => {
      const matchSearch =
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.skills?.some((s) => s.toLowerCase().includes(q));

      const matchDept =
        !department || (job.department || job.category) === department;

      const matchType = !jobType || job.jobType === jobType;

      const matchStatus =
        !status || normalize(job.status) === normalize(status);

      return matchSearch && matchDept && matchType && matchStatus;
    });
  }, [jobs, searchQuery, department, status, jobType]);

  // ── HANDLERS AND MUTATIONS ──
  const handleSaveJob = (newJob: Partial<Job>) => {
    if (editingJob) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === editingJob.id ? { ...j, ...newJob } : j
        )
      );
    } else {
      setJobs((prev) => [newJob as Job, ...prev]);
    }
    setIsCreateModalOpen(false); // Graceful closing state
    setEditingJob(null);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsCreateModalOpen(true);
  };

  const handleDeleteJob = (job: Job) => {
    setDeletingJob(job);
  };

  const handleConfirmDelete = () => {
    if (!deletingJob) return;
    setJobs((prev) => prev.filter((j) => j.id !== deletingJob.id));
    setDeletingJob(null);
  };

  return (
    <div className={styles.recruitmentSection}>

      {/* ATS MASTER HEADER BLOCK */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.mainTitle}>Requisition Hub</h1>
          <p className={styles.subTitle}>
            Author job listings, optimize talent profiles pipelines, and calibrate systemic position requisitions.
          </p>
        </div>
        <button
          className={styles.primaryActionButton}
          onClick={() => {
            setEditingJob(null);
            setIsCreateModalOpen(true);
          }}
        >
          <FiPlus /> <span>Create New Requisition</span>
        </button>
      </header>

      {/* QUAD COMPASS METRICS TELEMETRY GRID */}
      <section className={styles.statsOverviewGrid} aria-label="Job Matrix Indicators">

        {/* Card 1: Total Portfolio Pool */}
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.totalAccent}`}>
            <FiBriefcase />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Total Requisitions</span>
            <strong className={styles.statNumber}>{stats.total}</strong>
            <span className={styles.cardFooterSubtext}>Systemic catalog volume</span>
          </div>
        </div>

        {/* Card 2: Active Market Openings */}
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.postedAccent}`}>
            <FiCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Active Roles</span>
            <strong className={styles.statNumber}>{stats.posted}</strong>
            <span className={styles.cardFooterSubtext}>Live across channels</span>
          </div>
        </div>

        {/* Card 3: Filled/Closed Requisitions */}
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.closedAccent}`}>
            <FiXCircle />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Archived Listings</span>
            <strong className={styles.statNumber}>{stats.closed}</strong>
            <span className={styles.cardFooterSubtext}>Hiring parameters finalized</span>
          </div>
        </div>

        {/* Card 4: Draft Sandbox Profiles */}
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.draftAccent}`}>
            <FiFileText />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statTitle}>Draft / Pre-approval</span>
            <strong className={styles.statNumber}>{stats.draft}</strong>
            <span className={styles.cardFooterSubtext}>Pending review states</span>
          </div>
        </div>

      </section>

      {/* CONTROL DESK FILTER BAR */}
      <div className={styles.filterSectionCard}>
        <RecruitmentFilterBar
          onSearch={setSearchQuery}
          onDepartmentChange={setDepartment}
          onStatusChange={setStatus}
          onEmploymentTypeChange={setJobType}
          onCreateJob={() => {
            setEditingJob(null);
            setIsCreateModalOpen(true);
          }}
        />
        <div className={styles.infoBanner}>
          Showing <strong>{filteredJobs.length}</strong> active open vacancy positions out of <strong>{stats.total}</strong> portfolios.
        </div>
      </div>

      {/* COMPACT INTERACTION MATRIX TABLE DATAGRID */}
      <main className={styles.tableCardContainer}>
        <RecruitmentTable
          jobs={filteredJobs}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
        />
      </main>

      {/* OVERLAY MODAL LAYERS */}
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleSaveJob}
        initialData={editingJob}
      />

      <DeleteJobModal
        isOpen={!!deletingJob}
        jobTitle={deletingJob?.title || ""}
        onClose={() => setDeletingJob(null)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
};

export default RecruitmentManagement;