import React, { useState } from "react";
import styles from "./homeAdmin.module.css";
import UserManagement from "../../../UserAccountManagement/pages/UserManagement";
import StatisticalReport from "../../../StatisticalReport/pages/StatisticalReport";

const tabs = [
  "User Management",
  "Statistical Reports"
];

const HomeAdmin = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Tabs */}
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <div className={styles.mainCard}>
          {activeTab === "User Management" && <UserManagement />}
          {activeTab === "Statistical Reports" && <StatisticalReport />}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
