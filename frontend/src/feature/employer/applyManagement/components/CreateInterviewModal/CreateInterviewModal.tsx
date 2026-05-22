import React, { useEffect, useState } from "react";
import styles from "./CreateInterviewModal.module.css";
import type { Application } from "../../types/application.types";
import { FiX, FiCalendar, FiClock, FiUser, FiMapPin, FiVideo, FiFileText } from "react-icons/fi"; // Premium UI icons

type Props = {
  open: boolean;
  onClose: () => void;
  data: Application | null;
  onSave: (payload: {
    date: string;
    time: string;
    duration?: number;
    interviewer: string;
    type: "ONLINE" | "OFFLINE";
    location?: string;
    meetingLink?: string;
    note?: string;
  }) => void;
};

export default function CreateInterviewModal({ open, onClose, data, onSave }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [interviewer, setInterviewer] = useState("");
  const [type, setType] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset local state variables upon dialog initialization
  useEffect(() => {
    if (open) {
      setDate("");
      setTime("");
      setDuration(60);
      setInterviewer("");
      setType("ONLINE");
      setLocation("");
      setMeetingLink("");
      setNote("");
      setErrorMessage("");
    }
  }, [open]);

  if (!open || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents accidental page reloads
    setErrorMessage("");

    if (!date || !time || !interviewer.trim()) {
      setErrorMessage("Please fill out all required fields marked with an asterisk (*).");
      return;
    }

    onSave({
      date,
      time,
      duration,
      interviewer: interviewer.trim(),
      type,
      location: type === "OFFLINE" ? location.trim() : undefined,
      meetingLink: type === "ONLINE" ? meetingLink.trim() : undefined,
      note: note.trim(),
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>

        {/* MODAL HEADER BLOCK */}
        <header className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Schedule Interview Stage</h2>
            <p className={styles.modalSubtitle}>Configure timeline parameters and match target panel reviewers.</p>
          </div>
          <button className={styles.closeIconButton} onClick={onClose} type="button" aria-label="Close modal">
            <FiX />
          </button>
        </header>

        {/* INTERACTIVE FORM ENGINE */}
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.scrollableBody}>

            {/* ERROR SUMMARY TELEMETRY */}
            {errorMessage && (
              <div className={styles.errorBanner} role="alert">
                {errorMessage}
              </div>
            )}

            {/* SECTION 1: CANDIDATE SNAPSHOT (READ-ONLY PROFILE CARD) */}
            <section className={styles.formSection}>
              <h3 className={styles.sectionHeading}>Candidate Dossier</h3>
              <div className={styles.profileMetaGrid}>
                <div className={styles.metaField}>
                  <span className={styles.metaLabel}>Full Name</span>
                  <span className={styles.metaValue}>{data.candidateName}</span>
                </div>
                <div className={styles.metaField}>
                  <span className={styles.metaLabel}>Target Position</span>
                  <span className={styles.metaValue}>{data.jobTitle}</span>
                </div>
                <div className={styles.metaField}>
                  <span className={styles.metaLabel}>Electronic Mail</span>
                  <span className={styles.metaValue}>{data.recruitment?.email || data.email}</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: SCHEDULE CONFIGURATION GRID */}
            <section className={styles.formSection}>
              <h3 className={styles.sectionHeading}>Logistics &amp; Scheduling</h3>
              <div className={styles.inputsGrid}>

                {/* Date Input */}
                <div className={styles.formControl}>
                  <label className={styles.fieldLabel}>Date <span className={styles.required}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiCalendar className={styles.fieldIcon} />
                    <input type="date" className={styles.textInput} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>

                {/* Time Input */}
                <div className={styles.formControl}>
                  <label className={styles.fieldLabel}>Start Time <span className={styles.required}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiClock className={styles.fieldIcon} />
                    <input type="time" className={styles.textInput} value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>

                {/* Duration Input */}
                <div className={styles.formControl}>
                  <label className={styles.fieldLabel}>Duration (Minutes)</label>
                  <div className={styles.inputWrapper}>
                    <FiClock className={styles.fieldIcon} />
                    <input type="number" min="5" max="300" className={styles.textInput} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                  </div>
                </div>

                {/* Interview Medium Type */}
                <div className={styles.formControl}>
                  <label className={styles.fieldLabel}>Interview Type</label>
                  <div className={styles.inputWrapper}>
                    {type === "ONLINE" ? <FiVideo className={styles.fieldIcon} /> : <FiMapPin className={styles.fieldIcon} />}
                    <select className={styles.selectInput} value={type} onChange={(e) => setType(e.target.value as "ONLINE" | "OFFLINE")}>
                      <option value="ONLINE">Online Virtual Room</option>
                      <option value="OFFLINE">Offline On-Site Office</option>
                    </select>
                  </div>
                </div>

                {/* Interviewer Panel */}
                <div className={`${styles.formControl} ${styles.fullWidthRow}`}>
                  <label className={styles.fieldLabel}>Assigned Interviewer Panel <span className={styles.required}>*</span></label>
                  <div className={styles.inputWrapper}>
                    <FiUser className={styles.fieldIcon} />
                    <input type="text" placeholder="e.g., Alex Tran (Lead Engineer), Chloe Nguyen (HR)" className={styles.textInput} value={interviewer} onChange={(e) => setInterviewer(e.target.value)} />
                  </div>
                </div>

                {/* Conditional Sub-Inputs based on Type selection */}
                {type === "ONLINE" ? (
                  <div className={`${styles.formControl} ${styles.fullWidthRow}`}>
                    <label className={styles.fieldLabel}>Meeting Link / URL</label>
                    <div className={styles.inputWrapper}>
                      <FiVideo className={styles.fieldIcon} />
                      <input type="url" placeholder="https://meet.google.com/abc-xyz-123" className={styles.textInput} value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.formControl} ${styles.fullWidthRow}`}>
                    <label className={styles.fieldLabel}>Office Location / Room Address</label>
                    <div className={styles.inputWrapper}>
                      <FiMapPin className={styles.fieldIcon} />
                      <input type="text" placeholder="Meeting Room 4B, Level 12, Innovation Tower" className={styles.textInput} value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 3: ADMINISTRATIVE REMARKS */}
            <section className={styles.formSection}>
              <h3 className={styles.sectionHeading}>Internal Panel Guidance</h3>
              <div className={styles.formControl}>
                <label className={styles.fieldLabel}>Evaluation Notes / Preparation Brief</label>
                <div className={styles.textareaWrapper}>
                  <FiFileText className={styles.textareaIcon} />
                  <textarea placeholder="Outline initial target baseline score limits or focus questions..." className={styles.textareaInput} value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
                </div>
              </div>
            </section>

          </div>

          {/* CONTROL STACK FOOTER ACTION BAR */}
          <footer className={styles.modalFooterActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel Workspace
            </button>
            <button type="submit" className={styles.confirmSaveButton}>
              Generate Live Schedule
            </button>
          </footer>
        </form>

      </div>
    </div>
  );
}