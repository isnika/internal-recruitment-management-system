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

  // sync mỗi khi mở modal
  useEffect(() => {
    if (data?.scheduleTime) {
      const dt = new Date(data.scheduleTime);

      const datePart = dt.toISOString().split("T")[0];
      const timePart = dt.toTimeString().slice(0, 5);

      setScheduleTime(`${datePart}T${timePart}`);
    }
  }, [data, open]);

  const handleSave = () => {
    if (!data) return;

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
            <label className={styles.label}>Schedule Date & Time</label>

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