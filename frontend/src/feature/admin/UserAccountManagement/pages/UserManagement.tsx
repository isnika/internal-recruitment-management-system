import React, { useState, useMemo, useCallback } from "react";
import type { User } from "../../../../types/user";
import styles from "./UserManagement.module.css";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";

import { users as initialUsers } from "../../../../dataMock/User";

const UserManagement: React.FC = () => {
  const [usersList, setUsersList] = useState(initialUsers);

  // Mock functions for the props that were removed
  const onToggleStatus = useCallback((id: number) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  }, []);

  const onResetPassword = useCallback((id: number) => {
    alert("Password reset simulated.");
  }, []);

  const onDeleteUser = useCallback((id: number) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
  }, []);

  const onSaveRole = useCallback((id: number, newRole: string) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  }, []);

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
