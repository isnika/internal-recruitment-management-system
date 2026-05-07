import React from "react";
import styles from "../CreateJobModal.module.css";
import type { HomeMetadata } from "../../../../../../types/job";
import { FiChevronDown } from "react-icons/fi";

interface GeneralInfoTabProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  metadata: HomeMetadata | null;
  isSkillsDropdownOpen: boolean;
  setIsSkillsDropdownOpen: (isOpen: boolean) => void;
  toggleSkill: (skill: string) => void;
}

const GeneralInfoTab: React.FC<GeneralInfoTabProps> = ({
  formData,
  handleChange,
  metadata,
  isSkillsDropdownOpen,
  setIsSkillsDropdownOpen,
  toggleSkill,
}) => {
  return (
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label>Job position</label>
        <input 
          className={styles.input} 
          placeholder="Job position"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Number of Vacancies</label>
        <input 
          className={styles.input} 
          type="number" 
          placeholder="Number of Vacancies"
          value={formData.vacancies}
          onChange={(e) => handleChange("vacancies", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Department</label>
        <select 
          className={styles.select}
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
        >
          <option value="">Department</option>
          {metadata?.departments?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Work Location</label>
        <input 
          className={styles.input} 
          placeholder="Work Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Employment Type</label>
        <select 
          className={styles.select}
          value={formData.jobType}
          onChange={(e) => handleChange("jobType", e.target.value)}
        >
          <option value="">Employment Type</option>
          {metadata?.jobTypes?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Job Title</label>
        <input 
          className={styles.input} 
          placeholder="Job Title"
          value={formData.title} // Linked to Job position for mockup simplicity
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Experience</label>
        <select 
          className={styles.select}
          value={formData.experienceLevel}
          onChange={(e) => handleChange("experienceLevel", e.target.value)}
        >
          <option value="">Experience</option>
          {metadata?.experienceLevels?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Application Deadline</label>
        <input 
          className={styles.input} 
          type="date"
          value={formData.applicationDeadline}
          onChange={(e) => handleChange("applicationDeadline", e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Salary</label>
        <select 
          className={styles.select}
          value={formData.salaryRange}
          onChange={(e) => handleChange("salaryRange", e.target.value)}
        >
          <option value="">Salary</option>
          {metadata?.salaryRanges?.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className={styles.formGroup}></div> {/* Empty space */}

      <div className={styles.formGroup}>
        <label>Skills</label>
        <div className={styles.multiSelectContainer}>
          <div 
            className={styles.multiSelectTrigger}
            onClick={() => setIsSkillsDropdownOpen(!isSkillsDropdownOpen)}
          >
            <span style={{color: '#334155'}}>
              {formData.skills.length > 0 ? formData.skills.join(", ") : "Skills"}
            </span>
            <FiChevronDown />
          </div>
          {isSkillsDropdownOpen && (
            <div className={styles.multiSelectDropdown}>
              {metadata?.skillTags?.map(skill => (
                <label key={skill} className={styles.multiSelectOption}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={formData.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
