import React from "react";
import styles from "./CompanyFilter.module.css";

type CompanyFilterProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

export const CompanyFilter: React.FC<CompanyFilterProps> = ({
  keyword,
  setKeyword,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className={styles.filterBox}>
      <input
        type="text"
        placeholder="Tìm kiếm công ty theo tên, website..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={styles.input}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={styles.select}
      >
        <option value="">TẤT CẢ TRẠNG THÁI</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>
    </div>
  );
};