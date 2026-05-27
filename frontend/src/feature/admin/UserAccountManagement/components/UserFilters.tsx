import React from "react";
import { FiSliders } from "react-icons/fi";
import styles from "../pages/UserManagement.module.css";

interface UserFiltersProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onSearch: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchInput,
  setSearchInput,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={styles.filtersCard}>
      {/* Row 1: Filter label & Search */}
      <div className={styles.filterRow}>
        <div className={styles.filterLeft}>
          <FiSliders size={18} />
          <span>Filter</span>
        </div>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn} onClick={onSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Row 2: Select dropdowns */}
      <div className={styles.actionRow}>
        <div className={styles.dropdowns}>
          <select
            className={styles.select}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="RECRUITER">Employer</option>
            <option value="CANDIDATE">Candidate</option>
          </select>

          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
