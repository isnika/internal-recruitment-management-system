import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import styles from "./ProfessionalInfoSection.module.css";

type Props = {
  jobTitle?: string;
  onChange?: (data: {
    intro: string;
    salary: string;
    startDate: string;
    cvFile: File | null;
  }) => void;
};

const ProfessionalInfoSection = ({ jobTitle, onChange }: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const [form, setForm] = useState({
    intro: "",
    salary: "",
    startDate: "",
    cvFile: null as File | null,
  });

  const updateField = (key: keyof typeof form, value: string) => {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    onChange?.(newForm);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    setFileName(file.name);

    const newForm = { ...form, cvFile: file };
    setForm(newForm);
    onChange?.(newForm);
  };

  return (
    <div className={styles.section}>
      <div className={styles.columns}>
        <div className={styles.leftCol}>
          <textarea
            className={styles.textarea}
            value={form.intro}
            onChange={(e) => updateField("intro", e.target.value)}
            placeholder="Self-Introduction"
            rows={3}
          />

          <input
            className={styles.input}
            value={jobTitle || ""}
            readOnly
          />

          <input
            className={styles.input}
            value={form.salary}
            onChange={(e) => updateField("salary", e.target.value)}
            placeholder="Desired Salary"
          />

          <input
            className={styles.input}
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            placeholder="Start Date"
          />
        </div>

        <div className={styles.rightCol}>
          <label className={styles.uploadBox}>
            <FiPlus />
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </label>

          <div className={styles.fileName}>
            {fileName || "No file selected"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;