import { useState, useEffect } from "react";
import jobApi, { type Job } from "../../../../service/jobApi";
import JobCard from "../JobCard/JobCard";
import styles from "./RelatedJobs.module.css";

interface RelatedJobsProps {
  job: Job;
}

const RelatedJobs: React.FC<RelatedJobsProps> = ({ job }) => {
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!job?.category?.id) return;
        
        const res: any = await jobApi.filter({ 
          categoryId: job.category.id,
          status: "ACTIVE" 
        });
        
        const data = Array.isArray(res) ? res : res?.data || [];
        // Filter out current job and limit to 3
        const filtered = data
          .filter((j: Job) => j.id !== job.id)
          .slice(0, 3);
          
        // Fetch saved status for each job
        const jobsWithSavedStatus = await Promise.all(
          filtered.map(async (j: Job) => {
            try {
              // @ts-ignore
              const status = await import("../../../../service/savedJobApi").then(m => m.default.getStatus(j.id));
              return { ...j, isSaved: status.saved };
            } catch {
              return { ...j, isSaved: false };
            }
          })
        );
          
        setRelatedJobs(jobsWithSavedStatus);
      } catch (error) {
        console.error("Failed to fetch related jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [job]);

  const handleBookmark = async (jobId: number, saved: boolean) => {
    // Optimistic UI update
    setRelatedJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, isSaved: !saved } : j))
    );

    try {
      const savedJobApi = (await import("../../../../service/savedJobApi")).default;
      if (saved) {
        await savedJobApi.remove(jobId);
      } else {
        await savedJobApi.save(jobId);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
      // Rollback
      setRelatedJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, isSaved: saved } : j))
      );
    }
  };

  if (loading) return <div>Loading related jobs...</div>;
  if (relatedJobs.length === 0) return null;

  return (
    <div>
      <h2 className={styles.relatedTitle}>
        Related Work
      </h2>

      <div className={styles.relatedList}>
        {relatedJobs.map((j) => (
          <JobCard
            key={j.id}
            job={j}
            onBookmark={handleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedJobs;