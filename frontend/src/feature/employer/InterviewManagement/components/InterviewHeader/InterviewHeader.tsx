import styles from "./InterviewHeader.module.css";
import type { InterviewStatus } from "../../types/types";

// ======================
// FILTER TYPE
// ======================
const FILTERS = [
  "ALL",
  "PENDING",
  "ACCEPTED",
  "REJECTED",
] as const;

type FilterType = typeof FILTERS[number];

// ======================
// PROPS
// ======================
type Props = {
  statusFilter: FilterType;
  setStatusFilter: (s: FilterType) => void;
};

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

// ======================
// LABEL FORMAT
// ======================
function formatLabel(status: FilterType) {
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