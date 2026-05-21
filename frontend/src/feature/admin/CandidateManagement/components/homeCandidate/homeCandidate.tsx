import styles from "./homeCandidate.module.css";
import { useState } from "react";

import CandidateTable from "../CandidateAccountTable/candidateTable";
import UserAccountTable from "../UserAccountTable/userAccountTable";
import CandidateFilterBar from "../CandidateFilterBar/CandidateFilterBar";

import { users } from "../../../../../dataMock/User";

type ActiveTable = "user" | "candidate" | null;

const HomeCandidate = () => {
  const [activeTable, setActiveTable] = useState<ActiveTable>(null);

  const totalUsers = users.length;
  const totalCandidates = users.filter(
    (u) => u.role === "candidate"
  ).length;

  const toggleTable = (type: Exclude<ActiveTable, null>) => {
    setActiveTable((prev) => (prev === type ? null : type));
  };

  return (
    <div className={styles.container}>
      {/* ================= CARDS ================= */}
      <div className={styles.cardWrapper}>
        {/* USER */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <h3>User Account</h3>
            <span className={styles.badge}>Users</span>
          </div>

          <h1>{totalUsers}</h1>

          <button
            className={styles.detailBtn}
            onClick={() => toggleTable("user")}
          >
            {activeTable === "user" ? "Hide Details" : "View Details"}
          </button>
        </div>

        {/* CANDIDATE */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <h3>Candidate Account</h3>
            <span className={styles.badge}>Candidates</span>
          </div>

          <h1>{totalCandidates}</h1>

          <button
            className={styles.detailBtn}
            onClick={() => toggleTable("candidate")}
          >
            {activeTable === "candidate"
              ? "Hide Details"
              : "View Details"}
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      {activeTable && (
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2>
              {activeTable === "user"
                ? "User Account List"
                : "Candidate Account List"}
            </h2>
          </div>

          <CandidateFilterBar />

          {activeTable === "user" ? (
            <UserAccountTable />
          ) : (
            <CandidateTable />
          )}
        </div>
      )}
    </div>
  );
};

export default HomeCandidate;