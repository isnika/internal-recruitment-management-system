import { useEffect, useState } from "react";
import styles from "./SendInviteEmailModal.module.css";

import type { Application } from "../../types/application.types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: (Application & {
    date?: string;
    time?: string;
    interviewer?: string;
    type?: string;
    location?: string;
  }) | null;

  onSend: (payload: {
    to: string;
    subject: string;
    message: string;
  }) => void;
};

export default function SendInviteEmailModal({
  open,
  onClose,
  data,
  onSend,
}: Props) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open && data) {
      setSubject(`Interview Invitation - ${data.jobTitle}`);

      setMessage(
        `Hi ${data.candidateName},

We are pleased to invite you to the interview for the ${data.jobTitle} position.

📅 Date: ${data.date || "TBA"}
⏰ Time: ${data.time || "TBA"}
👤 Interviewer: ${data.interviewer || "TBA"}
📍 Location: ${data.location || "Online"}

Please confirm your attendance.

Best regards,
HR Team`
      );
    }
  }, [open, data]);

  if (!open || !data) return null;

  const handleSend = () => {
    if (!subject || !message) return;

    onSend({
      to: data.email, // ✅ FIX QUAN TRỌNG
      subject,
      message,
    });

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>📧 Gửi email invite</h2>

        <p className={styles.sub}>
          To: <b>{data.candidateName}</b> — {data.jobTitle}
        </p>

        <div className={styles.form}>
          <label>
            Subject
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>

          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>

          <button onClick={handleSend} className={styles.send}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}