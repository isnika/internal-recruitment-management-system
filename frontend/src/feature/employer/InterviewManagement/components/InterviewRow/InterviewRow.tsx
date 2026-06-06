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
  // SAFE DATA ACCESS (Support both Nested and Flattened structures)
  // ======================
  
  // Flattened from backend InterviewResponse
  const flatCandidateName = (item as any).candidateName;
  const flatJobTitle = (item as any).jobTitle;

  // Nested from old frontend mock/type
  const nestedFirstName = item.application?.user?.firstName ?? "";
  const nestedLastName = item.application?.user?.lastName ?? "";
  const nestedCandidateName = `${nestedFirstName} ${nestedLastName}`.trim();
  const nestedJobTitle = item.application?.job?.title;

  const candidateName = flatCandidateName || nestedCandidateName || "Unknown";
  const jobTitle = flatJobTitle || nestedJobTitle || "N/A";

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

      <td>
        {item.result || "-"}
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