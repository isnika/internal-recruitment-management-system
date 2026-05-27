import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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

//   
// TYPES
//   
type JobWithBookmark = Job & {
  isBookmarked: boolean;
};

//   
// SAVED JOB API
//   
const savedJobApi = {
  toggle: (jobId: number): Promise<void> =>
    request.post(`/api/saved-jobs/${jobId}`),

  getStatus: (jobId: number): Promise<boolean> =>
    request.get<boolean>(
      `/api/saved-jobs/${jobId}/status`
    ),
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [job, setJob] = useState<JobWithBookmark | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [isApplying, setIsApplying] = useState<boolean>(
    location.state?.autoApply || false
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  //
  // REFS
  //
  const descriptionRef = useRef<HTMLDivElement>(null);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const tabRefs = useMemo(
    () => ({
      Description: descriptionRef,
      Requirements: requirementsRef,
      Benefits: benefitsRef,
      Company: companyRef,
    }),
    []
  );

  //
  // HELPERS
  //
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //
  // FETCH JOB DATA
  //
  const fetchJobData = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const jobId = Number(id);

      // LOAD JOB DETAIL
      const jobData = await jobApi.getById(jobId);

      // DEFAULT BOOKMARK
      let bookmarked = false;

      // LOAD BOOKMARK STATUS
      try {
        bookmarked = await savedJobApi.getStatus(jobId);
      } catch (bookmarkErr) {
        console.warn("Cannot load bookmark status:", bookmarkErr);
      }

      setJob({
        ...jobData,
        isBookmarked: bookmarked,
      });
    } catch (err) {
      // ✅ ĐÃ FIX: Thêm dấu nháy kép mở đầu chuỗi string hợp lệ
      console.error("Failed to load job detail:", err);
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

  //
  // BOOKMARK
  //
  const handleBookmark = async () => {
    if (!job || bookmarkLoading) return;

    try {
      setBookmarkLoading(true);

      // Optimistic UI
      setJob((prev) =>
        prev
          ? {
              ...prev,
              isBookmarked: !prev.isBookmarked,
            }
          : null
      );

      await savedJobApi.toggle(job.id);
    } catch (err) {
      // ✅ ĐÃ FIX: Thêm dấu nháy kép mở đầu chuỗi string hợp lệ
      console.error("Failed to bookmark job:", err);

      // Rollback nếu gọi API lỗi
      setJob((prev) =>
        prev
          ? {
              ...prev,
              isBookmarked: !prev.isBookmarked,
            }
          : null
      );
    } finally {
      setBookmarkLoading(false);
    }
  };

  //
  // APPLY ACTIONS
  //
  const handleApply = () => {
    setIsApplying(true);
    setIsSubmitted(false);
    scrollTop();
  };

  const handleCancelApply = () => {
    setIsApplying(false);
  };

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    scrollTop();
  };

  //
  // LOADING STATE
  //
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  //
  // EMPTY STATE
  //
  if (!job) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyState}>
          Job not found.
        </div>
      </div>
    );
  }

  //
  // RENDER
  //
  return (
    <div className={styles.wrapper}>
      {/* TOP LAYOUT */}
      <div
        className={styles.contentLayout}
        style={isApplying ? {} : { alignItems: "flex-start" }}
      >
        {/* LEFT */}
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

            {/* APPLY MODE */}
            {isApplying && (
              <>
                <div
                  className={styles.seeMore}
                  onClick={handleCancelApply}
                >
                  View job details
                </div>

                <div
                  className={styles.collapseIcon}
                  onClick={handleCancelApply}
                >
                  <FiChevronDown
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  />
                </div>
              </>
            )}

            {/* JOB CONTENT */}
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

        {/* RIGHT */}
        <div className={styles.rightCol}>
          <JobSidebar
            job={job}
            isApplying={isApplying}
          />
        </div>
      </div>

      {/* APPLY FORM */}
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

          <div className={styles.rightCol} />
        </div>
      )}

      {/* RELATED JOBS */}
      {!isApplying && (
        <RelatedJobs job={job} />
      )}
    </div>
  );
};

export default JobDetail;