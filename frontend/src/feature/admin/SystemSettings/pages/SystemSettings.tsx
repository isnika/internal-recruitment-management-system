import React, { useState } from "react";
import styles from "./SystemSettings.module.css";
import type { SystemLog } from "../../../../dataMock/adminMock";
import EmailConfigForm from "../components/EmailConfigForm";
import NotificationChannels from "../components/NotificationChannels";
import ActivityLogsTable from "../components/ActivityLogsTable";

import { initialLogs } from "../../../../dataMock/adminMock";

const SystemSettings: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "smtp.gmail.com",
    port: "587",
    senderName: "HKKQ Careers System",
    senderEmail: "noreply@hkkq.vn",
  });
  const [notificationConfig, setNotificationConfig] = useState({
    enableEmail: true,
    enablePush: true,
    enableSlack: false,
  });

  const onClearLogs = () => {
    setLogs([]);
  };
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
