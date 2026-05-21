import React, { useState, useMemo, useCallback } from "react";
import type { User } from "../../../../types/user";
import styles from "./UserManagement.module.css";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";

interface UserManagementProps {
  usersList: User[];
  onToggleStatus: (id: number) => void;
  onResetPassword: (id: number) => void;
  onDeleteUser: (id: number) => void;
  onSaveRole: (id: number, newRole: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  usersList,
  onToggleStatus,
  onResetPassword,
  onDeleteUser,
  onSaveRole,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState<string>("");

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
  }, [searchInput]);

  const filtered = useMemo(() => {
    return usersList.filter((u) => {
      const matchSearch =
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      const matchStatus =
        statusFilter === "all" || (u.status || "Active") === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [usersList, search, roleFilter, statusFilter]);

  const handleStartEditRole = useCallback((user: User) => {
    setEditingId(user.id);
    setEditRole(user.role);
  }, []);

  const handleSaveRole = useCallback((id: number) => {
    onSaveRole(id, editRole);
    setEditingId(null);
  }, [editRole, onSaveRole]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Account Management</h1>
        <p className={styles.pageSub}>
          Manage {usersList.length} accounts · Roles · Lock/Unlock
        </p>
      </div>

      {/* FILTERS */}
      <UserFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onSearch={handleSearch}
      />

      {/* TABLE */}
      <UserTable
        filteredUsers={filtered}
        totalCount={usersList.length}
        editingId={editingId}
        editRole={editRole}
        setEditRole={setEditRole}
        onStartEditRole={handleStartEditRole}
        onSaveRole={handleSaveRole}
        onToggleStatus={onToggleStatus}
        onResetPassword={onResetPassword}
        onDeleteUser={onDeleteUser}
      />
    </div>
  );
};

export default UserManagement;
