import React, { useState } from 'react';
import styles from './ForgotPassW.module.css';

const ForgotPassW: React.FC = () => {
  // Quản lý các bước: 'email' (nhập email) hoặc 'reset' (nhập code và pass mới)
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Bước 1: Gửi yêu cầu quên mật khẩu
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Gọi API /api/auth/forgot-password
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Mã xác thực đã được gửi đến Email của bạn!' });
        setStep('reset'); // Chuyển sang bước nhập code và pass mới
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối hệ thống.' });
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Đặt lại mật khẩu mới
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không trùng khớp!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Gọi API /api/auth/reset-password
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.' });
        // Xóa form hoặc chuyển hướng người dùng về trang login tại đây
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Mã xác thực không đúng hoặc đã hết hạn.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối hệ thống.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {step === 'email' ? 'Quên Mật Khẩu?' : 'Đặt Lại Mật Khẩu'}
        </h2>
        <p className={styles.subtitle}>
          {step === 'email'
            ? 'Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.'
            : `Nhập mã code được gửi đến ${email} và mật khẩu mới.`}
        </p>

        {message.text && (
          <div className={`${styles.alert} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {step === 'email' ? (
          /* FORM BƯỚC 1: NHẬP EMAIL */
          <form onSubmit={handleForgotPassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi mã xác thực'}
            </button>
          </form>
        ) : (
          /* FORM BƯỚC 2: NHẬP CODE & PASS MỚI */
          <form onSubmit={handleResetPassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="code">Mã Xác Thực (Code)</label>
              <input
                type="text"
                id="code"
                placeholder="Nhập mã code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Tối thiểu 6 ký tự"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
            </button>
            <button
              type="button"
              className={styles.btnLink}
              onClick={() => setStep('email')}
            >
              Quay lại nhập Email
            </button>
          </form>
        )}

        <div className={styles.footer}>
          Quay lại <a href="/login" className={styles.link}>Đăng nhập</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassW;