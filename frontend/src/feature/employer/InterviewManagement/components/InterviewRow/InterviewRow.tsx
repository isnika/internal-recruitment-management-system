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

  const candidateName =
    `${item.application.user.firstName} ${item.application.user.lastName}`;

  const jobTitle = item.application.job.title;

  const scheduleDate = new Date(item.scheduleTime).toLocaleDateString();
  const scheduleTime = new Date(item.scheduleTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <tr>
      <td>{candidateName}</td>
      <td>{jobTitle}</td>
      <td>{item.location}</td>

      <td>{scheduleDate}</td>
      <td>{scheduleTime}</td>

      <td>
        <span className={`${styles.status} ${getStatusClass(item.status)}`}>
          {item.status}
        </span>
      </td>

      <td className={styles.actions}>
        <button onClick={() => onView(item)}>View</button>
        <button onClick={() => onReschedule(item)}>Reschedule</button>
        <button onClick={() => onUpdate(item)}>Update</button>
      </td>
    </tr>
  );
}