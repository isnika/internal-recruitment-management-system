import React from "react";
import { FiMail, FiBell, FiSlack, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import styles from "../pages/SystemSettings.module.css";

interface NotificationChannelsProps {
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
}

const NotificationChannels: React.FC<NotificationChannelsProps> = ({
  notificationConfig,
  setNotificationConfig,
}) => {
  const handleToggle = (key: keyof typeof notificationConfig) => {
    setNotificationConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <FiBell className={styles.cardIcon} />
        <div>
          <h3 className={styles.cardTitle}>Notification Channels</h3>
          <p className={styles.cardDesc}>Toggle active notification delivery methods</p>
        </div>
      </div>

      <div className={styles.notifList}>
        <div className={styles.notifRow}>
          <div className={styles.notifInfo}>
            <FiMail className={styles.notifIcon} />
            <div>
              <span className={styles.notifName}>Email Notifications</span>
              <span className={styles.notifDesc}>
                Send email alerts for job approvals, new registrations
              </span>
            </div>
          </div>
          <button
            className={`${styles.toggleBtn} ${
              notificationConfig.enableEmail ? styles.toggleBtnOn : ""
            }`}
            onClick={() => handleToggle("enableEmail")}
          >
            {notificationConfig.enableEmail ? <FiToggleRight /> : <FiToggleLeft />}
          </button>
        </div>

        <div className={styles.notifRow}>
          <div className={styles.notifInfo}>
            <FiBell className={styles.notifIcon} />
            <div>
              <span className={styles.notifName}>Push Notifications</span>
              <span className={styles.notifDesc}>
                Browser push alerts for real-time activity
              </span>
            </div>
          </div>
          <button
            className={`${styles.toggleBtn} ${
              notificationConfig.enablePush ? styles.toggleBtnOn : ""
            }`}
            onClick={() => handleToggle("enablePush")}
          >
            {notificationConfig.enablePush ? <FiToggleRight /> : <FiToggleLeft />}
          </button>
        </div>

        <div className={styles.notifRow}>
          <div className={styles.notifInfo}>
            <FiSlack className={styles.notifIcon} />
            <div>
              <span className={styles.notifName}>Slack Integration</span>
              <span className={styles.notifDesc}>
                Forward admin events to a Slack workspace channel
              </span>
            </div>
          </div>
          <button
            className={`${styles.toggleBtn} ${
              notificationConfig.enableSlack ? styles.toggleBtnOn : ""
            }`}
            onClick={() => handleToggle("enableSlack")}
          >
            {notificationConfig.enableSlack ? <FiToggleRight /> : <FiToggleLeft />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationChannels;
