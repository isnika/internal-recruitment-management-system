import styles from "../InterviewRow/InterviewRow.module.css";
import type  { Interview } from "../../types/types";

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
      case "SCHEDULED":
        return styles.scheduled;
      case "DONE":
        return styles.done;
      case "CANCELLED":
        return styles.cancelled;
    }
  };

  return (
    <tr>
      <td>{item.candidateName}</td>
      <td>{item.jobTitle}</td>
      <td>{item.interviewer}</td>
      <td>{item.date}</td>
      <td>{item.time}</td>

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