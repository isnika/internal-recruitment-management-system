import styles from "./homeCandidate.module.css";
import { useMemo, useState } from "react";

import CandidateTable from "../CandidateAccountTable/candidateTable";
import UserAccountTable from "../UserAccountTable/userAccountTable";

import CandidateFilterBar from "../CandidateFilterBar/CandidateFilterBar";

import { users } from "../../../../../dataMock/User";

const HomeCandidate = () => {
  // active table
  const [activeTable, setActiveTable] = useState<
    "user" | "candidate" | null
  >(null);

  // statistics
  const totalUsers = useMemo(() => {
    return users.length;
  }, []);

  const totalCandidates = useMemo(() => {
    return users.filter(
      (user) => user.role === "candidate"
    ).length;
  }, []);

  // handlers
  const handleShowUser = () => {
    setActiveTable((prev) =>
      prev === "user" ? null : "user"
    );
  };

  const handleShowCandidate = () => {
    setActiveTable((prev) =>
      prev === "candidate"
        ? null
        : "candidate"
    );
  };

  return (
    <div className={styles.container}>
      {/* ================= STATISTIC CARDS ================= */}
      <div className={styles.cardWrapper}>
        {/* USER ACCOUNT */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <h3>User Account</h3>

            <span className={styles.badge}>
              Users
            </span>
          </div>

          <h1>{totalUsers}</h1>

          <button
            className={styles.detailBtn}
            onClick={handleShowUser}
          >
            {activeTable === "user"
              ? "Hide Details"
              : "View Details"}
          </button>
        </div>

        {/* CANDIDATE ACCOUNT */}
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <h3>Candidate Account</h3>

            <span className={styles.badge}>
              Candidates
            </span>
          </div>

          <h1>{totalCandidates}</h1>

          <button
            className={styles.detailBtn}
            onClick={handleShowCandidate}
          >
            {activeTable === "candidate"
              ? "Hide Details"
              : "View Details"}
          </button>
        </div>
      </div>

      {/* ================= TABLE SECTION ================= */}
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

          {/* USER TABLE */}
          {activeTable === "user" && (
            <UserAccountTable />
          )}

          {/* CANDIDATE TABLE */}
          {activeTable === "candidate" && (
            <CandidateTable />
          )}
        </div>
      )}
    </div>
  );
};

export default HomeCandidate;