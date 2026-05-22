import React, { useState } from "react";
import styles from "./RecruitmentFilterBar.module.css";
import { FiSliders, FiSearch, FiPlus } from "react-icons/fi";
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

  React.useEffect(() => {
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const statuses = ["Posted", "Draft", "Closed"];

  return (
    <div className={styles.filterWorkspace}>
      {/* LEFT: Search + Filters */}
      <div className={styles.filterControls}>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search job title, skills, department..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />

          {searchInput && (
            <button type="submit" className={styles.searchInlineBtn}>
              Search
            </button>
          )}
        </form>

        {/* Filters */}
        <div className={styles.dropdownGroup}>
          <div className={styles.filterLabelBlock}>
            <FiSliders className={styles.filterIcon} />
            <span>Filters:</span>
          </div>

          {/* Department */}
          <select
            className={styles.selectBox}
            onChange={(e) => onDepartmentChange(e.target.value)}
            defaultValue=""
          >
            <option value="">All Departments</option>
            {metadata?.departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            className={styles.selectBox}
            onChange={(e) => onStatusChange(e.target.value)}
            defaultValue=""
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Employment Type */}
          <select
            className={styles.selectBox}
            onChange={(e) => onEmploymentTypeChange(e.target.value)}
            defaultValue=""
          >
            <option value="">Employment Type</option>
            {metadata?.jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT: CTA Button */}
      <button
        type="button"
        className={styles.createJobBtn}
        onClick={onCreateJob}
      >
        <FiPlus className={styles.btnIcon} />
        <span>Create New Job</span>
      </button>
    </div>
  );
};

export default RecruitmentFilterBar;