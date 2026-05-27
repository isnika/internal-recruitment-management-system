import React, { useState, useMemo } from "react";
import { FiX } from "react-icons/fi";
import styles from "./JobApproval.module.css";
import type { Job } from "../../../../types/job";
import JobFilters from "../components/JobFilters";
import JobTable from "../components/JobTable";
import JobDetailModal from "../components/JobDetailModal";

import { fetchJobsApi, updateJobStatusApi } from "../../../../service/jobApi";
import { useToast } from "../../../../components/Toast";
const JobApproval: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  React.useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const res = await fetchJobsApi("View All", 1, 500); // Fetch up to 500 jobs
      setJobs(res.jobs);
    } catch (err: any) {
      toast.error("Failed to fetch jobs from API");
      console.error(err);
      setError(err?.message || "Failed to load jobs from server.");
    } finally {
      setIsLoading(false);
    }
  };

  const onApprove = async (id: string) => {
    try {
      await updateJobStatusApi(id, "ACTIVE");
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: "ACTIVE" } : j));
      toast.success("Job Approved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve job on server.");
      setError(err?.message || "Failed to approve job");
    }
  };

  const onReject = async (id: string, reason: string) => {
    try {
      await updateJobStatusApi(id, "CLOSED"); // Using CLOSED as REJECTED since REJECTED is not in enum
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: "CLOSED" } : j));
      toast.success(`Job Rejected successfully: ${reason}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to reject job on server.");
      setError(err?.message || "Failed to reject job");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.company?.name || "").toLowerCase().includes(searchTerm.toLowerCase());

      const currentStatus = (job.status || "pending").toLowerCase();
      const matchStatus = statusFilter === "all" || currentStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const handleOpenRejectModal = (id: string) => {
    setRejectingId(id);
    setRejectReason("");
    setError(null);
  };

  const handleConfirmReject = async () => {
    if (!rejectingId || !rejectReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      await onReject(rejectingId, rejectReason);
      setRejectingId(null);
      setRejectReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject job");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      await onApprove(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve job");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Approval System</h1>
        <p className={styles.subtitle}>
          Review, approve, or reject job listings before they go public.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
          Loading jobs from server...
        </div>
      )}

      {/* Filters bar */}
      <JobFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* List and Table Grid */}
      <JobTable
        filteredJobs={filteredJobs}
        onViewDetails={setSelectedJob}
        onApprove={handleApprove}
        onReject={handleOpenRejectModal}
      />

      {/* Details Modal */}
      {selectedJob && (
        <JobDetailModal
          selectedJob={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApprove={handleApprove}
          onReject={handleOpenRejectModal}
        />
      )}

      {/* Reject Modal */}
      {rejectingId && (
        <div className={styles.modalOverlay} onClick={() => setRejectingId(null)}>
          <div className={styles.modalContentSmall} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Reject Reason</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setRejectingId(null)}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Please provide a reason for rejecting this job listing.</p>
              {error && <p className={styles.errorText}>{error}</p>}
              <textarea
                className={styles.textarea}
                placeholder="Write reason here..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                aria-label="Rejection reason"
              />
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.actionBtnRed}
                onClick={handleConfirmReject}
                disabled={!rejectReason.trim() || isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm Reject"}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setRejectingId(null)}
                disabled={isProcessing}
              >
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
