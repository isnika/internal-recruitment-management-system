import React from "react";
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
    <div className={styles.tableWorkspace}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th className={styles.thId}>App ID</th>
            <th className={styles.thCandidate}>Candidate Info</th>
            <th className={styles.thJob}>Target Position</th>
            <th className={styles.thDate}>Applied Date</th>
            <th className={styles.thStatus}>Pipeline Status</th>
            <th className={styles.thStage}>Stage Update</th>
            <th className={styles.thActions}>Quick Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <ApplicationRow
                key={item.id}
                item={item}
                onViewProfile={onViewProfile}
                onUpdateStatus={onUpdateStatus}
                onCreateInterview={onCreateInterview}
                onSendInviteEmail={onSendInviteEmail}
              />
            )
          )) : (
            <tr>
              <td colSpan={7} className={styles.emptyStateNotify}>
                <div className={styles.emptyStateContainer}>
                  <span>No candidate applications found matching the criteria.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}