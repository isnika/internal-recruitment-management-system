import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./homeEmployer.module.css";


const menus = [
  { label: "Dashboard", path: "dashboardManagement" },
  { label: "Job Management", path: "recruitmentManagement" },
  { label: "Applications / Candidates", path: "applyManagement" },
  { label: "Interview Management", path: "interviewManagement" },
  { label: "Company Management", path: "companyManagementEmployer"},
  { label: "Skill Management", path: "skillManagement"},
  { label: "Department Management", path: "departmentManagement"},
  { label: "Experience Level Management", path: "experienceLevelManagement"},
  { label: "Settings", path: "settingManagement" },
];

const HomeEmployer = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>EMPLOYER</div>

        <nav className={styles.menu}>
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* CONTENT RENDER ROUTE */}
      <main className={styles.content}>
        {/*  KEY POINT */}
        <Outlet />
      </main>
    </div>
  );
};

export default HomeEmployer;