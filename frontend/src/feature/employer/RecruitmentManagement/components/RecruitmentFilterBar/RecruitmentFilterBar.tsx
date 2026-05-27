import React, { useState } from "react";
import styles from "./RecruitmentFilterBar.module.css";
import { FiSliders, FiSearch, FiPlus } from "react-icons/fi";

import { useHomeMetadata } from "../../../../../hooks/useHomeMetadata";

interface RecruitmentFilterBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onStatusChange: (status: string) => void;
  onEmploymentTypeChange: (type: string) => void;
  onCreateJob: () => void;
}

const RecruitmentFilterBar: React.FC<RecruitmentFilterBarProps> = ({
  onSearch,
  onCategoryChange,
  onStatusChange,
  onEmploymentTypeChange,
  onCreateJob,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const { metadata } = useHomeMetadata();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  // STATUS (MATCH BACKEND)
  const statuses = [
    { label: "All Statuses", value: "" },
    { label: "Draft", value: "DRAFT" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <div className={styles.filterWorkspace}>
      {/* LEFT */}
      <div className={styles.filterControls}>
        {/* SEARCH */}
        <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search job title, skills..."
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

        {/* FILTERS */}
        <div className={styles.dropdownGroup}>
          <div className={styles.filterLabelBlock}>
            <FiSliders className={styles.filterIcon} />
            <span>Filters:</span>
          </div>

          {/* CATEGORY (FIXED) */}
          <select
            className={styles.selectBox}
            onChange={(e) => onCategoryChange(e.target.value)}
            defaultValue=""
          >
            <option value="">All Categories</option>
            {metadata?.categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            className={styles.selectBox}
            onChange={(e) => onStatusChange(e.target.value)}
            defaultValue=""
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* SKILLS (thay cho jobTypes) */}
          <select
            className={styles.selectBox}
            onChange={(e) => onEmploymentTypeChange(e.target.value)}
            defaultValue=""
          >
            <option value="">All Skills</option>
            {metadata?.skills?.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RIGHT CTA */}
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