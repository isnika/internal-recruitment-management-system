import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "./JobDetail.module.css";
import type { Job } from "../../../../types/job";
import { fetchJobByIdApi, toggleBookmarkApi } from "../../../../service/jobApi";

import JobHeader from "../../components/JobHeader/JobHeader";
import JobTabs from "../../components/JobTabs/JobTabs";
import JobSections from "../../components/JobSections/JobSections";
import JobSidebar from "../../components/JobSidebar/JobSidebar";
import RelatedJobs from "../../components/RelatedJobs/RelatedJobs";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");

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

  if (isLoading || !job) return <div className={styles.wrapper}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentLayout}>

        {/* LEFT */}
        <div className={styles.leftCol}>
          <JobHeader job={job} onBookmark={handleBookmark} />
          <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} tabRefs={tabRefs} />
          <JobSections job={job} refs={tabRefs} />
        </div>

        {/* RIGHT */}
        <div className={styles.rightCol}>
          <JobSidebar job={job} />
        </div>
      </div>

      <RelatedJobs job={job} />
    </div>
  );
};

export default JobDetail;