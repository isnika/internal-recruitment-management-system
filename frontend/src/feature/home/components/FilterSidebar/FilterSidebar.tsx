import styles from "./FilterSidebar.module.css";
import type { JobFilters, HomeMetadata } from "../../../../service/jobApi";

interface Props {
  filters: JobFilters;
  metadata: HomeMetadata | null;
  onToggle: (group: keyof JobFilters, value: string) => void;
  onClearGroup: (group: keyof JobFilters) => void;
  onClearAll: () => void;
}

const FilterSidebar = ({
  filters,
  metadata,
  onToggle,
  onClearGroup,
  onClearAll,
}: Props) => {
  const renderGroup = (
    title: string,
    group: keyof JobFilters,
    options: string[]
  ) => (
    <div className={styles.group}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={() => onClearGroup(group)}>Clear</button>
      </div>

      {options.map(opt => (
        <label key={opt} className={styles.item}>
          <input
            type="checkbox"
            checked={filters[group].includes(opt)}
            onChange={() => onToggle(group, opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <span>Filters</span>
        <button onClick={onClearAll}>Clear All</button>

      </div>

      {renderGroup("Job Type", "jobTypes", metadata?.jobTypes || [])}
      {renderGroup("Experience Level", "experienceLevels", metadata?.experienceLevels || [])}
      {renderGroup("Department", "departments", metadata?.departments || [])}
      {renderGroup("Salary", "salaryRanges", metadata?.salaryRanges || [])}
      {renderGroup("Skill Tags", "skillTags", metadata?.skillTags || [])}
    </aside>
  );
};

export default FilterSidebar;