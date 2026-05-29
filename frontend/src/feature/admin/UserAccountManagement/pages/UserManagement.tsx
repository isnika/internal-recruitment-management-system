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
      const currentStatus = (userToUpdate.status || "ACTIVE").toUpperCase();
      const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      const actionText = newStatus === "BLOCKED" ? "block" : "unblock";
      
      if (!window.confirm(`Are you sure you want to ${actionText} this account?`)) {
        return;
      }

      await userApi.updateUserStatus(id, newStatus as any);
      setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
      toast.success("Toggled status successfully");
    } catch (error: any) {
      console.error("Toggle status error:", error.response?.data || error.message || error);
      toast.error(`Failed to toggle status: ${error.response?.data?.message || error.message || 'Unknown'}`);
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

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Hoặc 10 tùy ý

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

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

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filtered.slice(startIndex, startIndex + pageSize);
  }, [filtered, currentPage, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);

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
        filteredUsers={paginatedUsers}
        totalCount={filtered.length}
        onToggleStatus={onToggleStatus}
        onResetPassword={onResetPassword}
        onDeleteUser={onDeleteUser}
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className={styles.pageBtn}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
