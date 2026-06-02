import React, { useState } from "react";
import styles from "./InterviewMe.module.css";
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from "react-icons/fi";

// Định nghĩa kiểu dữ liệu cho một buổi Interview
interface Interview {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  interviewDate: string;
  interviewTime: string;
  type: "ONLINE" | "OFFLINE";
  locationOrLink: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  notes?: string;
}

export default function InterviewMe() {
  // Danh sách dữ liệu mẫu (Mock Data)
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      jobTitle: "Senior Frontend Engineer (React)",
      companyName: "FPT Software",
      interviewDate: "2026-06-10",
      interviewTime: "14:00 - 15:00",
      type: "ONLINE",
      locationOrLink: "https://meet.google.com/abc-xyz-def",
      status: "PENDING",
      notes: "Vui lòng chuẩn bị sẵn CV bản cứng và portfolio dự án cá nhân.",
    },
    {
      id: 2,
      jobTitle: "Fullstack Developer (Node.js/React)",
      companyName: "VNG Corporation",
      interviewDate: "2026-06-15",
      interviewTime: "09:30 - 11:00",
      type: "OFFLINE",
      locationOrLink: "Tòa nhà VNG Campus, Quận 7, TP. Hồ Chí Minh",
      status: "ACCEPTED",
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      companyName: "Viettel Group",
      interviewDate: "2026-05-28",
      interviewTime: "16:00 - 17:00",
      type: "ONLINE",
      locationOrLink: "https://zoom.us/j/123456789",
      status: "REJECTED",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // ==========================================
  // XỬ LÝ CHẤP NHẬN / TỪ CHỐI INTERVIEW
  // ==========================================
  const handleUpdateStatus = (id: number, newStatus: "ACCEPTED" | "REJECTED") => {
    const actionText = newStatus === "ACCEPTED" ? "chấp nhận" : "từ chối";
    if (window.confirm(`Bạn có chắc chắn muốn ${actionText} lịch phỏng vấn này?`)) {
      setInterviews((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      // Tích hợp API gọi lên backend ở đây:
      // await interviewApi.updateStatus(id, newStatus);
    }
  };

  // Lọc danh sách theo Tab được chọn
  const filteredInterviews = interviews.filter((item) => {
    if (filterStatus === "ALL") return true;
    return item.status === filterStatus;
  });

  // Hàm render Badge Trạng thái
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <span className={`${styles.badge} ${styles.badgeAccepted}`}><FiCheckCircle /> Accepted</span>;
      case "REJECTED":
        return <span className={`${styles.badge} ${styles.badgeRejected}`}><FiXCircle /> Rejected</span>;
      default:
        return <span className={`${styles.badge} ${styles.badgePending}`}><FiAlertCircle /> Pending Decision</span>;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>My Interviews</h2>
      <p className={styles.subtitle}>Manage and track your upcoming job interviews.</p>

      {/* TABS LỌC TRẠNG THÁI */}
      <div className={styles.tabsContainer}>
        {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${filterStatus === tab ? styles.activeTab : ""}`}
            onClick={() => setFilterStatus(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DANH SÁCH INTERVIEW CARDS */}
      <div className={styles.interviewList}>
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview) => (
            <div key={interview.id} className={styles.interviewCard}>

              {/* Header của Card */}
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.jobTitle}>{interview.jobTitle}</h3>
                  <p className={styles.companyName}>{interview.companyName}</p>
                </div>
                {renderStatusBadge(interview.status)}
              </div>

              {/* Chi tiết nội dung lịch hẹn */}
              <div className={styles.cardBody}>
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <FiCalendar className={styles.icon} />
                    <span>Date: <strong>{new Date(interview.interviewDate).toLocaleDateString("vi-VN")}</strong></span>
                  </div>
                  <div className={styles.metaItem}>
                    <FiClock className={styles.icon} />
                    <span>Time: <strong>{interview.interviewTime}</strong></span>
                  </div>
                  <div className={styles.metaItem}>
                    {interview.type === "ONLINE" ? <FiVideo className={styles.iconOnline} /> : <FiMapPin className={styles.iconOffline} />}
                    <span>
                      Type: <strong className={interview.type === "ONLINE" ? styles.textOnline : styles.textOffline}>{interview.type}</strong>
                    </span>
                  </div>
                </div>

                <div className={styles.locationBlock}>
                  <span className={styles.locationLabel}>Location / Link:</span>
                  {interview.type === "ONLINE" && interview.status === "ACCEPTED" ? (
                    <a href={interview.locationOrLink} target="_blank" rel="noreferrer" className={styles.meetLink}>
                      Join Interview Room
                    </a>
                  ) : (
                    <span className={styles.locationText}>{interview.locationOrLink}</span>
                  )}
                </div>

                {interview.notes && (
                  <div className={styles.noteBox}>
                    <strong>Note from Recruiter:</strong> {interview.notes}
                  </div>
                )}
              </div>

              {/* Khu vực nút bấm Hành động (Chỉ hiện khi trạng thái là PENDING) */}
              {interview.status === "PENDING" && (
                <div className={styles.cardActions}>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleUpdateStatus(interview.id, "REJECTED")}
                  >
                    <FiXCircle /> Reject Invitation
                  </button>
                  <button
                    className={styles.acceptBtn}
                    onClick={() => handleUpdateStatus(interview.id, "ACCEPTED")}
                  >
                    <FiCheckCircle /> Accept Interview
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No interviews found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}