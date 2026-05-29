import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import styles from "./JobDetail.module.css";

import type { Job } from "../../../../types/job";

import jobApi from "../../../../service/jobApi";
import savedJobApi from "../../../../service/savedJobApi";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import JobSections from "../../components/JobSections/JobSections";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";

const JobDetail = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [job, setJob] =
    useState<Job | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("Description");

  const [bookmarkLoading, setBookmarkLoading] =
    useState(false);

  // =========================
  // REFS
  // =========================

  const descriptionRef =
    useRef<HTMLDivElement>(null);

  const requirementsRef =
    useRef<HTMLDivElement>(null);

  const benefitsRef =
    useRef<HTMLDivElement>(null);

  const companyRef =
    useRef<HTMLDivElement>(null);

  const tabRefs = useMemo(
    () => ({
      Description: descriptionRef,

      Requirements:
        requirementsRef,

      Benefits: benefitsRef,

      Company: companyRef,
    }),
    []
  );

  // =========================
  // SCROLL TOP
  // =========================

  const scrollTop = () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // =========================
  // FETCH JOB DETAIL
  // =========================

  const fetchJobData =
    useCallback(async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const jobId = Number(id);

        // GET JOB DETAIL
        const jobData =
          await jobApi.getById(
            jobId
          );

        // GET SAVED STATUS
        let isSaved = false;

        try {
          const status =
            await savedJobApi.getStatus(
              jobId
            );

          isSaved =
            status.saved;
        } catch (error) {
          console.warn(
            "GET SAVED STATUS FAILED:",
            error
          );
        }

        setJob({
          ...jobData,

          isSaved,
        });
      } catch (error) {
        console.error(
          "FETCH JOB DETAIL FAILED:",
          error
        );

        setJob(null);
      } finally {
        setIsLoading(false);
      }
    }, [id]);

  useEffect(() => {
    fetchJobData();
  }, [fetchJobData]);

  // =========================
  // BOOKMARK
  // =========================

  const handleBookmark =
    async () => {
      if (
        !job ||
        bookmarkLoading
      ) {
        return;
      }

      try {
        setBookmarkLoading(true);

        // optimistic update
        setJob((prev) =>
          prev
            ? {
                ...prev,

                isSaved:
                  !prev.isSaved,
              }
            : null
        );

        if (job.isSaved) {
          await savedJobApi.remove(
            job.id
          );
        } else {
          await savedJobApi.save(
            job.id
          );
        }
      } catch (error) {
        console.error(
          "BOOKMARK FAILED:",
          error
        );

        // rollback
        setJob((prev) =>
          prev
            ? {
                ...prev,

                isSaved:
                  !prev.isSaved,
              }
            : null
        );
      } finally {
        setBookmarkLoading(false);
      }
    };

  // =========================
  // APPLY
  // =========================

  const handleApply = () => {
    if (!job) return;

    navigate(
      `/jobs/${job.id}`,
      {
        state: {
          autoApply: true,
        },
      }
    );

    scrollTop();
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div
          className={
            styles.loadingWrapper
          }
        >
          <div
            className={styles.spinner}
          />

          <p>
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!job) {
    return (
      <div className={styles.wrapper}>
        <div
          className={
            styles.emptyState
          }
        >
          Job not found
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className={styles.wrapper}>
      <div
        className={
          styles.contentLayout
        }
      >
        {/* LEFT */}
        <div className={styles.leftCol}>
          <div
            className={
              styles.headerCard
            }
          >
            <JobHeader
              job={job}
              onBookmark={
                handleBookmark
              }
              onApply={handleApply}
            />

            <JobTabs
              activeTab={activeTab}
              setActiveTab={
                setActiveTab
              }
              tabRefs={tabRefs}
            />

            <div
              className={
                styles.sectionsContainer
              }
            >
              <JobSections
                job={job}
                refs={tabRefs}
                onApply={
                  handleApply
                }
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className={styles.rightCol}
        >
          <JobSidebar job={job} />
        </div>
      </div>

      {/* RELATED JOBS */}
      <RelatedJobs job={job} />
    </div>
  );
};

export default JobDetail;