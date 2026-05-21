import styles from "./InterviewHeader.module.css";
import type { InterviewStatus } from "../../types";

type Props = {
  statusFilter: InterviewStatus | "ALL";
  setStatusFilter: (s: InterviewStatus | "ALL") => void;
};

const FILTERS: (InterviewStatus | "ALL")[] = [
  "ALL",
  "SCHEDULED",
  "DONE",
  "CANCELLED",
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
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}