import React, { useState } from "react";
import styles from "./homeAdmin.module.css";

import UserManagement from "../../../UserAccountManagement/pages/UserManagement";
import StatisticalReport from "../../../StatisticalReport/pages/StatisticalReport";

const menus = [
  { key: "users", label: "User Management" },
  { key: "reports", label: "Statistical Reports" },
];

const HomeAdmin = () => {
  const [activeMenu, setActiveMenu] = useState("users");

  const renderContent = () => {
    switch (activeMenu) {
      case "users":
        return <UserManagement />;
      case "reports":
        return <StatisticalReport />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
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
      </div>

      {/* Content */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default HomeAdmin;