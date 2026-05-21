import styles from "./InterviewTable.module.css";
import type  { Interview } from "../../types/types";
import InterviewRow from "../InterviewRow/InterviewRow";

type Props = {
  data: Interview[];
  onView: (i: Interview) => void;
  onReschedule: (i: Interview) => void;
  onUpdate: (i: Interview) => void;
};

export default function InterviewTable({
  data,
  onView,
  onReschedule,
  onUpdate,
}: Props) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Job</th>
            <th>Interviewer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <InterviewRow
              key={item.id}
              item={item}
              onView={onView}
              onReschedule={onReschedule}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}