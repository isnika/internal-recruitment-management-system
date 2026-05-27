import React, { useState, useEffect, useMemo } from "react";
import styles from "./RecruitmentManagement.module.css";
import { jobApi } from "../../../../service/jobApi";
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
} from "react-icons/fi";

const normalize = (s?: string) => (s || "").toLowerCase();

const RecruitmentManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [jobType, setJobType] = useState("");

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  // =========================
  // RESET PAGE WHEN FILTER CHANGE
  // =========================
  useEffect(() => {
    setPage(1);
  }, [searchQuery, status, jobType, department]);

  // =========================
  // LOAD JOBS (SERVER SIDE)
  // =========================
  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await jobApi.filter({
        keywords: searchQuery || undefined,
        status: status || undefined,
        jobType: jobType || undefined,
        categoryId: undefined,
      });

      setJobs(res.data || res); // tùy axios wrapper
      setTotal((res.data || res).length);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page, searchQuery, status, jobType, department]);

  // =========================
  // STATS (FIXED STATUS LOGIC)
  // =========================
  const stats = useMemo(() => {
    let active = 0;
    let closed = 0;
    let draft = 0;

    jobs.forEach((job) => {
      const st = normalize(job.status);

      if (st === "open" || st === "active") active++;
      else if (st === "closed") closed++;
      else draft++;
    });

    return {
      total,
      active,
      closed,
      draft
    };
  }, [jobs, total]);

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSaveJob = async (data: Partial<Job>) => {
    try {
      if (editingJob) {
        await jobApi.update(editingJob.id, data);
      } else {
        await jobApi.create(data);
      }

      setIsCreateModalOpen(false);
      setEditingJob(null);
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleConfirmDelete = async () => {
    if (!deletingJob) return;

    try {
      await jobApi.delete(deletingJob.id);
      setDeletingJob(null);
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // DEBUG STATUS (SAFE)
  // =========================
  useEffect(() => {
    if (jobs.length > 0) {
      console.log("RAW STATUS LIST:", jobs.map(j => j.status));
    }
  }, [jobs]);

  return (
    <div className={styles.recruitmentSection}>

      {/* HEADER */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.mainTitle}>Requisition Hub</h1>
          <p className={styles.subTitle}>
            Manage recruitment pipeline efficiently
          </p>
        </div>

        <button
          className={styles.primaryActionButton}
          onClick={() => {
            setEditingJob(null);
            setIsCreateModalOpen(true);
          }}
        >
          <FiPlus /> Create Job
        </button>
      </header>

      {/* LOADING / ERROR */}
      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* STATS */}
      <section className={styles.statsOverviewGrid}>
        <div className={styles.statCard}>
          <FiBriefcase />
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>

        <div className={styles.statCard}>
          <FiCheckCircle />
          <span>Active</span>
          <strong>{stats.active}</strong>
        </div>

        <div className={styles.statCard}>
          <FiXCircle />
          <span>Closed</span>
          <strong>{stats.closed}</strong>
        </div>

        <div className={styles.statCard}>
          <FiFileText />
          <span>Draft</span>
          <strong>{stats.draft}</strong>
        </div>
      </section>

      {/* FILTER */}
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

      {/* TABLE */}
      <RecruitmentTable
        jobs={jobs}
        onEditJob={(job) => {
          setEditingJob(job);
          setIsCreateModalOpen(true);
        }}
        onDeleteJob={(job) => setDeletingJob(job)}
      />

      {/* CREATE / EDIT MODAL */}
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleSaveJob}
        initialData={editingJob}
      />

      {/* DELETE MODAL */}
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