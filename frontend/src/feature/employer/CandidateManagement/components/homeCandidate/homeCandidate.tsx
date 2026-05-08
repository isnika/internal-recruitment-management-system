import styles from "./homeCandidate.module.css";
import { useState } from "react";

import CandidateTable from "../CandidateAccountTable/candidateTable";
import UserTable from "../UserAccountTable/userTable";

import CandidateFilterBar from "../CandidateFilterBar/CandidateFilterBar";

import { users } from "../../../../../dataMock/User";

const HomeCandidate = () => {
  const [showUserTable, setShowUserTable] =
    useState(false);

  const [showCandidateTable, setShowCandidateTable] =
    useState(false);

  // statistics
  const totalUsers = users.length;

  const totalCandidates = users.filter(
    (user) => user.role === "candidate"
  ).length;

  // mở User -> tắt Candidate
  const handleShowUser = () => {
    setShowUserTable(!showUserTable);
    setShowCandidateTable(false);
  };

  // mở Candidate -> tắt User
  const handleShowCandidate = () => {
    setShowCandidateTable(!showCandidateTable);
    setShowUserTable(false);
  };

  return (
    <>
      {/* Statistic Cards */}
      <div className={styles.cardWrapper}>

        {/* USER ACCOUNT */}
        <div className={styles.card}>
          <h3>User Account</h3>

          <h1>{totalUsers}</h1>

          <button
            className={styles.detailBtn}
            onClick={handleShowUser}
          >
            View Details
          </button>
        </div>

        {/* CANDIDATE ACCOUNT */}
        <div className={styles.card}>
          <h3>Candidate Account</h3>

          <h1>{totalCandidates}</h1>

          <button
            className={styles.detailBtn}
            onClick={handleShowCandidate}
          >
            View Details
          </button>
        </div>
      </div>

      {/* USER TABLE */}
      {showUserTable && (
        <div className={styles.tableSection}>
          <CandidateFilterBar />

          <UserTable />
        </div>
      )}

      {/* CANDIDATE TABLE */}
      {showCandidateTable && (
        <div className={styles.tableSection}>
          <CandidateFilterBar />

          <CandidateTable />
        </div>
      )}
    </>
  );
};

export default HomeCandidate;