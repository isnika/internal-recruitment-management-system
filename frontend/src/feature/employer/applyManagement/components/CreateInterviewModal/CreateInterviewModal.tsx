import { useEffect, useState } from "react";
import styles from "./CreateInterviewModal.module.css";

import type { Application } from "../../types/application.types";

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

export default function CreateInterviewModal({
  open,
  onClose,
  data,
  onSave,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [interviewer, setInterviewer] = useState("");
  const [type, setType] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [note, setNote] = useState("");

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
    }
  }, [open]);

  if (!open || !data) return null;

  const handleSubmit = () => {
    if (!date || !time || !interviewer) {
      alert("Please fill required fields");
      return;
    }

    onSave({
      date,
      time,
      duration,
      interviewer,
      type,
      location: type === "OFFLINE" ? location : undefined,
      meetingLink: type === "ONLINE" ? meetingLink : undefined,
      note,
    });

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Tạo lịch phỏng vấn</h2>
        </div>

        {/* BODY (SCROLL AREA) */}
        <div className={styles.body}>
          {/* BASIC */}
          <div className={styles.section}>
            <h3>Basic Information</h3>

            <div className={styles.readonly}>
              <p>
                Candidate Name: <b>{data.candidateName}</b>
              </p>
              <p>
                Email: <b>{data.email}</b>
              </p>
              <p>
                Job Title: <b>{data.jobTitle}</b>
              </p>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className={styles.section}>
            <h3>Schedule Information</h3>

            <div className={styles.form}>
              <label>
                Date *
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>

              <label>
                Time *
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </label>

              <label>
                Duration
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </label>

              <label>
                Interviewer *
                <input
                  value={interviewer}
                  onChange={(e) => setInterviewer(e.target.value)}
                />
              </label>

              <label>
                Type
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "ONLINE" | "OFFLINE")}
                >
                  <option value="ONLINE">Online</option>
                  <option value="OFFLINE">Offline</option>
                </select>
              </label>

              {type === "OFFLINE" && (
                <label>
                  Location
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
              )}

              {type === "ONLINE" && (
                <label>
                  Meeting Link
                  <input
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                </label>
              )}
            </div>
          </div>

          {/* NOTES */}
          <div className={styles.section}>
            <h3>Notes</h3>

            <label>
              Note
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>

          <button onClick={handleSubmit} className={styles.save}>
            Create Interview
          </button>
        </div>
      </div>
    </div>
  );
}