import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import styles from "./JobDetail.module.css";
import type { Job } from "../../../../types/job";
import { fetchJobByIdApi, toggleBookmarkApi } from "../../../../service/jobApi";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import JobSections from "../../components/JobSections/JobSections";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";
import ApplyJobForm from "../../components/ApplyJob/ApplyJobForm/ApplyJobForm";
import SubmitSuccessMessage from "../../components/ApplyJob/SubmitSuccessMessage/SubmitSuccessMessage";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");

  const [isApplying, setIsApplying] = useState(location.state?.autoApply || false);
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

  useEffect(() => {
    const getJob = async () => {
      if (!id) return;
      const data = await fetchJobByIdApi(id);
      setJob(data);
      setIsLoading(false);
    };
    getJob();
  }, [id]);

  const handleBookmark = async () => {
    if (!job) return;
    await toggleBookmarkApi(job.id);
    setJob({ ...job, isBookmarked: !job.isBookmarked });
  };

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

  if (isLoading || !job) return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* Top Section */}
      <div className={styles.contentLayout} style={isApplying ? {} : { alignItems: 'flex-start' }}>
        <div className={styles.leftCol}>
          <div className={styles.headerCard}>
            <JobHeader job={job} onBookmark={handleBookmark} onApply={handleApply} />
            <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} tabRefs={tabRefs} />

            {/* Show See More only when applying, to allow cancelling/expanding */}
            {isApplying && (
              <>
                <div className={styles.seeMore} onClick={handleCancelApply}>See More</div>
                <div className={styles.collapseIcon} onClick={handleCancelApply}>
                  <FiChevronDown />
                </div>
              </>
            )}
          </div>

          {/* If NOT applying, show the job details right here */}
          {!isApplying && (
            <JobSections job={job} refs={tabRefs} onApply={handleApply} />
          )}
        </div>

        <div className={styles.rightCol}>
          {/* Sidebar acts as General Info when applying */}
          <JobSidebar job={job} isApplying={isApplying} />
        </div>
      </div>

      {/* Bottom Section: Form aligns with leftCol */}
      {isApplying && (
        <div className={styles.contentLayout}>
          <div className={styles.leftCol}>
            {isSubmitted ? (
              <SubmitSuccessMessage />
            ) : (
              <ApplyJobForm onSubmitSuccess={handleSubmitSuccess} onCancel={handleCancelApply} />
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