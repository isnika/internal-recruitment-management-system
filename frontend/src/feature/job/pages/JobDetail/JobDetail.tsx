import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import styles from "./JobDetail.module.css";
import type { Job } from "../../../../types/job";

import { jobApi } from "../../../../service/jobApi";
import { request } from "../../../../service/axiosClient";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import JobSections from "../../components/JobSections/JobSections";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";
import ApplyJobForm from "../../components/ApplyJob/ApplyJobForm/ApplyJobForm";
import SubmitSuccessMessage from "../../components/ApplyJob/SubmitSuccessMessage/SubmitSuccessMessage";

// Định nghĩa kiểu mở rộng cho Job ở Frontend để quản lý trạng thái lưu bài viết
interface FrontendJob extends Job {
  isBookmarked: boolean;
}

// =========================
// SAVED JOB API
// =========================
const savedJobApi = {
  toggle: (jobId: number): Promise<any> =>
    request.post(`/api/saved-jobs/${jobId}`),

  getStatus: (jobId: number): Promise<{ data: boolean } | boolean | any> =>
    request.get(`/api/saved-jobs/${jobId}/status`),
};

// =========================

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [job, setJob] = useState<FrontendJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");

  const [isApplying, setIsApplying] = useState<boolean>(
    location.state?.autoApply || false
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const tabRefs = {
    Description: descriptionRef,
    Requirements: requirementsRef,
    Benefits: benefitsRef,
    Company: companyRef,
  };

  // =========================
  // FETCH JOB & BOOKMARK STATUS
  // =========================
  useEffect(() => {
    const getJobData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const jobId = Number(id);

        // Lấy chi tiết công việc
        const jobData = await jobApi.getById(jobId);

        let bookmarked = false;
        try {
          // Lấy trạng thái bookmark thực tế từ backend
          const statusRes = await savedJobApi.getStatus(jobId);
          // Dự phòng các trường hợp trả về trực tiếp boolean hoặc bọc trong object data
          bookmarked = typeof statusRes === "boolean" ? statusRes : !!statusRes?.data;
        } catch (bookmarkErr) {
          console.warn("Không thể lấy trạng thái lưu công việc:", bookmarkErr);
        }

        setJob({
          ...jobData,
          isBookmarked: bookmarked,
        });
      } catch (err) {
        console.error("❌ Lỗi khi tải chi tiết công việc:", err);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };

    getJobData();
  }, [id]);

  // =========================
  // BOOKMARK (saved-jobs API)
  // =========================
  const handleBookmark = async () => {
    if (!job) return;

    try {
      // Tối ưu UI phản hồi nhanh (Optimistic Update)
      setJob((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );

      // Gọi API cập nhật lên server
      await savedJobApi.toggle(job.id);
    } catch (err) {
      console.error("Lỗi khi xử lý lưu/bỏ lưu công việc:", err);
      // Hoàn tác lại trạng thái nếu API lỗi
      setJob((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );
    }
  };

  // =========================
  // APPLY ACTIONS
  // =========================
  const handleApply = () => {
    setIsApplying(true);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelApply = () => {
    setIsApplying(false);
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <div className={styles.wrapper}>Đang tải thông tin chi tiết...</div>;
  }

  if (!job) {
    return <div className={styles.wrapper}>Không tìm thấy thông tin công việc yêu cầu.</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* LAYOUT THÔNG TIN TRÊN */}
      <div
        className={styles.contentLayout}
        style={isApplying ? {} : { alignItems: "flex-start" }}
      >
        <div className={styles.leftCol}>
          <div className={styles.headerCard}>
            <JobHeader
              job={job}
              onBookmark={handleBookmark}
              onApply={handleApply}
            />

            <JobTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabRefs={tabRefs}
            />

            {isApplying && (
              <>
                <div
                  className={styles.seeMore}
                  onClick={handleCancelApply}
                >
                  Xem chi tiết công việc
                </div>
                <div
                  className={styles.collapseIcon}
                  onClick={handleCancelApply}
                >
                  <FiChevronDown style={{ transform: "rotate(180deg)" }} />
                </div>
              </>
            )}

            {!isApplying && (
              <div className={styles.sectionsContainer}>
                <JobSections
                  job={job}
                  refs={tabRefs}
                  onApply={handleApply}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightCol}>
          <JobSidebar job={job} isApplying={isApplying} />
        </div>
      </div>

      {/* FORM NỘP ĐƠN ỨNG TUYỂN */}
      {isApplying && (
        <div className={styles.contentLayout}>
          <div className={styles.leftCol}>
            {isSubmitted ? (
              <SubmitSuccessMessage />
            ) : (
              <ApplyJobForm
                job={job}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancelApply}
              />
            )}
          </div>
          <div className={styles.rightCol}></div>
        </div>
      )}

      {/* CÔNG VIỆC LIÊN QUAN */}
      {!isApplying && <RelatedJobs job={job} />}
    </div>
  );
};

export default JobDetail;