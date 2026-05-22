import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ChangePassword.module.css";

interface MessageState {
  type: "success" | "error" | "";
  text: string;
}

export default function ChangePassword(): React.ReactElement {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" });

  const handleSendOtp = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address!" });
      return;
    }
    setMessage({ type: "success", text: `Verification code dispatched to ${email}` });
    setStep(2);
  };

  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!otp) {
      setMessage({ type: "error", text: "Please enter the OTP code!" });
      return;
    }
    setMessage({ type: "success", text: "Identity authenticated successfully!" });
    setStep(3);
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Please populate all fields!" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    setMessage({ type: "success", text: "Password rotated successfully!" });

    setTimeout(() => {
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "", text: "" });
    }, 2000);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>Security Passphrase</h3>
        <p>Rotate your access credentials securely via multi-stage OTP email verification.</p>
      </div>

      {/* STEP PROGRESS TRACKER */}
      <div className={styles.stepIndicator}>
        <div className={`${styles.stepNode} ${step >= 1 ? styles.stepNodeActive : ""}`}>1</div>
        <div className={`${styles.stepLine} ${step >= 2 ? styles.stepLineActive : ""}`}></div>
        <div className={`${styles.stepNode} ${step >= 2 ? styles.stepNodeActive : ""}`}>2</div>
        <div className={`${styles.stepLine} ${step >= 3 ? styles.stepLineActive : ""}`}></div>
        <div className={`${styles.stepNode} ${step >= 3 ? styles.stepNodeActive : ""}`}>3</div>
      </div>

      {/* FEEDBACK SYSTEM NOTIFICATIONS */}
      {message.text && (
        <div className={`${styles.alert} ${message.type === "success" ? styles.alertSuccess : styles.alertError}`}>
          <span className={styles.alertDot}></span>
          {message.text}
        </div>
      )}

      {/* STAGE 1: EMAIL REQUEST */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="example@enterprise.com"
              required
            />
          </div>
          <button type="submit" className={styles.primaryBtn}>
            Send Verification Code
          </button>
        </form>
      )}

      {/* STAGE 2: OTP TRANSMISSION */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>Verification Token</label>
            <input
              type="text"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              className={`${styles.input} ${styles.otpInput}`}
              placeholder="0 0 0 0 0 0"
              maxLength={6}
              required
            />
          </div>
          <div className={styles.btnGroup}>
            <button type="submit" className={styles.primaryBtn}>Verify Token</button>
            <button type="button" onClick={() => { setStep(1); setMessage({type: "", text: ""}); }} className={styles.secondaryBtn}>
              Back
            </button>
          </div>
        </form>
      )}

      {/* STAGE 3: PASSPHRASE SELECTION */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>New Passphrase</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              className={styles.input}
              placeholder="Minimum 6 characters"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm New Passphrase</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="Re-enter password parameters"
              required
            />
          </div>
          <button type="submit" className={`${styles.primaryBtn} ${styles.successBtn}`}>
            Authorize Rotation
          </button>
        </form>
      )}
    </div>
  );
}