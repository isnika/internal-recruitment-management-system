import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./JobDetail.module.css";

import type { Job } from "../../../../types/job";

import { jobApi } from "../../../../service/jobApi";
import { request } from "../../../../service/axiosClient";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import JobSections from "../../components/JobSections/JobSections";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";

// =========================
// TYPES
// =========================
type JobWithBookmark = Job & {
  isBookmarked: boolean;
};

// =========================
// SAVED JOB API
// =========================
const savedJobApi = {
  toggle: (jobId: number): Promise<void> =>
    request.post(`/api/saved-jobs/${jobId}`),

  getStatus: (jobId: number): Promise<boolean> =>
    request.get<boolean>(`/api/saved-jobs/${jobId}/status`),
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobWithBookmark | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

   
  // REFS (tabs scroll)
   
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

   
  // SCROLL TOP
   
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

   
  // FETCH JOB DETAIL
   
  const fetchJobData = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);

      const jobId = Number(id);
      const jobData = await jobApi.getById(jobId);

      let bookmarked = false;

      try {
        bookmarked = await savedJobApi.getStatus(jobId);
      } catch (err) {
        console.warn("Bookmark status error:", err);
      }

      setJob({
        ...jobData,
        isBookmarked: bookmarked,
      });
    } catch (err) {
      console.error("Failed to load job detail:", err);
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

   
  // BOOKMARK
   
  const handleBookmark = async () => {
    if (!job || bookmarkLoading) return;

    try {
      setBookmarkLoading(true);

      setJob((prev) =>
        prev
          ? { ...prev, isBookmarked: !prev.isBookmarked }
          : null
      );

      await savedJobApi.toggle(job.id);
    } catch (err) {
      console.error("Bookmark failed:", err);

      setJob((prev) =>
        prev
          ? { ...prev, isBookmarked: !prev.isBookmarked }
          : null
      );
    } finally {
      setBookmarkLoading(false);
    }
  };

   
  // APPLY → NAVIGATE PAGE
   
  const handleApply = () => {
    if (!job) return;

    navigate(`/apply-job/${job.id}`, {
      state: {
        job,
      },
    });

    scrollTop();
  };

   
  // LOADING
   
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

   
  // EMPTY
   
  if (!job) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyState}>
          Job not found.
        </div>
      </div>
    );
  }

   
  // UI
   
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentLayout}>
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

            <div className={styles.sectionsContainer}>
              <JobSections
                job={job}
                refs={tabRefs}
                onApply={handleApply}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.rightCol}>
          <JobSidebar job={job} />
        </div>
      </div>

      {/* RELATED JOBS */}
      <RelatedJobs job={job} />
    </div>
  );
};

export default JobDetail;