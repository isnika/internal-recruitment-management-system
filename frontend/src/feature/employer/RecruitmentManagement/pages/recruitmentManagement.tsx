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
  FiPlus,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

const normalize = (s?: string) => (s || "").toLowerCase();

const RecruitmentManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // STATE PHÂN TRANG
  // =========================
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Đổi thành 15 nếu thích hiển thị nhiều hơn
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
  // LOAD JOBS
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
        // Truyền thêm param lên API nếu Backend có hỗ trợ phân trang
        page: page,
        limit: limit,
      });

      const rawData = res.data || res;
      setJobs(rawData);

      // Nếu Backend trả về tổng số item thật (ví dụ: res.total), hãy ưu tiên dùng nó.
      // Ngược lại, lấy tạm chiều dài mảng (nếu API trả về tất cả dữ liệu).
      setTotal(res.total ?? rawData.length);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page, searchQuery, status, jobType, department]);

  // TÍNH TỔNG SỐ TRANG
  const totalPages = useMemo(() => {
    return Math.ceil(total / limit) || 1;
  }, [total, limit]);

  // DỮ LIỆU ĐÃ PHÂN TRANG ĐỂ TRUYỀN VÀO BẢNG
  // Nếu API tự phân trang rồi thì dùng luôn `jobs`, nếu API trả về full mảng thì slice()
  const displayedJobs = useMemo(() => {
    if (total === jobs.length) {
      // Trường hợp Client-side pagination (API trả về mảng gốc gồm tất cả phần tử)
      const start = (page - 1) * limit;
      return jobs.slice(start, start + limit);
    }
    // Trường hợp Server-side pagination (API chỉ trả về đúng số lượng tương ứng với trang)
    return jobs;
  }, [jobs, page, limit, total]);

  // =========================
  // STATS (Tính trên tổng số lượng thay vì mảng đã cắt)
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
      total: total === jobs.length ? total : total,
      active,
      closed,
      draft
    };
  }, [jobs, total]);

  // =========================
  // ACTION HANDLERS (Giữ nguyên của bạn)
  // =========================
  const handleSaveJob = async (
    payload: CreateJobRequest,
    jobId?: number
  ) => {
    try {
      if (jobId) {
        await jobApi.update(
          jobId,
          payload
        );
      } else {
        await jobApi.create(
          payload
        );
      }

      await loadJobs();

      setIsCreateModalOpen(false);

      setEditingJob(null);
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <div className={styles.recruitmentSection}>
      {/* HEADER */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.mainTitle}>Requisition Hub</h1>
          <p className={styles.subTitle}>Manage recruitment pipeline efficiently</p>
        </div>
      </header>

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

      {/* LOADING / ERROR */}
      {loading && <p className={styles.loadingState}>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      {!loading && (
        <>
          <RecruitmentTable
            jobs={displayedJobs} // Sử dụng mảng đã được phân trang ở đây
            onEditJob={(job) => {
              setEditingJob(job);
              setIsCreateModalOpen(true);
            }}
            onDeleteJob={(job) => setDeletingJob(job)}
          />

          {/* COMPONENT PHÂN TRANG ĐƠN GIẢN, DỄ THAO TÁC */}
          <div className={styles.paginationWrapper}>
            <span className={styles.paginationInfo}>
              Showing <strong>{displayedJobs.length}</strong> of <strong>{total}</strong> jobs
            </span>

            <div className={styles.paginationActions}>
              <button
                className={styles.pageBtn}
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <FiChevronLeft /> Prev
              </button>

              <span className={styles.pageIndicator}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                className={styles.pageBtn}
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {/* MODALS */}
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