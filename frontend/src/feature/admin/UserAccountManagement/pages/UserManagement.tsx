import { useState } from "react";
import { users as mockUsers } from "../../../../dataMock/User";
import type { User } from "../../../../types/user";
import styles from "./UserManagement.module.css";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";

const UserManagement = () => {
  const [userList, setUserList] = useState<User[]>(() =>
    mockUsers.filter((u) => u.role === "admin" || u.role === "company")
  );
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState<string>("");

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const filtered = userList.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus =
      statusFilter === "all" || (u.status || "Active") === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const handleToggleStatus = (id: number) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  const handleStartEditRole = (user: User) => {
    setEditingId(user.id);
    setEditRole(user.role);
  };

  const handleSaveRole = (id: number) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: editRole } : u))
    );
    setEditingId(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>User Account Management</h1>
        <p className={styles.pageSub}>
          Manage {userList.length} accounts · Roles · Lock/Unlock
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
        totalCount={userList.length}
        editingId={editingId}
        editRole={editRole}
        setEditRole={setEditRole}
        onStartEditRole={handleStartEditRole}
        onSaveRole={handleSaveRole}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default UserManagement;
