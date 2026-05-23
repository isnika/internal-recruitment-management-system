import styles from "./FilterSidebar.module.css";

import type {
  JobFilters,
  HomeMetadata,
} from "../../../../types/job";

interface Props {
  filters: JobFilters;

  metadata: HomeMetadata | null;

  // SEARCH
  keyword: string;

  location: string;

  status: string;

  onKeywordChange: (
    value: string
  ) => void;

  onLocationChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  // CHECKBOX FILTER
  onToggle: (
    group: keyof JobFilters,
    value: string
  ) => void;

  onClearGroup: (
    group: keyof JobFilters
  ) => void;

  onClearAll: () => void;
}

const FilterSidebar = ({
  filters,
  metadata,

  keyword,
  location,
  status,

  onKeywordChange,
  onLocationChange,
  onStatusChange,

  onToggle,
  onClearGroup,
  onClearAll,
}: Props) => {
  const renderGroup = (
    title: string,
    group: keyof JobFilters,
    options: string[]
  ) => {
    if (!options?.length) return null;

    return (
      <div className={styles.group}>
        <div className={styles.header}>
          <span>{title}</span>

          <button
            onClick={() =>
              onClearGroup(group)
            }
          >
            Clear
          </button>
        </div>

        <div className={styles.list}>
          {options.map((option) => (
            <label
              key={option}
              className={styles.item}
            >
              <input
                type="checkbox"
                checked={filters[
                  group
                ].includes(option)}
                onChange={() =>
                  onToggle(group, option)
                }
              />

              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className={styles.sidebar}>
      {/* TOP */}
      <div className={styles.top}>
        <span className={styles.title}>
          Filters
        </span>

        <button
          className={styles.clearAllBtn}
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>


      {/* STATUS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Status</span>
        </div>

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
          className={styles.select}
        >
          <option value="">
            All Status
          </option>

          <option value="OPEN">
            OPEN
          </option>

          <option value="CLOSED">
            CLOSED
          </option>

          <option value="PENDING">
            PENDING
          </option>
        </select>
      </div>

      {/* JOB TYPE */}
      {renderGroup(
        "Job Type",
        "jobTypes",
        metadata?.jobTypes || []
      )}

      {/* EXPERIENCE */}
      {renderGroup(
        "Experience Level",
        "experienceLevels",
        metadata?.experienceLevels ||
          []
      )}

      {/* DEPARTMENT */}
      {renderGroup(
        "Department",
        "departments",
        metadata?.departments || []
      )}

      {/* SALARY */}
      {renderGroup(
        "Salary Range",
        "salaryRanges",
        metadata?.salaryRanges || []
      )}

      {/* SKILLS */}
      {renderGroup(
        "Skill Tags",
        "skillTags",
        metadata?.skillTags || []
      )}
    </aside>
  );
};

export default FilterSidebar;