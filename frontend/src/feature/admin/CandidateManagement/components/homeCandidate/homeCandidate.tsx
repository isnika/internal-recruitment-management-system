import styles from "./homeCandidate.module.css";
import { useEffect, useState } from "react";

import CandidateTable from "../CandidateAccountTable/candidateTable";
import UserAccountTable from "../UserAccountTable/userAccountTable";

import CandidateFilterBar from "../CandidateFilterBar/CandidateFilterBar";

import * as userApi from "../../../../../service/userApi";
import { getAllProfiles } from "../../../../../service/candidateApi";

const HomeCandidate = () => {
  // active table
  const [activeTable, setActiveTable] = useState<
    "user" | "candidate" | null
  >(null);

  // statistics
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalCandidates, setTotalCandidates] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, candidatesRes] = await Promise.all([
          userApi.getAllUsers(),
          getAllProfiles()
        ]);
        
        const usersData = (usersRes as any)?.data || usersRes;
        const candidatesData = (candidatesRes as any)?.data || candidatesRes;
        
        if (Array.isArray(usersData)) {
          setTotalUsers(usersData.length);
        }
        
        if (Array.isArray(candidatesData)) {
          setTotalCandidates(candidatesData.length);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    
    fetchStats();
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