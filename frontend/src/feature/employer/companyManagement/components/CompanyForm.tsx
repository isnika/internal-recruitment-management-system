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
        {editingId ? "Cập Nhật Thông Tin Công Ty" : "Thêm Công Ty Mới"}
      </h3>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Tên công ty <span className={styles.required}>*</span></label>
          <input
            name="name"
            placeholder="Nhập tên công ty..."
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
            placeholder="Ví dụ: https://example.com"
            value={form.website}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Địa chỉ</label>
          <input
            name="address"
            placeholder="Nhập địa chỉ trụ sở..."
            value={form.address}
            onChange={onChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Trạng thái</label>
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
        <label>Mô tả công ty</label>
        <textarea
          name="description"
          placeholder="Nhập thông tin mô tả chi tiết về doanh nghiệp..."
          value={form.description}
          onChange={onChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.btnPrimary}>
          {editingId ? "Cập nhật" : "Tạo mới"}
        </button>

        <button type="button" onClick={onReset} className={styles.btnSecondary}>
          Hủy / Reset
        </button>
      </div>
    </form>
  );
};