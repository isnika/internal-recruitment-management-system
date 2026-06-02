import React from "react";
import { Application } from "../../../../../service/applicationApi";
import { ApplicationRow } from "../ApplicationRow/ApplicationRow";
import styles from "./ApplicationTable.module.css";

interface ApplicationTableProps {
  applications: Application[];
  onViewDetail: (app: Application) => void;
  onStatusChange: (id: number, status: string) => void;
  updatingId: number | null;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onViewDetail,
  onStatusChange,
  updatingId,
}) => {
  if (applications.length === 0) {
    return <div className={styles.empty}>Không tìm thấy ứng viên nào phù hợp.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ứng viên</th>
            <th>Email</th>
            <th>Vị trí ứng tuyển</th>
            <th>Ngày ứng tuyển</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <ApplicationRow
              key={app.id}
              application={app}
              onViewDetail={onViewDetail}
              onStatusChange={onStatusChange}
              isUpdating={updatingId === app.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};