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

// =========================
// SAVED JOB API (đúng backend bạn gửi)
// =========================
const savedJobApi = {
  toggle: (jobId: number) =>
    request.post(`/api/saved-jobs/${jobId}`),

  getStatus: (jobId: number) =>
    request.get(`/api/saved-jobs/${jobId}/status`),
};

// =========================

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");

  const [isApplying, setIsApplying] = useState(
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
  // FETCH JOB
  // =========================
  useEffect(() => {
    const getJob = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const data = await jobApi.getById(Number(id));

        setJob({
          ...data,
          // normalize thêm field FE cần (không có backend)
          isBookmarked: false,
        } as any);
      } finally {
        setIsLoading(false);
      }
    };

    getJob();
  }, [id]);

  // =========================
  // BOOKMARK (saved-jobs API)
  // =========================
  const handleBookmark = async () => {
    if (!job) return;

    await savedJobApi.toggle(job.id);

    setJob((prev) =>
      prev
        ? {
            ...prev,
            isBookmarked: !((prev as any).isBookmarked),
          }
        : prev
    );
  };

  // =========================
  // APPLY
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

  if (isLoading || !job)
    return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* TOP */}
      <div
        className={styles.contentLayout}
        style={isApplying ? {} : { alignItems: "flex-start" }}
      >
        <div className={styles.leftCol}>
          <div className={styles.headerCard}>
            <JobHeader
              job={job as any}
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
                  See More
                </div>
                <div
                  className={styles.collapseIcon}
                  onClick={handleCancelApply}
                >
                  <FiChevronDown />
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
          <div className={styles.rightCol}></div>
        </div>
      )}

      {!isApplying && <RelatedJobs job={job} />}
    </div>
  );
};

export default JobDetail;