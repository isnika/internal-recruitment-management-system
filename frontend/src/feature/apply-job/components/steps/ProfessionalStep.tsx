import styles from "./ProfessionalStep.module.css";

const ProfessionalStep = ({ job, form, setForm }: any) => {
  if (!job) return null;

  const handleChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Professional Information</h2>

      <div className={styles.grid}>
        <div className={styles.fieldFull}>
          <label>Introduction</label>
          <textarea
            value={form?.intro ?? ""}
            onChange={(e) => handleChange("intro", e.target.value)}
            placeholder="Write your introduction..."
          />
        </div>

        <div className={styles.field}>
          <label>Job Title</label>
          <input value={job?.title ?? ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Expected Salary</label>
          <input
            type="number"
            value={form?.salary ?? ""}
            onChange={(e) => handleChange("salary", e.target.value)}
            placeholder="Enter salary"
          />
        </div>

        <div className={styles.field}>
          <label>Start Date</label>
          <input
            type="date"
            value={form?.startDate ?? ""}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStep;