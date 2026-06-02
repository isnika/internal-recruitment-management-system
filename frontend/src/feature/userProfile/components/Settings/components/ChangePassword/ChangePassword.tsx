import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ChangePassword.module.css";

import {
  forgotPassword,
  resetPassword
} from "../../../../../../service/authApi";

import { useAuth } from "../../../../../auth/context/AuthContext";

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

  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const userEmail = user?.email || "";

  const [message, setMessage] = useState<MessageState>({
    type: "",
    text: ""
  });

  // ================= STEP 1 =================
  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address!" });
      return;
    }

    try {
      setLoading(true);

      // ✔ ONLY ONE CALL (IMPORTANT FIX)
      await forgotPassword({ email });

      setMessage({
        type: "success",
        text: `Verification code sent to ${email}`
      });

      setStep(2);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to send verification code"
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 2 =================
  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      setMessage({ type: "error", text: "Please enter the OTP code!" });
      return;
    }

    setMessage({
      type: "success",
      text: "OTP verified successfully!"
    });

    setStep(3);
  };

  // ================= STEP 3 =================
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill all fields!" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        code: otp,
        newPassword
      });

      setMessage({
        type: "success",
        text: "Password reset successfully!"
      });

      setTimeout(() => {
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ type: "", text: "" });
      }, 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Reset password failed!"
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>Forgot Password</h3>
        <p>Secure password reset via email OTP verification.</p>
      </div>

      {/* STEP INDICATOR */}
      <div className={styles.stepIndicator}>
        <div className={`${styles.stepNode} ${step >= 1 ? styles.stepNodeActive : ""}`}>1</div>
        <div className={`${styles.stepLine} ${step >= 2 ? styles.stepLineActive : ""}`}></div>
        <div className={`${styles.stepNode} ${step >= 2 ? styles.stepNodeActive : ""}`}>2</div>
        <div className={`${styles.stepLine} ${step >= 3 ? styles.stepLineActive : ""}`}></div>
        <div className={`${styles.stepNode} ${step >= 3 ? styles.stepNodeActive : ""}`}>3</div>
      </div>

      {/* MESSAGE */}
      {message.text && (
        <div
          className={`${styles.alert} ${
            message.type === "success"
              ? styles.alertSuccess
              : styles.alertError
          }`}
        >
          {message.text}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className={styles.input}
            />
          </div>

          <button className={styles.primaryBtn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOtp(e.target.value)
              }
              className={styles.input}
              maxLength={6}
              placeholder="Enter OTP"
              required
            />
          </div>

          <div className={styles.btnGroup}>
            <button type="submit" className={styles.primaryBtn}>
              Verify
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => {
                setStep(1);
                setMessage({ type: "", text: "" });
              }}
            >
              Back
            </button>
          </div>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className={styles.input}
              placeholder="New password"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className={styles.input}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}

