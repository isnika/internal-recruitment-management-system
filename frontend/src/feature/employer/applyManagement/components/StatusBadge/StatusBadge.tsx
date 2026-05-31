import React from "react";
import styles from "./StatusBadge.module.css";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusLabelAndClass = (statusKey: string) => {
    switch (statusKey.toUpperCase()) {
      case "PENDING":
        return { label: "Chờ duyệt", className: styles.pending };
      case "REVIEWING":
        return { label: "Đang xem xét", className: styles.reviewing };
      case "INTERVIEW":
        return { label: "Phỏng vấn", className: styles.interview };
      case "ACCEPTED":
        return { label: "Trúng tuyển", className: styles.accepted };
      case "REJECTED":
        return { label: "Từ chối", className: styles.rejected };
      default:
        return { label: statusKey, className: styles.default };
    }
  };

  const { label, className } = getStatusLabelAndClass(status);

  return <span className={`${styles.badge} ${className}`}>{label}</span>;
};