import React from "react";
import type { User } from "../../../../types/user";
import { FiShield, FiLock, FiUnlock } from "react-icons/fi";
import styles from "../pages/UserManagement.module.css";

interface UserTableProps {
  filteredUsers: User[];
  totalCount: number;
  editingId: number | null;
  editRole: string;
  setEditRole: (val: string) => void;
  onStartEditRole: (user: User) => void;
  onSaveRole: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  filteredUsers,
  totalCount,
  editingId,
  editRole,
  setEditRole,
  onStartEditRole,
  onSaveRole,
  onToggleStatus,
}) => {
  const getRoleBadge = (role: string) => {
    const map: Record<string, string> = {
      admin: styles.roleAdmin,
      candidate: styles.roleCandidate,
      company: styles.roleCompany,
    };
    return map[role] || styles.roleCandidate;
  };

  const getRoleLabel = (role: string) => {
    const map: Record<string, string> = {
      admin: "Admin",
      candidate: "Candidate",
      company: "Employer",
    };
    return map[role] || role;
  };

  return (
    <>
      <div className={styles.resultBanner}>
        <span className={styles.resultCount}>
          Showing {filteredUsers.length} of {totalCount} accounts
        </span>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "40px", paddingLeft: "24px" }}>
                  <input type="checkbox" className={styles.checkbox} />
                </th>
                <th style={{ width: "60px" }}>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ paddingLeft: "24px" }}>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td className={styles.cellId}>{index + 1}</td>
                  <td>
                    <div className={styles.userCell}>
                      <span className={styles.userName}>{user.fullName}</span>
                    </div>
                  </td>
                  <td className={styles.cellEmail}>{user.email}</td>
                  <td>{user.phone || "—"}</td>
                  <td>
                    {editingId === user.id ? (
                      <div className={styles.roleEdit}>
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className={styles.roleSelect}
                        >
                          <option value="company">Employer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          className={styles.btnSave}
                          onClick={() => onSaveRole(user.id)}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span className={`${styles.roleBadge} ${getRoleBadge(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        (user.status || "Active") === "Active"
                          ? styles.statusActive
                          : styles.statusInactive
                      }`}
                    >
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        title="Change Role"
                        onClick={() => onStartEditRole(user)}
                      >
                        <FiShield />
                      </button>
                      <button
                        className={styles.actionBtn}
                        title={
                          (user.status || "Active") === "Active"
                            ? "Lock Account"
                            : "Unlock Account"
                        }
                        onClick={() => onToggleStatus(user.id)}
                      >
                        {(user.status || "Active") === "Active" ? (
                          <FiLock />
                        ) : (
                          <FiUnlock />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    No accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;
