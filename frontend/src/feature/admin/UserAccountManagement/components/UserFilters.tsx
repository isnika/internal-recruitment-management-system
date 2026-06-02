import React from "react";
import { FiSliders, FiSearch } from "react-icons/fi";
import styles from "../pages/UserManagement.module.css";

interface Props {
  search: string;
  setSearch: (val: string) => void;

  roleFilter: string;
  setRoleFilter: (val: string) => void;

  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

const UserFilters: React.FC<Props> = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className={styles.filtersCard}>
      <div className={styles.filterHeader}>
        <div className={styles.filterLeft}>
          <FiSliders size={18} className={styles.filterIcon} />
          <span>Filter Users</span>
        </div>
      </div>

      <div className={styles.filterControls}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.dropdownsWrapper}>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="RECRUITER">Employer</option>
            <option value="CANDIDATE">Candidate</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Blocked</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;