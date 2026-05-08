import React, { useState } from "react";
import styles from "./homeEmployer.module.css";
import RecruitmentManagement from "../../../RecruitmentManagement/pages/RecruitmentManagement";
import CandidateManagement from "../../../CandidateManagement/pages/candidatesManagement"



const tabs = [
  "Recruitment Information Management",
  "Candidate Management",
  "Interview Management"
];

const HomeEmployer = () => {
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
          {activeTab === "Recruitment Information Management" && (
            <RecruitmentManagement />
          )}

          {activeTab === "Candidate Management" && (
            <CandidateManagement/>
          )}

          {activeTab === "Interview Management" && (
            <div>Interview Management Content</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeEmployer;