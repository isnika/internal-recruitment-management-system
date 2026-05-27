import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { User } from "../../../../types/user";
import styles from "./UserManagement.module.css";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";

import * as userApi from "../../../../service/userApi";
import { useToast } from "../../../../components/Toast";

const UserManagement: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response: any = await userApi.getAllUsers();
      const data = response?.data || response;
      setUsersList(Array.isArray(data) ? data.map(u => ({...u, status: u.status || "Active"})) : []);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  const onToggleStatus = useCallback(async (id: number) => {
    try {
      const userToUpdate = usersList.find(u => u.id === id);
      if (!userToUpdate) return;
      const newStatus = userToUpdate.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await userApi.updateUser(id, { status: newStatus });
      setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
      toast.success("Toggled status successfully");
    } catch (error) {
      toast.error("Failed to toggle status");
    }
  }, [usersList, toast]);

  const onResetPassword = useCallback(async (id: number) => {
    if (window.confirm("Are you sure you want to reset the password to '123456'?")) {
      try {
        await userApi.updateUser(id, { password: "123456" });
        toast.success("Password reset successfully");
      } catch (error) {
        toast.error("Failed to reset password");
      }
    }
  }, [toast]);

  const onDeleteUser = useCallback(async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userApi.deleteUser(id);
        setUsersList(prev => prev.filter(u => u.id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  }, [toast]);

  const onSaveRole = useCallback(async (id: number, newRole: string) => {
    try {
      await userApi.updateUser(id, { role: newRole });
      setUsersList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  }, [toast]);

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
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
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
