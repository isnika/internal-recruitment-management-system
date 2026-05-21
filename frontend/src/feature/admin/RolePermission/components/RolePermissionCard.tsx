import React from "react";
import { FiShield, FiSave } from "react-icons/fi";
import styles from "../pages/RolePermission.module.css";
import type { RolePermissions } from "../../../../dataMock/adminMock";

interface RolePermissionCardProps {
  roleData: RolePermissions;
  roleIndex: number;
  PERMISSION_LABELS: Record<keyof RolePermissions["permissions"], string>;
  ROLE_COLOR: Record<string, string>;
  savedRole: string | null;
  onToggle: (roleIndex: number, permKey: keyof RolePermissions["permissions"]) => void;
  onSave: (roleIndex: number) => void;
}

const RolePermissionCard: React.FC<RolePermissionCardProps> = ({
  roleData,
  roleIndex,
  PERMISSION_LABELS,
  ROLE_COLOR,
  savedRole,
  onToggle,
  onSave,
}) => {
  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.roleInfo}>
          <FiShield className={styles.roleIcon} />
          <div>
            <h3 className={styles.roleName}>{roleData.role}</h3>
            <span className={`${styles.roleTag} ${ROLE_COLOR[roleData.role] || styles.tagCandidate}`}>
              {Object.values(roleData.permissions).filter(Boolean).length} /{" "}
              {Object.keys(roleData.permissions).length} permissions
            </span>
          </div>
        </div>
        <button
          className={`${styles.saveBtn} ${savedRole === roleData.role ? styles.saveBtnSuccess : ""}`}
          onClick={() => onSave(roleIndex)}
        >
          <FiSave />
          {savedRole === roleData.role ? "Saved!" : "Save"}
        </button>
      </div>

      {/* Permission Rows */}
      <div className={styles.permissionList}>
        {(Object.keys(roleData.permissions) as Array<keyof RolePermissions["permissions"]>).map(
          (permKey) => (
            <div key={permKey} className={styles.permissionRow}>
              <div className={styles.permLabel}>
                <span className={styles.permName}>{PERMISSION_LABELS[permKey]}</span>
                <span className={styles.permKey}>{permKey}</span>
              </div>
              <button
                className={`${styles.toggle} ${
                  roleData.permissions[permKey] ? styles.toggleOn : styles.toggleOff
                }`}
                onClick={() => onToggle(roleIndex, permKey)}
                role="switch"
                aria-checked={roleData.permissions[permKey]}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RolePermissionCard;
