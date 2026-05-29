import React from "react";
import { FiSliders } from "react-icons/fi";
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
      <div className={styles.filterRow}>
        <div className={styles.filterLeft}>
          <FiSliders size={18} />
          <span>Filter</span>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actionRow}>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="RECRUITER">Employer</option>
          <option value="CANDIDATE">Candidate</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;