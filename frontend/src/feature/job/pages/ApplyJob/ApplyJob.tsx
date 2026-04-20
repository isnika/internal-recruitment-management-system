import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./ApplyJob.module.css";
import type { Job } from "../../../../types/job";
import { fetchJobByIdApi, toggleBookmarkApi } from "../../../../service/jobApi";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import GeneralInfoCard from "../../components/ApplyJob/GeneralInfoCard/GeneralInfoCard";
import ApplyJobForm from "../../components/ApplyJob/ApplyJobForm/ApplyJobForm";
import SubmitSuccessMessage from "../../components/ApplyJob/SubmitSuccessMessage/SubmitSuccessMessage";
import { FiChevronUp } from "react-icons/fi";

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading || !job) return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* Top Section: Header + General Info */}
      <div className={styles.contentLayout}>
        <div className={styles.leftCol}>
          <div className={styles.headerCard}>
            <JobHeader job={job} onBookmark={handleBookmark} />
            <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} tabRefs={{}} />
            <div className={styles.seeMore}>See More</div>
            <div className={styles.collapseIcon}><FiChevronUp /></div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <GeneralInfoCard job={job} />
        </div>
      </div>

      {/* Bottom Section: Form aligns with leftCol */}
      <div className={styles.contentLayout}>
        <div className={styles.leftCol}>
          {isSubmitted ? (
            <SubmitSuccessMessage />
          ) : (
            <ApplyJobForm onSubmitSuccess={handleSubmitSuccess} />
          )}
        </div>
        <div className={styles.rightCol}></div>
      </div>
    </div>
  );
};

export default ApplyJob;
