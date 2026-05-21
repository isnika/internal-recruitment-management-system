import React, { useState } from "react";
import styles from "./RolePermission.module.css";
import type { RolePermissions } from "../../../../dataMock/adminMock";
import RolePermissionCard from "../components/RolePermissionCard";

interface RolePermissionProps {
  permissions: RolePermissions[];
  onUpdate: (role: string, updatedPerms: RolePermissions["permissions"]) => void;
}

const PERMISSION_LABELS: Record<keyof RolePermissions["permissions"], string> = {
  viewDashboard: "View Dashboard",
  manageUsers: "Manage Users",
  approveJobs: "Approve Jobs",
  manageCompanies: "Manage Companies",
  viewReports: "View Reports & Statistics",
  editSettings: "Edit System Settings",
};

const ROLE_COLOR: Record<string, string> = {
  Admin: styles.tagAdmin,
  Employer: styles.tagEmployer,
  HR: styles.tagHr,
  Candidate: styles.tagCandidate,
};

const RolePermission: React.FC<RolePermissionProps> = ({ permissions, onUpdate }) => {
  const [localPerms, setLocalPerms] = useState<RolePermissions[]>(() =>
    permissions.map((p) => ({ ...p, permissions: { ...p.permissions } }))
  );
  const [savedRole, setSavedRole] = useState<string | null>(null);

  const handleToggle = (roleIndex: number, permKey: keyof RolePermissions["permissions"]) => {
    setLocalPerms((prev) =>
      prev.map((p, i) =>
        i === roleIndex
          ? { ...p, permissions: { ...p.permissions, [permKey]: !p.permissions[permKey] } }
          : p
      )
    );
    setSavedRole(null);
  };

  const handleSave = (roleIndex: number) => {
    const target = localPerms[roleIndex];
    onUpdate(target.role, target.permissions);
    setSavedRole(target.role);
    setTimeout(() => setSavedRole(null), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Role & Permission</h1>
        <p className={styles.subtitle}>
          Configure granular role-based access control (RBAC) for every user role in the system.
        </p>
      </div>

      <div className={styles.grid}>
        {localPerms.map((roleData, roleIndex) => (
          <RolePermissionCard
            key={roleData.role}
            roleData={roleData}
            roleIndex={roleIndex}
            PERMISSION_LABELS={PERMISSION_LABELS}
            ROLE_COLOR={ROLE_COLOR}
            savedRole={savedRole}
            onToggle={handleToggle}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
};

export default RolePermission;
