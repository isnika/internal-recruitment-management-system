import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./homeAdmin.module.css";
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiCompass,
  FiLayers,
  FiShield,
  FiPieChart,
  FiSettings,
} from "react-icons/fi";
import { ToastProvider } from "../../../../../components/Toast";

const menus = [
  { path: "dashboard", label: "Dashboard", icon: <FiGrid /> },
  { path: "users", label: "User Management", icon: <FiUsers /> },
  { path: "job-approval", label: "Job Approval", icon: <FiBriefcase /> },
  { path: "companies", label: "Company Management", icon: <FiCompass /> },
  { path: "applications", label: "Application Monitoring", icon: <FiLayers /> },
  { path: "roles", label: "Role & Permission", icon: <FiShield /> },
  { path: "reports", label: "Statistics & Reports", icon: <FiPieChart /> },
  { path: "settings", label: "System Settings", icon: <FiSettings /> },
];

const HomeAdminContent = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <FiShield className={styles.logoIcon} />
          <span>ADMIN HUB</span>
        </div>

        <nav className={styles.menu}>
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

const HomeAdmin = () => {
  return (
    <ToastProvider>
      <HomeAdminContent />
    </ToastProvider>
  );
};

export default HomeAdmin;