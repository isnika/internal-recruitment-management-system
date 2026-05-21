import React, { useState } from "react";
import Modal from "../BaseModal/Modal";
import styles from "./RescheduleModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave: (updated: any) => void;
};

const RescheduleModal = ({ open, onClose, data, onSave }: Props) => {
  const [date, setDate] = useState(data?.date || "");
  const [time, setTime] = useState(data?.time || "");

  const handleSave = () => {
    onSave({
      ...data,
      date,
      time,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Reschedule Interview">
      <div className={styles.container}>
        <div className={styles.wrapper}>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <input
              className={styles.input}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Time</label>
            <input
              className={styles.input}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button className={styles.button} onClick={handleSave}>
            Save
          </button>

        </div>
      </div>
    </Modal>
  );
};

export default RescheduleModal;