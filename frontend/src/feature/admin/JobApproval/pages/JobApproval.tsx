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
  // =========================
  // STATE
  // =========================
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const toast = useToast();

  // FILTERS
  const [searchTerm, setSearchTerm] =
    useState("");

  // mặc định hiện job chờ duyệt
  const [statusFilter, setStatusFilter] =
    useState<string>("DRAFT");

  // MODALS
  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null);

  const [rejectingJob, setRejectingJob] =
    useState<Job | null>(null);

  const [rejectReason, setRejectReason] =
    useState("");

  // =========================
  // LOAD JOBS
  // =========================
  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await jobApi.filter({
        keywords:
          searchTerm.trim() || undefined,

        status:
          statusFilter || undefined,
      });

      setJobs(data || []);
    } catch (err: any) {
      console.log(err);

      setError(
        err?.message || "Failed to load jobs"
      );

      toast.error("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [searchTerm, statusFilter]);

  // =========================
  // BUILD UPDATE PAYLOAD
  // =========================
  const buildUpdatePayload = (
    job: Job,
    status:
      | "DRAFT"
      | "ACTIVE"
      | "PAUSED"
      | "CLOSED",
    customDescription?: string
  ) => {
    return {
      title: job.title,
      description:
        customDescription || job.description,

      requirements: job.requirements,
      benefits: job.benefits,

      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,

      location: job.location,
      type: job.type,

      deadline: job.deadline?.includes("T")
        ? job.deadline.split("T")[0]
        : job.deadline,

      status,

      companyId: job.company.id,

      categoryId: job.category.id,

      experienceLevelId:
        job.experienceLevel.id,

      skillIds:
        job.skills?.map((s) => s.id) || [],
    };
  };

  // =========================
  // APPROVE JOB
  // =========================
  const onApprove = async (job: Job) => {
    try {
      setIsProcessing(true);

      await jobApi.update(
        job.id,
        buildUpdatePayload(job, "ACTIVE")
      );

      toast.success("Job approved");

      // close detail modal
      setSelectedJob(null);

      await loadJobs();
    } catch (err) {
      console.log(err);

      toast.error("Approve failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // REJECT JOB
  // =========================
  const onReject = async (
    job: Job,
    reason: string
  ) => {
    try {
      setIsProcessing(true);

      await jobApi.update(
        job.id,
        buildUpdatePayload(
          job,
          "CLOSED",
          `${job.description}

REJECTED REASON:
${reason}`
        )
      );

      toast.success("Job rejected");

      // reset modal
      setRejectingJob(null);
      setRejectReason("");

      setSelectedJob(null);

      await loadJobs();
    } catch (err) {
      console.log(err);

      toast.error("Reject failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // CLIENT FILTER
  // =========================
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword =
        searchTerm.toLowerCase();

      const matchSearch =
        job.title
          ?.toLowerCase()
          .includes(keyword) ||
        job.company?.name
          ?.toLowerCase()
          .includes(keyword);

      const matchStatus =
        !statusFilter ||
        job.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Job Approval System
      </h1>

      {/* ERROR */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>

          <button
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* LOADING */}
      {isLoading && (
        <p className={styles.loading}>
          Loading jobs...
        </p>
      )}

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
        onReject={(job: Job) =>
          setRejectingJob(job)
        }
      />

      {/* DETAIL MODAL */}
      {selectedJob && (
        <JobDetailModal
          selectedJob={selectedJob}
          onClose={() =>
            setSelectedJob(null)
          }
          onApprove={onApprove}
          onReject={(job: Job) =>
            setRejectingJob(job)
          }
        />
      )}

      {/* REJECT MODAL */}
      {rejectingJob && (
        <div className={styles.modalOverlay}>
          <div
            className={
              styles.modalContentSmall
            }
          >
            {/* HEADER */}
            <div className={styles.modalHeader}>
              <h3>Reject Job</h3>

              <button
                onClick={() => {
                  setRejectingJob(null);
                  setRejectReason("");
                }}
              >
                <FiX />
              </button>
            </div>

            {/* BODY */}
            <div className={styles.modalBody}>
              <textarea
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(
                    e.target.value
                  )
                }
                placeholder="Enter reject reason..."
              />
            </div>

            {/* FOOTER */}
            <div
              className={styles.modalFooter}
            >
              <button
                disabled={
                  !rejectReason.trim() ||
                  isProcessing
                }
                onClick={() => {
                  if (!rejectingJob) return;

                  onReject(
                    rejectingJob,
                    rejectReason
                  );
                }}
              >
                {isProcessing
                  ? "Rejecting..."
                  : "Confirm Reject"}
              </button>

              <button
                onClick={() => {
                  setRejectingJob(null);
                  setRejectReason("");
                }}
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

export default React.memo(JobApproval);