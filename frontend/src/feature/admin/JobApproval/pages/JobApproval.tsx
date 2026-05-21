import React, { useState, useMemo } from "react";
import { FiX } from "react-icons/fi";
import styles from "./JobApproval.module.css";
import type { Job } from "../../../../types/job";
import JobFilters from "../components/JobFilters";
import JobTable from "../components/JobTable";
import JobDetailModal from "../components/JobDetailModal";

interface JobApprovalProps {
  jobs: Job[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

const JobApproval: React.FC<JobApprovalProps> = ({ jobs, onApprove, onReject }) => {
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

  const handleConfirmReject = () => {
    if (!rejectingId || !rejectReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      onReject(rejectingId, rejectReason);
      setRejectingId(null);
      setRejectReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject job");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = (id: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      onApprove(id);
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
