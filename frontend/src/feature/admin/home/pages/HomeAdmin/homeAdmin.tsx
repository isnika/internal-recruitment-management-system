import React, { useState } from "react";
import styles from "./homeAdmin.module.css";

import UserManagement from "../../../UserAccountManagement/pages/UserManagement";
import StatisticalReport from "../../../StatisticalReport/pages/StatisticalReport";
import CandidateManagement from "../../../CandidateManagement/pages/candidatesManagement";

const menus = [
  { key: "users", label: "Company Account Management" },
  { key: "candidate", label: "Candidate Management" },
  { key: "reports", label: "Statistical Reports" },
];

const HomeAdmin = () => {
  const [activeMenu, setActiveMenu] = useState("users");

  const renderContent = () => {
    switch (activeMenu) {
      case "users":
        return <UserManagement />;
      case "candidate":
        return <CandidateManagement />;
      case "reports":
        return <StatisticalReport />;
      default:
        return <div>Select menu</div>;
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ADMIN</div>

        <nav className={styles.menu}>
          {menus.map((item) => (
            <button
              key={item.key}
              className={`${styles.menuItem} ${
                activeMenu === item.key ? styles.active : ""
              }`}
              onClick={() => setActiveMenu(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
};

export default HomeAdmin;