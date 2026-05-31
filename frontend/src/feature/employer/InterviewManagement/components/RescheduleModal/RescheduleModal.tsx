import { useEffect, useState } from "react";
import Modal from "../BaseModal/Modal";
import styles from "./RescheduleModal.module.css";

import type { Interview } from "../../types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Interview | null;
  onSave: (updated: { id: number; scheduleTime: string }) => void;
};

export default function RescheduleModal({
  open,
  onClose,
  data,
  onSave,
}: Props) {
  const [scheduleTime, setScheduleTime] = useState("");

  // ======================
  // FIX: SAFE LOCAL TIME FORMAT
  // ======================
  const formatToLocalInput = (iso: string) => {
    const dt = new Date(iso);

    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");

    const hours = String(dt.getHours()).padStart(2, "0");
    const minutes = String(dt.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // ======================
  // SYNC DATA
  // ======================
  useEffect(() => {
    if (open && data?.scheduleTime) {
      setScheduleTime(formatToLocalInput(data.scheduleTime));
    }

    if (!open) {
      setScheduleTime("");
    }
  }, [data, open]);

  // ======================
  // SAVE
  // ======================
  const handleSave = () => {
    if (!data || !scheduleTime) return;

    onSave({
      id: data.id,
      scheduleTime,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Reschedule Interview">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Schedule Date & Time
            </label>

            <input
              className={styles.input}
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>

          <button className={styles.button} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}