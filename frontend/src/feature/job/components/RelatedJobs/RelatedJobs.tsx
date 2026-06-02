import { jobs } from "../../../../dataMock/Job";
import JobCard from "../JobCard/JobCard";
import styles from "./RelatedJobs.module.css";

const RelatedJobs = ({ currentJobId }) => {
  const relatedJobs = jobs
    .filter((j) => j.id !== currentJobId)
    .slice(0, 3);

  return (
    <div>
      <h2 className={styles.relatedTitle}>
        Related Work
      </h2>

      <div className={styles.relatedList}>
        {relatedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onBookmark={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedJobs;