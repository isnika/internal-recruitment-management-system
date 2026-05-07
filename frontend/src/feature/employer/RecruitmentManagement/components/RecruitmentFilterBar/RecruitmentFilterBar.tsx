import React, { useState, useEffect } from "react";
import styles from "./RecruitmentFilterBar.module.css";
import { FiSliders } from "react-icons/fi";
import { fetchMetadataApi } from "../../../../../service/jobApi";
import type { HomeMetadata } from "../../../../../types/job";

interface RecruitmentFilterBarProps {
  onSearch: (query: string) => void;
  onDepartmentChange: (department: string) => void;
  onStatusChange: (status: string) => void;
  onEmploymentTypeChange: (type: string) => void;
  onCreateJob: () => void;
}

const RecruitmentFilterBar: React.FC<RecruitmentFilterBarProps> = ({
  onSearch,
  onDepartmentChange,
  onStatusChange,
  onEmploymentTypeChange,
  onCreateJob,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await fetchMetadataApi();
        setMetadata(data);
      } catch (err) {
        console.error("Failed to load metadata", err);
      }
    };
    getMetadata();
  }, []);

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const statuses = ["Posted", "Draft", "Closed"];

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
            placeholder="Job title, Skills, ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Dropdowns & Create Job */}
      <div className={styles.actionRow}>
        <div className={styles.dropdowns}>
          <select
            className={styles.select}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="">All Departments</option>
            {metadata?.departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            onChange={(e) => onEmploymentTypeChange(e.target.value)}
          >
            <option value="">All Employment Types</option>
            {metadata?.jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.createJobBtn} onClick={onCreateJob}>Create Job</button>
      </div>
    </>
  );
};

export default RecruitmentFilterBar;
