import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../../Settings.module.css"; // Dùng chung file CSS với Settings

interface MessageState {
  type: "success" | "error" | "";
  text: string;
}

export default function ChangePassword(): React.ReactElement {
  // Quản lý các bước: 1 = Nhập Email, 2 = Nhập OTP, 3 = Nhập mật khẩu mới
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Dữ liệu người dùng nhập
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Thông báo lỗi/thành công
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" });

  // Bước 1: Gửi yêu cầu mã OTP về Gmail
  const handleSendOtp = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Vui lòng nhập Email của bạn!" });
      return;
    }
    // Giả lập gọi API gửi OTP thành công
    setMessage({ type: "success", text: `Mã OTP đã được gửi đến ${email}!` });
    setStep(2); // Chuyển sang bước 2
  };

  // Bước 2: Xác nhận mã OTP
  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!otp) {
      setMessage({ type: "error", text: "Vui lòng nhập mã OTP!" });
      return;
    }
    // Giả lập kiểm tra OTP đúng (Ví dụ: OTP đúng là 123456)
    setMessage({ type: "success", text: "Xác thực mã OTP thành công!" });
    setStep(3); // Chuyển sang bước 3
  };

  // Bước 3: Đổi mật khẩu mới
  const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Vui lòng nhập đầy đủ mật khẩu!" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      return;
    }
    // Giả lập gọi API cập nhật mật khẩu thành công
    setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });

    // Reset lại form về ban đầu sau khi thành công
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
      <h3>Đổi mật khẩu</h3>
      <p>Hệ thống sẽ xác thực qua OTP Gmail để đảm bảo an toàn.</p>

      {/* Hiển thị thông báo */}
      {message.text && (
        <div className={`${styles.alert} ${message.type === "success" ? styles.alertSuccess : styles.alertError}`}>
          {message.text}
        </div>
      )}

      {/* BƯỚC 1: NHẬP GMAIL */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className={styles.form}>
          <div className={styles.formGroup}>
            <label>1. Nhập địa chỉ Gmail</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <button type="submit" className={styles.button}>Gửi mã OTP</button>
        </form>
      )}

      {/* BƯỚC 2: NHẬP MÃ OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className={styles.form}>
          <div className={styles.formGroup}>
            <label>2. Nhập mã OTP (Đã gửi vào Gmail của bạn)</label>
            <input
              type="text"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
              className={styles.input}
              placeholder="Nhập 6 số OTP"
              maxLength={6}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>Xác nhận mã</button>
            <button type="button" onClick={() => setStep(1)} className={styles.buttonSecondary}>Quay lại</button>
          </div>
        </form>
      )}

      {/* BƯỚC 3: NHẬP MẬT KHẨU MỚI */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              className={styles.input}
              placeholder="Tối thiểu 6 ký tự"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className={styles.input}
              placeholder="Nhập lại mật khẩu mới"
              required
            />
          </div>
          <button type="submit" className={styles.button}>Cập nhật mật khẩu</button>
        </form>
      )}
    </div>
  );
}