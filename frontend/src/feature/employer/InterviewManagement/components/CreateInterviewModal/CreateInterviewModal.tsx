import React, { useState } from "react";
import interviewApi from "../../../../../service/interviewApi";
import styles from "./CreateInterviewModal.module.css";
import { FiX, FiCalendar, FiClock, FiMapPin, FiFileText } from "react-icons/fi";

interface CreateInterviewModalProps {
  applicationId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  applicationId,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !location.trim()) {
      alert("Vui lòng điền đầy đủ Ngày, Giờ và Địa điểm phỏng vấn!");
      return;
    }

    try {
      setLoading(true);
      // Backend expects scheduleTime as LocalDateTime string like "2026-06-15T14:30:00"
      const scheduleTime = `${date}T${time}:00`;

      await interviewApi.create({
        applicationId,
        scheduleTime,
        location,
        note,
      });

      onSuccess();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || err?.message || "Lên lịch thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Lên lịch phỏng vấn</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <label>
                <FiCalendar /> Ngày phỏng vấn
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiClock /> Giờ phỏng vấn
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiMapPin /> Địa điểm / Link Meet
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: Phòng họp A, Tầng 3 hoặc Link Google Meet"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiFileText /> Ghi chú cho ứng viên (Tùy chọn)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Vui lòng mang theo laptop cá nhân..."
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Xác nhận & Gửi Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
