import React from "react";
import styles from "./StatusDropdown.module.css";

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  disabled?: boolean;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
  disabled,
}) => {
  const statuses = [
    { key: "PENDING", label: "Chờ duyệt" },
    { key: "REVIEWING", label: "Đang xem xét" },
    { key: "INTERVIEW", label: "Phỏng vấn" },
    { key: "ACCEPTED", label: "Trúng tuyển" },
    { key: "REJECTED", label: "Từ chối" },
  ];

  return (
    <select
      className={styles.select}
      value={currentStatus}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()} // Không kích hoạt sự kiện click dòng bản bản
      onChange={(e) => onStatusChange(e.target.value)}
    >
      {statuses.map((item) => (
        <option key={item.key} value={item.key}>
          {item.label}
        </option>
      ))}
    </select>
  );
};