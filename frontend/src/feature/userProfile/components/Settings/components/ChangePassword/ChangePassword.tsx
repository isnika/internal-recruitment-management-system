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
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [emailInput, setEmailInput] = useState<string>(""); // only for guest
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<MessageState>({
    type: "",
    text: ""
  });

  // FINAL EMAIL LOGIC
  const finalEmail = user?.email || emailInput;

  // ================= STEP 1 =================
  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!finalEmail) {
      setMessage({
        type: "error",
        text: "Please provide email!"
      });
      return;
    }

    try {
      setLoading(true);

      await forgotPassword({ email: finalEmail });

      setMessage({
        type: "success",
        text: `OTP sent to ${finalEmail}`
      });

      setStep(2);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to send OTP"
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 2 =================
  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      setMessage({ type: "error", text: "Please enter OTP!" });
      return;
    }

    setMessage({
      type: "success",
      text: "OTP verified"
    });

    setStep(3);
  };

  // ================= STEP 3 =================
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage({
        type: "error",
        text: "Please fill all fields!"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match!"
      });
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email: finalEmail,
        code: otp,
        newPassword
      });

      setMessage({
        type: "success",
        text: "Password reset successfully!"
      });

      setTimeout(() => {
        setStep(1);
        setEmailInput("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ type: "", text: "" });
      }, 1500);

    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Reset password failed!"
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
        <p>Secure password reset via OTP verification</p>
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

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={styles.formStack}>
          <div className={styles.formGroup}>
            <label>Email</label>

            {user?.email ? (
              <input
                type="email"
                value={user.email}
                className={styles.input}
                disabled
              />
            ) : (
              <input
                type="email"
                value={emailInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmailInput(e.target.value)
                }
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            )}
          </div>

          <button className={styles.primaryBtn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      )}

      {/* ================= STEP 2 ================= */}
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

      {/* ================= STEP 3 ================= */}
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