import React, { useState } from "react";
import styles from "./CVManagement.module.css";

export default function CVManagement() {
  // Thay string đơn thuần bằng object để có cả tên và link
  const [cvData, setCvData] = useState<{ name: string; url: string } | null>({
    name: "my_resume_v2.pdf",
    url: "/path/to/your/my_resume_v2.pdf" // Thay bằng link thật từ server hoặc Cloudinary/S3
  });

  const handleViewCV = () => {
    if (cvData?.url) {
      // Mở file trong tab mới
      window.open(cvData.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Manage CV</h2>
      <p className={styles.subtitle}>Upload and manage your professional CV.</p>

      {/* Upload Section giữ nguyên... */}
      <div className={styles.uploadSection}>
         {/* ... code input file của bạn ... */}
      </div>

      {/* Current CV List */}
      <div className={styles.cvList}>
        <h3 className={styles.sectionTitle}>Current CV</h3>
        {cvData ? (
          <div className={styles.cvCard}>
            <div className={styles.cvInfo}>
              <span className={styles.fileIcon}>📄</span>
              <div>
                <p className={styles.fileName}>{cvData.name}</p>
                <p className={styles.fileMeta}>Uploaded on May 22, 2026 • 1.2 MB</p>
              </div>
            </div>
            <div className={styles.cvActions}>
              {/* Gọi hàm handleViewCV */}
              <button className={styles.viewBtn} onClick={handleViewCV}>
                View
              </button>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ) : (
          <p className={styles.emptyText}>No CV uploaded yet.</p>
        )}
      </div>
    </div>
  );
}