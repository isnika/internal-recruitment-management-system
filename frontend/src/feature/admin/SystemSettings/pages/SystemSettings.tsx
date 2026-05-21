import React from "react";
import styles from "./SystemSettings.module.css";
import type { SystemLog } from "../../../../dataMock/adminMock";
import EmailConfigForm from "../components/EmailConfigForm";
import NotificationChannels from "../components/NotificationChannels";
import ActivityLogsTable from "../components/ActivityLogsTable";

interface SystemSettingsProps {
  logs: SystemLog[];
  emailConfig: {
    smtpServer: string;
    port: string;
    senderName: string;
    senderEmail: string;
  };
  setEmailConfig: React.Dispatch<
    React.SetStateAction<{
      smtpServer: string;
      port: string;
      senderName: string;
      senderEmail: string;
    }>
  >;
  notificationConfig: {
    enableEmail: boolean;
    enablePush: boolean;
    enableSlack: boolean;
  };
  setNotificationConfig: React.Dispatch<
    React.SetStateAction<{
      enableEmail: boolean;
      enablePush: boolean;
      enableSlack: boolean;
    }>
  >;
  onClearLogs: () => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  logs,
  emailConfig,
  setEmailConfig,
  notificationConfig,
  setNotificationConfig,
  onClearLogs,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Settings</h1>
        <p className={styles.subtitle}>
          Configure email delivery, notification channels, and monitor system activity logs.
        </p>
      </div>

      <div className={styles.settingsGrid}>
        {/* Email Configuration */}
        <EmailConfigForm
          emailConfig={emailConfig}
          setEmailConfig={setEmailConfig}
        />

        {/* Notification Configuration */}
        <NotificationChannels
          notificationConfig={notificationConfig}
          setNotificationConfig={setNotificationConfig}
        />
      </div>

      {/* System Activity Logs */}
      <ActivityLogsTable
        logs={logs}
        onClearLogs={onClearLogs}
      />
    </div>
  );
};

export default SystemSettings;
