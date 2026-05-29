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

      const res = await userApi.getCandidateProfileByUserId(user.id);

      const detail = res?.data || res;

      setSelectedUser({
        ...user,
        ...(detail || {}),
      });
    } catch (err) {
      console.error(err);
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
        user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      await userApi.updateUser(id, { status: newStatus });

      setUsersList((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Failed update status");
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
        onResetPassword={() => toast.success("Mock reset")}
        onDeleteUser={() => toast.error("Not implemented")}
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