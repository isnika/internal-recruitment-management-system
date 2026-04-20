import { jobs } from "../../../../dataMock/Job";
import JobCard from "../JobCard/JobCard";
import styles from "./RelatedJobs.module.css";

const RelatedJobs = ({ currentJobId }) => {
  const list = jobs.filter((j) => j.id !== currentJobId);

  return (
    <div>
      {list.map((job) => (
        <JobCard key={job.id} job={job} onBookmark={() => {}} />
      ))}
    </div>
  );
};

export default RelatedJobs;