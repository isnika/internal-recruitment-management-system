import styles from "../InterviewRow/InterviewRow.module.css";
import type { Interview } from "../../types/types";

type Props = {
  item: Interview;
  onView: (i: Interview) => void;
  onReschedule: (i: Interview) => void;
  onUpdate: (i: Interview) => void;
};

export default function InterviewRow({
  item,
  onView,
  onReschedule,
  onUpdate,
}: Props) {
  // ======================
  // STATUS STYLE
  // ======================
  const getStatusClass = (status: Interview["status"]) => {
    switch (status) {
      case "PENDING":
        return styles.pending;
      case "ACCEPTED":
        return styles.accepted;
      case "REJECTED":
        return styles.rejected;
      default:
        return "";
    }
  };

  // ======================
  // SAFE DATA ACCESS
  // ======================
  const firstName = item.application?.user?.firstName ?? "";
  const lastName = item.application?.user?.lastName ?? "";

  const candidateName = `${firstName} ${lastName}`.trim();
  const jobTitle = item.application?.job?.title ?? "N/A";

  // ======================
  // DATE FORMAT (OPTIMIZED)
  // ======================
  const dateObj = new Date(item.scheduleTime);

  const scheduleDate = dateObj.toLocaleDateString();
  const scheduleTime = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr>
      {/* CANDIDATE */}
      <td>{candidateName || "Unknown"}</td>

      {/* JOB */}
      <td>{jobTitle}</td>

      {/* LOCATION */}
      <td>{item.location}</td>

      {/* SCHEDULE (FIX: gộp lại 1 cột) */}
      <td>
        <div>
          <div>{scheduleDate}</div>
          <small>{scheduleTime}</small>
        </div>
      </td>

      {/* STATUS */}
      <td>
        <span className={`${styles.status} ${getStatusClass(item.status)}`}>
          {item.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td className={styles.actions}>
        <button onClick={() => onView(item)}>View</button>
        <button onClick={() => onReschedule(item)}>Reschedule</button>
        <button onClick={() => onUpdate(item)}>Update</button>
      </td>
    </tr>
  );
}