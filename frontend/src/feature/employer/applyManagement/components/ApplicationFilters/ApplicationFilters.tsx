import React from "react";
import styles from "./ApplicationFilters.module.css";

interface ApplicationFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, email, vị trí..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select
        className={styles.filterSelect}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="PENDING">Chờ duyệt</option>
        <option value="REVIEWING">Đang xem xét</option>
        <option value="INTERVIEW">Phỏng vấn</option>
        <option value="ACCEPTED">Trúng tuyển</option>
        <option value="REJECTED">Từ chối</option>
      </select>
    </div>
  );
};