import React from "react";
import { Application } from "../../../service/applicationApi";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { StatusDropdown } from "../StatusDropdown/StatusDropdown";
import styles from "./ApplicationRow.module.css";

interface ApplicationRowProps {
  application: Application;
  onViewDetail: (app: Application) => void;
  onStatusChange: (id: number, status: string) => void;
  isUpdating: boolean;
}

export const ApplicationRow: React.FC<ApplicationRowProps> = ({
  application,
  onViewDetail,
  onStatusChange,
  isUpdating,
}) => {
  const { user, job, appliedAt, status, id } = application;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <tr className={styles.row} onClick={() => onViewDetail(application)}>
      <td className={styles.bold}>{fullName}</td>
      <td>{user.email}</td>
      <td>{job.title}</td>
      <td>{new Date(appliedAt).toLocaleDateString("vi-VN")}</td>
      <td>
        <StatusBadge status={status} />
      </td>
      <td>
        <StatusDropdown
          currentStatus={status}
          disabled={isUpdating}
          onStatusChange={(newStatus) => onStatusChange(id, newStatus)}
        />
      </td>
      <td>
        <button
          className={styles.viewBtn}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(application);
          }}
        >
          Xem CV
        </button>
      </td>
    </tr>
  );
};