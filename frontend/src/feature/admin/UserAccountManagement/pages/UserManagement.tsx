import React, { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./UserManagement.module.css";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";
import UserDetailModal from "../components/UserDetailModal";

import * as userApi from "../../../../service/userApi";
import { useToast } from "../../../../components/Toast";

type UserRow = {
  id: number;
  email: string;
  role?: string;
  status?: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
};

const UserManagement: React.FC = () => {
  const toast = useToast();

  const [usersList, setUsersList] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState("");

  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [usersRes, profilesRes] = await Promise.all([
        userApi.getAllUsers(),
        userApi.getAllCandidateProfiles(),
      ]);

      const users = usersRes?.data || usersRes;
      const profiles = profilesRes?.data || profilesRes;

      const profileMap = new Map(
        profiles.map((p: any) => [Number(p.id), p])
      );

      const merged = users.map((u: any) => {
        const profile = profileMap.get(Number(u.id));

        return {
          id: u.id,
          email: u.email,
          role: u.role,
          status: (u.status || "ACTIVE").toUpperCase(),

          firstName: u.firstName || "",
          lastName: u.lastName || "",

          phone: profile?.phone || "",
        };
      });

      console.log("MERGED USERS:", merged);
      setUsersList(merged);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  // ================= FILTER =================
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return usersList.filter((u) => {
      const matchSearch =
        u.email.toLowerCase().includes(q) ||
        (u.firstName || "").toLowerCase().includes(q) ||
        (u.lastName || "").toLowerCase().includes(q);

      const matchRole =
        roleFilter === "all" ||
        (u.role || "").toUpperCase() === roleFilter;

      const matchStatus =
        statusFilter === "all" ||
        (u.status || "").toUpperCase() === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [usersList, search, roleFilter, statusFilter]);

  // ================= VIEW =================
  const handleViewUser = async (user: any) => {
    try {
      setLoadingUser(true);
      setOpenModal(true);

      // Hiển thị thông tin cơ bản ngay lập tức
      setSelectedUser(user);

      try {
        // Cố gắng tải thêm thông tin chi tiết (Candidate Profile)
        const res = await userApi.getCandidateProfileByUserId(user.id);
        const detail = res?.data || res;

        setSelectedUser({
          ...user,
          ...(detail || {}),
        });
      } catch (profileErr) {
        // Nếu user không có profile (Admin/Recruiter) thì bỏ qua
        console.log("No detailed profile found for this user");
      }
    } catch (err) {
      console.error("View User Error:", err);
      toast.error("Failed to load user detail");
    } finally {
      setLoadingUser(false);
    }
  };

  // ================= ROLE =================
  const handleStartEditRole = (user: UserRow) => {
    setEditingId(user.id);
    setEditRole(user.role || "");
  };

  const handleSaveRole = async (id: number) => {
    try {
      await userApi.updateUser(id, { role: editRole });

      setUsersList((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, role: editRole } : u
        )
      );

      setEditingId(null);
      toast.success("Role updated");
    } catch {
      toast.error("Update failed");
    }
  };

  // ================= STATUS =================
  const onToggleStatus = async (id: number) => {
    try {
      const user = usersList.find((u) => u.id === id);
      if (!user) return;

      const newStatus =
        user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

      // Gọi API thực tế
      await userApi.updateUserStatus(id, newStatus);

      setUsersList((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        )
      );

      toast.success("Status updated successfully");
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Failed update status";
      console.error("Toggle Status Error:", err);
      toast.error(errorMsg);
    }
  };

  // ================= DELETE =================
  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await userApi.deleteUser(id);
      setUsersList((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err: any) {
      console.error("Delete User Error:", err);
      toast.error("Failed to delete user");
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async (id: number) => {
    if (!window.confirm("Are you sure you want to reset this user's password to '123456'?")) return;
    try {
      await userApi.updateUser(id, { password: "123456" });
      toast.success("Password has been reset to 123456");
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className={styles.page}>
      <UserFilters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <UserTable
        filteredUsers={filtered}
        totalCount={usersList.length}
        editingId={editingId}
        editRole={editRole}
        setEditRole={setEditRole}
        onStartEditRole={handleStartEditRole}
        onSaveRole={handleSaveRole}
        onToggleStatus={onToggleStatus}
        onResetPassword={handleResetPassword}
        onDeleteUser={handleDeleteUser}
        onViewUser={handleViewUser}
      />

      <UserDetailModal
        open={openModal}
        user={selectedUser}
        loading={loadingUser}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default UserManagement;