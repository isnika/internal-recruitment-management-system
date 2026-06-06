import React, { useState } from 'react';
import styles from './ForgotPassW.module.css';

const ForgotPassW: React.FC = () => {
  // Manage steps: 'email' (enter email) or 'reset' (enter code and new password)
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Step 1: Send forgot password request
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Verification code has been sent to your email!' });
        setStep('reset');
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Something went wrong, please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'System connection error.' });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Confirm password does not match!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset successful! You can log in now.' });
        // Clear form or redirect to login page here
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Verification code is invalid or expired.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'System connection error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
        </h2>
        <p className={styles.subtitle}>
          {step === 'email'
            ? 'Enter your email to receive a verification code to reset your password.'
            : `Enter the code sent to ${email} and your new password.`}
        </p>

        {message.text && (
          <div className={`${styles.alert} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {step === 'email' ? (
          /* STEP 1 FORM: ENTER EMAIL */
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
              {loading ? 'Sending...' : 'Send verification code'}
            </button>
          </form>
        ) : (
          /* STEP 2 FORM: ENTER CODE & NEW PASSWORD */
          <form onSubmit={handleResetPassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="code">Verification Code</label>
              <input
                type="text"
                id="code"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm password change'}
            </button>
            <button
              type="button"
              className={styles.btnLink}
              onClick={() => setStep('email')}
            >
              Back to Email
            </button>
          </form>
        )}

        <div className={styles.footer}>
          Back to <a href="/login" className={styles.link}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassW;
