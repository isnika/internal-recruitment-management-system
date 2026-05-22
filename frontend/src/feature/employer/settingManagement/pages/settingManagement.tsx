import React, { useState } from "react";
import styles from "./settingManagement.module.css";
import { FiMail, FiLock, FiShield, FiEye, FiEyeOff, FiKey, FiCheckCircle } from "react-icons/fi";

// Định nghĩa các bước trong chuỗi hành trình đổi mật khẩu
type Step = "EMAIL" | "OTP" | "PASSWORD" | "SUCCESS";

export default function SettingManagement() {
  const [currentStep, setCurrentStep] = useState<Step>("EMAIL");

  // ── DATA MANAGEMENT STATES ──
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState({ new: false, confirm: false });

  // ── SUBMIT HANDLERS FOR EACH STEP ──

  // Bước 1: Gửi yêu cầu mã OTP qua Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Requesting OTP for target:", email);
    // Giả lập gọi API gửi OTP thành công
    setCurrentStep("OTP");
  };

  // Bước 2: Xác thực mã OTP gửi về
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying token credential:", otp);
    // Giả lập mã OTP khớp lệnh thành công
    setCurrentStep("PASSWORD");
  };

  // Bước 3: Đổi mật khẩu mới
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Verification mismatch! Passphrases do not match.");
      return;
    }
    console.log("Committing secret rotation updates...");
    // Giả lập lưu mật khẩu thành công vào DB
    setCurrentStep("SUCCESS");
  };

  // Reset toàn bộ chu trình về ban đầu
  const handleResetFlow = () => {
    setEmail("");
    setOtp("");
    setPasswordForm({ newPassword: "", confirmPassword: "" });
    setCurrentStep("EMAIL");
  };

  return (
    <div className={styles.managementContainer}>

      {/* GLOBAL SYSTEM HEADER */}
      <header className={styles.managementHeader}>
        <div>
          <h1 className={styles.mainTitle}>Account Security Recovery</h1>
          <p className={styles.subTitle}>
            Follow the systemic verification pipeline to securely rotate your account gateway access credentials.
          </p>
        </div>
      </header>

      {/* CENTRAL CONTROL DECK */}
      <div className={styles.centralLayoutWrapper}>
        <section className={styles.configCard}>

          {/* STEP INDICATOR DOTS */}
          <div className={styles.stepProgressIndicator}>
            <span className={`${styles.stepDot} ${currentStep === "EMAIL" ? styles.activeDot : ""} ${["OTP", "PASSWORD", "SUCCESS"].includes(currentStep) ? styles.completedDot : ""}`}>1</span>
            <div className={styles.stepLine}></div>
            <span className={`${styles.stepDot} ${currentStep === "OTP" ? styles.activeDot : ""} ${["PASSWORD", "SUCCESS"].includes(currentStep) ? styles.completedDot : ""}`}>2</span>
            <div className={styles.stepLine}></div>
            <span className={`${styles.stepDot} ${currentStep === "PASSWORD" ? styles.activeDot : ""} ${currentStep === "SUCCESS" ? styles.completedDot : ""}`}>3</span>
          </div>

          {/* ── STAGE 1: EMAIL VERIFICATION ── */}
          {currentStep === "EMAIL" && (
            <form onSubmit={handleEmailSubmit} className={styles.verticalFormStack}>
              <div className={styles.formContextText}>
                <h3>Identify Identity</h3>
                <p>Provide your registered corporate email address to receive a security dynamic verification token.</p>
              </div>
              <div className={styles.inputGroup}>
                <label>Corporate Email</label>
                <div className={styles.fieldIconWrapper}>
                  <FiMail className={styles.inputPrefixIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.primaryActionButton}>
                <span>Request Verification Code</span>
              </button>
            </form>
          )}

          {/* ── STAGE 2: OTP TRANSMISSION CHALLENGE ── */}
          {currentStep === "OTP" && (
            <form onSubmit={handleOtpSubmit} className={styles.verticalFormStack}>
              <div className={styles.formContextText}>
                <h3>Security Challenge</h3>
                <p>An administrative token has been dispatched to <strong>{email}</strong>. Enter the 6-digit code below.</p>
              </div>
              <div className={styles.inputGroup}>
                <label>One-Time Token (OTP)</label>
                <div className={styles.fieldIconWrapper}>
                  <FiKey className={styles.inputPrefixIcon} />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-Digit Token"
                    className={styles.otpInputLayout}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.primaryActionButton}>
                <span>Verify Token Credentials</span>
              </button>
              <button type="button" onClick={handleResetFlow} className={styles.textGhostButton}>
                Change Email Address
              </button>
            </form>
          )}

          {/* ── STAGE 3: CREDENTIAL UPDATE TARGET ── */}
          {currentStep === "PASSWORD" && (
            <form onSubmit={handlePasswordSubmit} className={styles.verticalFormStack}>
              <div className={styles.formContextText}>
                <h3>Establish Passphrase</h3>
                <p>Identity confirmed. Authorize your target access credentials update profile below.</p>
              </div>

              <div className={styles.inputGroup}>
                <label>New Passphrase</label>
                <div className={styles.passwordFieldWrapper}>
                  <input
                    type={showPass.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPass({...showPass, new: !showPass.new})}>
                    {showPass.new ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Verify Passphrase</label>
                <div className={styles.passwordFieldWrapper}>
                  <input
                    type={showPass.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})}>
                    {showPass.confirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.securityResetButton}>
                <FiLock /> <span>Commit Secure Rotation</span>
              </button>
            </form>
          )}

          {/* ── STAGE 4: SUCCESS PROFILE TERMINAL ── */}
          {currentStep === "SUCCESS" && (
            <div className={styles.successScreenLayout}>
              <FiCheckCircle className={styles.successLargeIcon} />
              <h3>Rotation Completed</h3>
              <p>Your authentication gatekeeper credentials have been modified. All global live diagnostic sessions have been cleared safely.</p>
              <button type="button" onClick={handleResetFlow} className={styles.primaryActionButton}>
                Return to Security Core
              </button>
            </div>
          )}

        </section>
      </div>

    </div>
  );
}