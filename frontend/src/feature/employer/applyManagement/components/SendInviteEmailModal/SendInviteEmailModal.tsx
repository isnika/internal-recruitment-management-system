import React, { useEffect, useState } from "react";
import styles from "./SendInviteEmailModal.module.css";
import type { Application } from "../../types/application.types";
import { FiX, FiMail, FiEdit3, FiUser, FiSend } from "react-icons/fi"; // Premium UI Iconography

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

export default function SendInviteEmailModal({ open, onClose, data, onSend }: Props) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Populate smart dynamic template data when modal session initializes
  useEffect(() => {
    if (open && data) {
      setSubject(`Interview Invitation: ${data.jobTitle} Position`);
      setErrorMessage("");

      setMessage(
        `Dear ${data.candidateName},\n\n` +
        `Thank you for your application to join our team. We are pleased to invite you to the interview phase for the ${data.jobTitle} role.\n\n` +
        `Here are the logistics of your upcoming session:\n` +
        `📅 Date: ${data.date || "To Be Announced"}\n` +
        `⏰ Time: ${data.time || "To Be Announced"}\n` +
        `👤 Interviewer Panel: ${data.interviewer || "Technical Review Team"}\n` +
        `📍 Format/Location: ${data.location || "Online Virtual Meeting"}\n\n` +
        `Please reply directly to this email stream to confirm your availability. If you require any schedule readjustments, let us know as soon as possible.\n\n` +
        `Best regards,\n` +
        `Talent Acquisition Team Office`
      );
    }
  }, [open, data]);

  if (!open || !data) return null;

  const targetEmail = data.recruitment?.email || data.email;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!subject.trim() || !message.trim()) {
      setErrorMessage("Both the Email Subject and Message Body are mandatory before dispatch.");
      return;
    }

    onSend({
      to: targetEmail,
      subject: subject.trim(),
      message: message.trim(),
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>

        {/* MODAL HEADER BLOCK */}
        <header className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Dispatch Invitation Stream</h2>
            <p className={styles.modalSubtitle}>Review and edit outbox email communication templates below.</p>
          </div>
          <button className={styles.closeIconButton} onClick={onClose} type="button" aria-label="Close modal">
            <FiX />
          </button>
        </header>

        {/* OUTBOUND DISPATCH FORM */}
        <form onSubmit={handleSend} className={styles.modalForm}>
          <div className={styles.scrollableBody}>

            {errorMessage && (
              <div className={styles.errorBanner} role="alert">
                {errorMessage}
              </div>
            )}

            {/* RECIPIENT TELEMETRY METRIC BLOCK */}
            <div className={styles.recipientDossier}>
              <div className={styles.dossierRow}>
                <FiUser className={styles.dossierIcon} />
                <span className={styles.dossierLabel}>Recipient:</span>
                <strong className={styles.dossierValue}>{data.candidateName}</strong>
                <span className={styles.dossierSubtext}>({targetEmail})</span>
              </div>
            </div>

            {/* INPUT FIELD: SUBJECT LINE */}
            <div className={styles.formControl}>
              <label className={styles.fieldLabel}>Subject Line <span className={styles.required}>*</span></label>
              <div className={styles.inputWrapper}>
                <FiMail className={styles.fieldIcon} />
                <input
                  type="text"
                  className={styles.textInput}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject header..."
                />
              </div>
            </div>

            {/* INPUT FIELD: TEXT BODY EDITOR */}
            <div className={styles.formControl}>
              <label className={styles.fieldLabel}>Email Message Body <span className={styles.required}>*</span></label>
              <div className={styles.textareaWrapper}>
                <FiEdit3 className={styles.textareaIcon} />
                <textarea
                  className={styles.textareaInput}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  placeholder="Draft your main notification content..."
                />
              </div>
            </div>

          </div>

          {/* CONTROL STACK ACTIONS BAR */}
          <footer className={styles.modalFooterActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel Stream
            </button>
            <button type="submit" className={styles.confirmSendButton}>
              <FiSend className={styles.sendActionIcon} /> Transmit Outbound Mail
            </button>
          </footer>
        </form>

      </div>
    </div>
  );
}