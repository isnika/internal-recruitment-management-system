import React from "react";
import { FiEye, FiShield, FiLock, FiUnlock, FiKey, FiTrash2 } from "react-icons/fi";
import styles from "../pages/UserManagement.module.css";

export type UserRow = {
  id: number;
  email: string;
  role?: string;
  status?: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
};

interface UserTableProps {
  filteredUsers: UserRow[];
  totalCount: number;

  companies: any[];

  editingId: number | null;
  editRole: string;
  setEditRole: (val: string) => void;
  editCompanyId: number | null;
  setEditCompanyId: (val: number | null) => void;

  onStartEditRole: (user: UserRow) => void;
  onSaveRole: (id: number) => void;

  onToggleStatus: (id: number) => void;
  onResetPassword: (id: number) => void;
  onDeleteUser: (id: number) => void;
  onViewUser: (user: UserRow) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  filteredUsers,
  totalCount,
  companies,
  editingId,
  editRole,
  setEditRole,
  editCompanyId,
  setEditCompanyId,
  onStartEditRole,
  onSaveRole,
  onToggleStatus,
  onResetPassword,
  onDeleteUser,
  onViewUser,
}) => {

  // ================= STATUS =================
  const isActive = (status?: string) =>
    (status || "").toUpperCase() === "ACTIVE";

  // ================= ROLE LABEL =================
  const getRoleLabel = (role?: string) => {
    switch ((role || "").toUpperCase()) {
      case "ADMIN":
        return "Admin";
      case "RECRUITER":
        return "Employer";
      default:
        return "Candidate";
    }
  };

  // ================= ROLE STYLE =================
  const getRoleClass = (role?: string) => {
    switch ((role || "").toUpperCase()) {
      case "ADMIN":
        return styles.roleAdmin;
      case "RECRUITER":
        return styles.roleCompany;
      default:
        return styles.roleCandidate;
    }
  };


  return (
    <>
      {/* ================= HEADER ================= */}
      <div className={styles.resultBanner}>
        <span className={styles.resultCount}>
          Showing {filteredUsers.length} of {totalCount} accounts
        </span>
      </div>

      {/* ================= TABLE ================= */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  {/* INDEX */}
                  <td>{index + 1}</td>

                  {/* NAME */}
                  <td>
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "—"}
                  </td>

                  {/* EMAIL */}
                  <td>{user.email}</td>

                  {/* PHONE */}
                  <td>{user.phone || "—"}</td>

                  {/* ROLE */}
                  <td>
                    {editingId === user.id ? (
                      <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                          >
                            <option value="CANDIDATE">Candidate</option>
                            <option value="RECRUITER">Employer</option>
                            <option value="ADMIN">Admin</option>
                          </select>

                          <button onClick={() => onSaveRole(user.id)}>
                            Save
                          </button>
                        </div>
                        
                        {editRole === "RECRUITER" && (
                          <select
                            value={editCompanyId || ""}
                            onChange={(e) => setEditCompanyId(Number(e.target.value))}
                          >
                            <option value="" disabled>Chọn công ty...</option>
                            {companies.map((c: any) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    ) : (
                      <span className={getRoleClass(user.role)}>
                        {getRoleLabel(user.role)}
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={
                        isActive(user.status)
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    >
                      {(user.status || "ACTIVE").toUpperCase()}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => onViewUser(user)} title="View">
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onStartEditRole(user)}
                      title="Edit Role"
                    >
                      <FiShield />
                    </button>

                    <button
                      onClick={() => onToggleStatus(user.id)}
                      title="Toggle Status"
                    >
                      {isActive(user.status) ? <FiUnlock /> : <FiLock />}
                    </button>

                    <button
                      onClick={() => onResetPassword(user.id)}
                      title="Reset Password"
                    >
                      <FiKey />
                    </button>

                    <button
                      onClick={() => onDeleteUser(user.id)}
                      title="Delete"
                      style={{ color: "red" }}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}

              {/* EMPTY STATE */}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
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