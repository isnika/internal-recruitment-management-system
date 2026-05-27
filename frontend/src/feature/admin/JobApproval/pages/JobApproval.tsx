import React, { useState, useEffect, useMemo } from "react";
import { FiX } from "react-icons/fi";
import styles from "./JobApproval.module.css";

import type { Job } from "../../../../types/job";
import JobFilters from "../components/JobFilters";
import JobTable from "../components/JobTable";
import JobDetailModal from "../components/JobDetailModal";

import { jobApi } from "../../../../service/jobApi";
import { useToast } from "../../../../components/Toast";

const JobApproval: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [rejectingJob, setRejectingJob] = useState<Job | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  // =========================
  // LOAD JOBS (SERVER SIDE)
  // =========================
  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await jobApi.filter({
        keywords: searchTerm || undefined,
        status: statusFilter || undefined,
      });

      setJobs(data);
    } catch (err: any) {
      toast.error("Failed to fetch jobs");
      setError(err?.message || "Load failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [searchTerm, statusFilter]);

  // =========================
  // APPROVE JOB (FIXED)
  // =========================
  const onApprove = async (job: Job) => {
    try {
      setIsProcessing(true);

      await jobApi.update(job.id, {
        status: "ACTIVE", // ❌ FIX: KHÔNG CÒN OPEN
      });

      toast.success("Job approved");

      loadJobs();
    } catch (err) {
      toast.error("Approve failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // REJECT JOB
  // =========================
  const onReject = async (job: Job, reason: string) => {
    try {
      setIsProcessing(true);

      await jobApi.update(job.id, {
        status: "CLOSED",
        description: job.description + `\n\nREJECTED: ${reason}`,
      });

      toast.success("Job rejected");

      loadJobs();
    } catch (err) {
      toast.error("Reject failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // CLIENT FILTER (OPTIONAL - FIXED SAFE)
  // =========================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        !statusFilter || job.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Job Approval System</h1>

      {/* ERROR */}
      {error && (
        <div className={styles.errorBanner}>
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* LOADING */}
      {isLoading && <p>Loading jobs...</p>}

      {/* FILTERS */}
      <JobFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* TABLE */}
      <JobTable
        filteredJobs={filteredJobs}
        onViewDetails={setSelectedJob}
        onApprove={onApprove}
        onReject={(job: Job) => setRejectingJob(job)}
      />

      {/* DETAIL MODAL */}
      {selectedJob && (
        <JobDetailModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApprove={onApprove}
          onReject={(job: Job) => setRejectingJob(job)}
        />
      )}

      {/* REJECT MODAL */}
      {rejectingJob && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContentSmall}>
            <div className={styles.modalHeader}>
              <h3>Reject Job</h3>
              <button onClick={() => setRejectingJob(null)}>
                <FiX />
              </button>
            </div>

            <div className={styles.modalBody}>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason..."
              />
            </div>

            <div className={styles.modalFooter}>
              <button
                disabled={!rejectReason || isProcessing}
                onClick={() => {
                  if (!rejectingJob) return;

                  onReject(rejectingJob, rejectReason);

                  setRejectingJob(null);
                  setRejectReason("");
                }}
              >
                Confirm Reject
              </button>

              <button onClick={() => setRejectingJob(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApproval;