import ApplicationRow from "../ApplicationRow/ApplicationRow";
import type {
  Application,
  ApplicationStatus,
  RecruitmentInfo,
} from "../../types/application.types";

import styles from "./ApplicationTable.module.css";

type Props = {
  data: Application[];

  onViewProfile: (data: RecruitmentInfo) => void;

  onUpdateStatus: (id: number, status: ApplicationStatus) => void;

  onCreateInterview: (application: Application) => void;

  onSendInviteEmail: (application: Application) => void;
};

export default function ApplicationTable({
  data,
  onViewProfile,
  onUpdateStatus,
  onCreateInterview,
  onSendInviteEmail,
}: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Candidate</th>
          <th>Job</th>
          <th>Email</th>
          <th>Status</th>
          <th>Update</th>
          <th>Actions</th>

        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <ApplicationRow
            key={item.id}
            item={item}
            onViewProfile={onViewProfile}
            onUpdateStatus={onUpdateStatus}
            onCreateInterview={onCreateInterview}
            onSendInviteEmail={onSendInviteEmail}
          />
        ))}
      </tbody>
    </table>
  );
}