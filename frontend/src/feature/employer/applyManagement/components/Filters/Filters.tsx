import type { ApplicationStatus } from "../../types/application.types";
import styles from "./Filters.module.css";
type Props = {
  jobFilter: string;
  setJobFilter: (v: string) => void;
  statusFilter: ApplicationStatus | "all";
  setStatusFilter: (v: ApplicationStatus | "all") => void;
  jobs: string[];
};

export default function Filters({
  jobFilter,
  setJobFilter,
  statusFilter,
  setStatusFilter,
  jobs,
}: Props) {
  return (
    <div className={styles.filters}>
      <select
        value={jobFilter}
        onChange={(e) => setJobFilter(e.target.value)}
      >
        <option value="all">All Jobs</option>
        {jobs.map((job) => (
          <option key={job}>{job}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value as any)
        }
      >
        <option value="all">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="REVIEWING">Reviewing</option>
        <option value="PASSED">Pass</option>
        <option value="FAILED">Fail</option>
      </select>
    </div>
  );
}