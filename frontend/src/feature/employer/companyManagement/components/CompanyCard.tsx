import React, { useState, useRef } from "react";
import styles from "./CompanyCard.module.css";
import type { Company } from "../../../../types/company";

type CompanyCardProps = {
  company: Company;
  onEdit: (c: Company) => void;
  onDelete: (id: number) => void;
  onUploadLogo: (id: number, file: File) => Promise<void>;
};

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onEdit,
  onDelete,
  onUploadLogo,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUploadClick = async () => {
    if (!file) return;
    await onUploadLogo(company.id, file);
    // Reset file input sau khi upload thành công
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={company.logoUrl || "https://via.placeholder.com/80"}
          alt={`${company.name} logo`}
          className={styles.logo}
        />
        <span className={`${styles.badge} ${company.status === "ACTIVE" ? styles.bgActive : styles.bgInactive}`}>
          {company.status}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.companyName}>{company.name}</h3>
        {company.website && (
          <a href={company.website} target="_blank" rel="noreferrer" className={styles.companyLink}>
            {company.website}
          </a>
        )}
        <p className={styles.companyDesc}>{company.description || "Chưa có mô tả."}</p>
      </div>

      <div className={styles.cardActions}>
        <button type="button" onClick={() => onEdit(company)} className={styles.btnEdit}>
          Sửa
        </button>
        <button type="button" onClick={() => onDelete(company.id)} className={styles.btnDelete}>
          Xóa
        </button>
      </div>

      <div className={styles.uploadSection}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={!file}
          className={styles.btnUpload}
        >
          Đổi Logo
        </button>
      </div>
    </div>
  );
};