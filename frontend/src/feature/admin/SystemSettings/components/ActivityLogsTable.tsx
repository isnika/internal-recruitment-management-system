import React from "react";
import { FiActivity, FiTrash2 } from "react-icons/fi";
import styles from "../pages/SystemSettings.module.css";
import type { SystemLog } from "../../../../dataMock/adminMock";

interface ActivityLogsTableProps {
  logs: SystemLog[];
  onClearLogs: () => void;
}

const ActivityLogsTable: React.FC<ActivityLogsTableProps> = ({
  logs,
  onClearLogs,
}) => {
  return (
    <div className={styles.logsCard}>
      <div className={styles.logsHeader}>
        <div className={styles.logsTitleRow}>
          <FiActivity className={styles.cardIcon} />
          <div>
            <h3 className={styles.cardTitle}>System Activity Logs</h3>
            <p className={styles.cardDesc}>{logs.length} recent admin actions recorded</p>
          </div>
        </div>
        <button
          className={styles.clearBtn}
          onClick={() => {
            if (window.confirm("Clear all activity logs? This cannot be undone.")) {
              onClearLogs();
            }
          }}
        >
          <FiTrash2 /> Clear Logs
        </button>
      </div>

      <div className={styles.logsTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action Description</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.empty}>
                  No activity logs recorded.
                </td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id}>
                <td className={styles.timestamp}>{log.timestamp}</td>
                <td className={styles.actor}>{log.actor}</td>
                <td>{log.action}</td>
                <td className={styles.ip}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogsTable;
