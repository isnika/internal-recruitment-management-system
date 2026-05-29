import styles from "./InterviewHeader.module.css";
import type { InterviewStatus } from "../../types";

type Props = {
  statusFilter: InterviewStatus | "ALL";
  setStatusFilter: (s: InterviewStatus | "ALL") => void;
};

const FILTERS: (InterviewStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "ACCEPTED",
  "REJECTED",
];

export default function InterviewHeader({
  statusFilter,
  setStatusFilter,
}: Props) {
  return (
    <div className={styles.header}>
      <h2>Interview Management</h2>

      <div className={styles.filters}>
        {FILTERS.map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${
              statusFilter === s ? styles.activeFilter : ""
            }`}
            onClick={() => setStatusFilter(s)}
          >
            {formatLabel(s)}
          </button>
        ))}
      </div>
    </div>
  );
}

// optional: UI đẹp hơn thay vì uppercase raw string
function formatLabel(status: InterviewStatus | "ALL") {
  switch (status) {
    case "ALL":
      return "All";
    case "PENDING":
      return "Pending";
    case "ACCEPTED":
      return "Accepted";
    case "REJECTED":
      return "Rejected";
    default:
      return status;
  }
}