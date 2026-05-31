import React from "react";
import styles from "./CompanyForm.module.css";

type FormState = {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE";
};

type CompanyFormProps = {
  form: FormState;
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  formRef: React.RefObject<HTMLFormElement | null>;
};

export const CompanyForm: React.FC<CompanyFormProps> = ({
  form,
  editingId,
  onChange,
  onSubmit,
  onReset,
  formRef,
}) => {
  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.formTitle}>
        {editingId ? "Update Company Information" : "Add New Company"}
      </h3>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Company Name <span className={styles.required}>*</span></label>
          <input
            name="name"
            placeholder="Enter company name..."
            value={form.name}
            onChange={onChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Website</label>
          <input
            name="website"
            placeholder="e.g., https://example.com"
            value={form.website}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            name="address"
            placeholder="Enter headquarters address..."
            value={form.address}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className={styles.select}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Company Description</label>
        <textarea
          name="description"
          placeholder="Enter detailed description about the business..."
          value={form.description}
          onChange={onChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.btnPrimary}>
          {editingId ? "Update" : "Create"}
        </button>

        <button type="button" onClick={onReset} className={styles.btnSecondary}>
          Cancel / Reset
        </button>
      </div>
    </form>
  );
};