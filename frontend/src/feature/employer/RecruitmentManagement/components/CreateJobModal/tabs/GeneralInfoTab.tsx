import React, { useEffect, useMemo, useRef } from "react";
import styles from "../CreateJobModal.module.css";
import type { HomeMetadata } from "../../../../../../types/job";
import { FiChevronDown } from "react-icons/fi";

// =========================
// TYPES
// =========================
interface FormData {
  title: string;
  location: string;
  type: string;
  salaryMin: string;
  salaryMax: string;
  categoryId: string;
  experienceLevelId: string;
  skillIds: number[];
  companyId: string;
  deadline: string;
}

interface GeneralInfoTabProps {
  formData: FormData;
  handleChange: (field: keyof FormData, value: any) => void;
  metadata: HomeMetadata | null;

  isSkillsDropdownOpen: boolean;
  setIsSkillsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSkill: (skillId: number) => void;
}

const EMPLOYMENT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "REMOTE",
  "HYBRID",
  "INTERNSHIP",
];

const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({
  formData,
  handleChange,
  metadata,
  isSkillsDropdownOpen,
  setIsSkillsDropdownOpen,
  toggleSkill,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // =========================
  // CLICK OUTSIDE CLOSE DROPDOWN
  // =========================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSkillsDropdownOpen]);

  // =========================
  // SELECTED SKILL DISPLAY
  // =========================
  const selectedSkills = useMemo(() => {
    return (
      metadata?.skills
        ?.filter((s) => formData.skillIds.includes(s.id))
        .map((s) => s.name) || []
    );
  }, [metadata, formData.skillIds]);

  const displayText =
    selectedSkills.length > 0
      ? selectedSkills.slice(0, 3).join(", ") +
        (selectedSkills.length > 3 ? "..." : "")
      : "Select Skills";

  return (
    <div className={styles.formGrid}>
      {/* TITLE */}
      <div className={styles.formGroup}>
        <label>Job Position</label>
        <input
          className={styles.input}
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* LOCATION */}
      <div className={styles.formGroup}>
        <label>Work Location</label>
        <input
          className={styles.input}
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      {/* DEPARTMENT */}
      <div className={styles.formGroup}>
        <label>Department</label>
        <select
          className={styles.select}
          value={formData.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          <option value="">Select Department</option>
          {metadata?.categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* EXPERIENCE */}
      <div className={styles.formGroup}>
        <label>Experience Level</label>
        <select
          className={styles.select}
          value={formData.experienceLevelId}
          onChange={(e) =>
            handleChange("experienceLevelId", e.target.value)
          }
        >
          <option value="">Select Experience</option>
          {metadata?.experienceLevels?.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* EMPLOYMENT TYPE */}
      <div className={styles.formGroup}>
        <label>Employment Type</label>
        <select
          className={styles.select}
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">Select Type</option>
          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* DEADLINE */}
      <div className={styles.formGroup}>
        <label>Application Deadline</label>
        <input
          type="date"
          className={styles.input}
          value={formData.deadline}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />
      </div>

      {/* SALARY MIN */}
      <div className={styles.formGroup}>
        <label>Minimum Salary</label>
        <input
          type="number"
          className={styles.input}
          value={formData.salaryMin}
          onChange={(e) => handleChange("salaryMin", e.target.value)}
        />
      </div>

      {/* SALARY MAX */}
      <div className={styles.formGroup}>
        <label>Maximum Salary</label>
        <input
          type="number"
          className={styles.input}
          value={formData.salaryMax}
          onChange={(e) => handleChange("salaryMax", e.target.value)}
        />
      </div>

      {/* SKILLS */}
      <div className={styles.formGroup}>
        <label>Skills</label>

        <div className={styles.multiSelectContainer} ref={dropdownRef}>
          {/* TRIGGER */}
          <div
            className={styles.multiSelectTrigger}
            onClick={() =>
              setIsSkillsDropdownOpen((prev) => !prev)
            }
          >
            <span className={styles.selectedText}>{displayText}</span>
            <FiChevronDown />
          </div>

          {/* DROPDOWN */}
          {isSkillsDropdownOpen && (
            <div className={styles.multiSelectDropdown}>
              {metadata?.skills?.length ? (
                metadata.skills.map((skill) => (
                  <label
                    key={skill.id}
                    className={styles.multiSelectOption}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={formData.skillIds.includes(skill.id)}
                      onChange={() => toggleSkill(skill.id)}
                    />
                    {skill.name}
                  </label>
                ))
              ) : (
                <div className={styles.emptyState}>
                  No skills available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GeneralInfoTab);