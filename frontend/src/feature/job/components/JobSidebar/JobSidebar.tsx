import { metadataMock } from "../../../../dataMock/metadata";
import styles from "./JobSidebar.module.css";

const JobSidebar = () => {
  return (
    <div>
      <h3>Skill Tags</h3>
      {metadataMock.skillTags.map((s) => (
        <span key={s}>{s}</span>
      ))}

      <h3>Department</h3>
      {metadataMock.departments.map((d) => (
        <span key={d}>{d}</span>
      ))}

      <h3>Salary</h3>
      {metadataMock.salaryRanges.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
};

export default JobSidebar;