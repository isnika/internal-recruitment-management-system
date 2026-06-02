import React, { useState } from "react";
import { FiMail, FiSave } from "react-icons/fi";
import styles from "../pages/SystemSettings.module.css";

interface EmailConfigFormProps {
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
}

const EmailConfigForm: React.FC<EmailConfigFormProps> = ({
  emailConfig,
  setEmailConfig,
}) => {
  const [emailSaved, setEmailSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePort = (port: string) => {
    const portNum = parseInt(port, 10);
    return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
  };

  const handleSaveEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!emailConfig.smtpServer.trim()) {
      newErrors.smtpServer = "SMTP server is required";
    }

    if (!emailConfig.port.trim()) {
      newErrors.port = "Port is required";
    } else if (!validatePort(emailConfig.port)) {
      newErrors.port = "Port must be between 1 and 65535";
    }

    if (!emailConfig.senderName.trim()) {
      newErrors.senderName = "Sender name is required";
    }

    if (!emailConfig.senderEmail.trim()) {
      newErrors.senderEmail = "Sender email is required";
    } else if (!validateEmail(emailConfig.senderEmail)) {
      newErrors.senderEmail = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <FiMail className={styles.cardIcon} />
        <div>
          <h3 className={styles.cardTitle}>Email Configuration</h3>
          <p className={styles.cardDesc}>SMTP settings for outbound emails</p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>SMTP Server</label>
          <input
            className={styles.input}
            value={emailConfig.smtpServer}
            onChange={(e) =>
              setEmailConfig((p) => ({ ...p, smtpServer: e.target.value }))
            }
            placeholder="smtp.gmail.com"
            aria-label="SMTP Server"
            aria-invalid={!!errors.smtpServer}
          />
          {errors.smtpServer && <span className={styles.errorText}>{errors.smtpServer}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Port</label>
          <input
            className={styles.input}
            value={emailConfig.port}
            onChange={(e) =>
              setEmailConfig((p) => ({ ...p, port: e.target.value }))
            }
            placeholder="587"
            aria-label="Port"
            aria-invalid={!!errors.port}
          />
          {errors.port && <span className={styles.errorText}>{errors.port}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Sender Name</label>
          <input
            className={styles.input}
            value={emailConfig.senderName}
            onChange={(e) =>
              setEmailConfig((p) => ({ ...p, senderName: e.target.value }))
            }
            placeholder="HKKQ Careers System"
            aria-label="Sender Name"
            aria-invalid={!!errors.senderName}
          />
          {errors.senderName && <span className={styles.errorText}>{errors.senderName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Sender Email</label>
          <input
            className={styles.input}
            type="email"
            value={emailConfig.senderEmail}
            onChange={(e) =>
              setEmailConfig((p) => ({ ...p, senderEmail: e.target.value }))
            }
            placeholder="noreply@hkkq.vn"
            aria-label="Sender Email"
            aria-invalid={!!errors.senderEmail}
          />
          {errors.senderEmail && <span className={styles.errorText}>{errors.senderEmail}</span>}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button
          className={`${styles.saveBtn} ${emailSaved ? styles.saveBtnSuccess : ""}`}
          onClick={handleSaveEmail}
        >
          <FiSave />
          {emailSaved ? "Configuration Saved!" : "Save Email Config"}
        </button>
      </div>
    </div>
  );
};

export default EmailConfigForm;
