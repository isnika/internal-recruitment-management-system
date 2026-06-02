import React from "react";
import styles from "./FilterSidebar.module.css";

import type {
  JobFilterRequest,
  HomeMetadata,
} from "../../../../types/job";

interface Props {
  filters: JobFilterRequest;
  metadata: HomeMetadata | null;

  onKeywordsChange: (value: string) => void;

  onMinSalaryChange: (value: number | undefined) => void;
  onMaxSalaryChange: (value: number | undefined) => void;

  onLocationChange: (value: string) => void;

  onJobTypeChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onToggleSkill: (id: number) => void;

  onCategoryChange: (id: number) => void;

  onClearAll: () => void;
}

const FilterSidebar = ({
  filters,
  metadata,

  onKeywordsChange,

  onMinSalaryChange,
  onMaxSalaryChange,

  onLocationChange,

  onJobTypeChange,

  onStatusChange,

  onToggleSkill,

  onCategoryChange,

  onClearAll,
}: Props) => {
  return (
    <aside className={styles.sidebar}>
      {/* HEADER */}
      <div className={styles.top}>
        <span className={styles.title}>
          Search Filters
        </span>

        <button
          className={styles.clearAllBtn}
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>

      {/* KEYWORDS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Keywords</span>
        </div>

        <input
          type="text"
          placeholder="e.g. Frontend Developer"
          value={filters.keywords || ""}
          onChange={(e) =>
            onKeywordsChange(e.target.value)
          }
          className={styles.input}
        />
      </div>

      {/* LOCATION */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Location</span>
        </div>

        <input
          type="text"
          placeholder="e.g. Ho Chi Minh City"
          value={filters.location || ""}
          onChange={(e) =>
            onLocationChange(e.target.value)
          }
          className={styles.input}
        />
      </div>

      {/* SALARY */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Salary Range (USD)</span>
        </div>

        <div className={styles.list}>
          <label className={styles.item}>
            <input
              type="checkbox"
              checked={
                filters.minSalary === 0 &&
                filters.maxSalary === 500
              }
              onChange={() => {
                const checked =
                  filters.minSalary === 0 &&
                  filters.maxSalary === 500;

                if (checked) {
                  onMinSalaryChange(undefined);
                  onMaxSalaryChange(undefined);
                } else {
                  onMinSalaryChange(0);
                  onMaxSalaryChange(500);
                }
              }}
            />

            <span>Below $500</span>
          </label>

          <label className={styles.item}>
            <input
              type="checkbox"
              checked={
                filters.minSalary === 500 &&
                filters.maxSalary === 1000
              }
              onChange={() => {
                const checked =
                  filters.minSalary === 500 &&
                  filters.maxSalary === 1000;

                if (checked) {
                  onMinSalaryChange(undefined);
                  onMaxSalaryChange(undefined);
                } else {
                  onMinSalaryChange(500);
                  onMaxSalaryChange(1000);
                }
              }}
            />

            <span>$500 - $1000</span>
          </label>

          <label className={styles.item}>
            <input
              type="checkbox"
              checked={
                filters.minSalary === 1000 &&
                filters.maxSalary === 2000
              }
              onChange={() => {
                const checked =
                  filters.minSalary === 1000 &&
                  filters.maxSalary === 2000;

                if (checked) {
                  onMinSalaryChange(undefined);
                  onMaxSalaryChange(undefined);
                } else {
                  onMinSalaryChange(1000);
                  onMaxSalaryChange(2000);
                }
              }}
            />

            <span>$1000 - $2000</span>
          </label>

          <label className={styles.item}>
            <input
              type="checkbox"
              checked={
                filters.minSalary === 2000 &&
                filters.maxSalary === 3000
              }
              onChange={() => {
                const checked =
                  filters.minSalary === 2000 &&
                  filters.maxSalary === 3000;

                if (checked) {
                  onMinSalaryChange(undefined);
                  onMaxSalaryChange(undefined);
                } else {
                  onMinSalaryChange(2000);
                  onMaxSalaryChange(3000);
                }
              }}
            />

            <span>$2000 - $3000</span>
          </label>

          <label className={styles.item}>
            <input
              type="checkbox"
              checked={
                filters.minSalary === 3000 &&
                filters.maxSalary === undefined
              }
              onChange={() => {
                const checked =
                  filters.minSalary === 3000 &&
                  filters.maxSalary === undefined;

                if (checked) {
                  onMinSalaryChange(undefined);
                  onMaxSalaryChange(undefined);
                } else {
                  onMinSalaryChange(3000);
                  onMaxSalaryChange(undefined);
                }
              }}
            />

            <span>Above $3000</span>
          </label>
        </div>
      </div>

      {/* JOB TYPE */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Job Type</span>
        </div>

        <select
          value={filters.jobType || ""}
          onChange={(e) =>
            onJobTypeChange(e.target.value)
          }
          className={styles.select}
        >
          <option value="">
            All Job Types
          </option>

          <option value="FULL_TIME">
            Full Time
          </option>

          <option value="PART_TIME">
            Part Time
          </option>

          <option value="REMOTE">
            Remote
          </option>

          <option value="INTERNSHIP">
            Internship
          </option>
        </select>
      </div>

      {/* STATUS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Status</span>
        </div>

        <select
          value={filters.status || ""}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className={styles.select}
        >
          <option value="">
            All Statuses
          </option>

          <option value="ACTIVE">
            Hiring
          </option>

          <option value="PAUSED">
            Paused
          </option>
        </select>
      </div>

      {/* CATEGORY */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Category</span>
        </div>

        <div className={styles.list}>
          {metadata?.categories?.map(
            (category) => (
              <label
                key={category.id}
                className={styles.item}
              >
                <input
                  type="checkbox"
                  checked={
                    filters.categoryId ===
                    category.id
                  }
                  onChange={() =>
                    onCategoryChange(
                      category.id
                    )
                  }
                />

                <span>{category.name}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* SKILLS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Skills</span>
        </div>

        <div className={styles.list}>
          {metadata?.skills?.map((skill) => {
            const checked =
              filters.skillIds?.includes(
                skill.id
              ) || false;

            return (
              <label
                key={skill.id}
                className={styles.item}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onToggleSkill(skill.id)
                  }
                />

                <span>{skill.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;