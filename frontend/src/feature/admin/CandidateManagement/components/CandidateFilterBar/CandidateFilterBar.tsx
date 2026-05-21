import styles from "./CandidateFilterBar.module.css";
import { FiSliders } from "react-icons/fi";
import { useState } from "react";

export default function CandidateFilterBar() {
  const [searchInput, setSearchInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <>
      {/* Filter & Search */}
      <div className={styles.filterRow}>
        <div className={styles.filterLeft}>
          <FiSliders size={18} />
          <span>Filter</span>
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search account..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button className={styles.searchBtn}>
            Search
          </button>
        </div>
      </div>

      {/* Dropdowns & Create Account */}
      <div className={styles.actionRow}>
        <div className={styles.dropdowns}>

          {/* From Date */}
          <div className={styles.dateFilter}>
            <label>From date</label>

            <input
              type="date"
              className={styles.dateInput}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className={styles.dateFilter}>
            <label>To date</label>

            <input
              type="date"
              className={styles.dateInput}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Status */}
          <select className={styles.select}>
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Gender */}
          <select className={styles.select}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button className={styles.createJobBtn}>
          Create Account
        </button>
      </div>
    </>
  );
}