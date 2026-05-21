import React, { useState } from "react";
import styles from "./homeEmployer.module.css";

import RecruitmentManagement from "../../../RecruitmentManagement/pages/RecruitmentManagement";
import CandidateManagement from "../../../CandidateManagement/pages/candidatesManagement";

const menus = [
  { key: "recruitment", label: "Recruitment Management" },
  { key: "candidate", label: "Candidate Management" },
  { key: "interview", label: "Interview Management" },
];

const HomeEmployer = () => {
  const [activeMenu, setActiveMenu] = useState("recruitment");

  const renderContent = () => {
    switch (activeMenu) {
      case "recruitment":
        return <RecruitmentManagement />;
      case "candidate":
        return <CandidateManagement />;
      case "interview":
        return <div>Interview Management Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>EMPLOYER</div>

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

      {/* Main content */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default HomeEmployer;