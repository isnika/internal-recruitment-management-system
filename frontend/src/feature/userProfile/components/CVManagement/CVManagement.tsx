import React, { useEffect, useState } from "react";
import styles from "./CVManagement.module.css";
import cvApi from "../../../../service/cvApi";
import type { CV } from "../../../../types/cv";

export default function CVManagement() {
  // list CV thật từ backend
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ======================
  // FETCH CVS
  // ======================
  const fetchCVs = async () => {
    try {
      setLoading(true);
      const data = await cvApi.getMyCvs();
      setCvs(data);
    } catch (err) {
      console.error("Fetch CV error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  // ======================
  // UPLOAD CV
  // ======================
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await cvApi.upload(file);

      // reload list
      await fetchCVs();
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // ======================
  // VIEW CV
  // ======================
  const handleViewCV = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // ======================
  // DELETE CV
  // ======================
  const handleDelete = async (id: number) => {
    try {
      await cvApi.delete(id);
      await fetchCVs();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

 const getFileNameFromUrl = (url: string) => {
   if (!url) return "Không có tên file";

   try {
     // 1. Lấy phần cuối cùng của URL (tên file kèm đuôi)
     const decodeUrl = decodeURIComponent(url); // Giải mã URL thành Tiếng Việt có dấu (ví dụ: Phân tích thiết kế hệ thống...)
     const baseName = decodeUrl.substring(decodeUrl.lastIndexOf("/") + 1);

     // 2. Loại bỏ đuôi định dạng file (.pdf, .docx, .doc)
     const nameWithoutExt = baseName.replace(/\.[^/.]+$/, "");

     // 3. (Tùy chọn) Loại bỏ mã đuôi ngẫu nhiên của Cloudinary (_ioxruj, _vk2z6s) để tên file "sạch" hoàn toàn
     // Tìm vị trí của dấu gạch dưới cuối cùng để cắt bỏ phần mã id ngẫu nhiên
     const cleanName = nameWithoutExt.replace(/_[a-zA-Z0-9]+$/, "");

     // Trả về tên file kèm .pdf/.docx ban đầu sau khi đã làm sạch
     const extension = baseName.split('.').pop();
     return `${cleanName}.${extension}`;
   } catch (error) {
     return "CV_Attachment.pdf";
   }
 };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Manage CV</h2>
      <p className={styles.subtitle}>
        Upload and manage your professional CV.
      </p>

      {/* ======================
          UPLOAD SECTION
      ====================== */}
      <div className={styles.uploadSection}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />

        {uploading && <p>Uploading...</p>}
      </div>

      {/* ======================
          CV LIST
      ====================== */}
      <div className={styles.cvList}>
        <h3 className={styles.sectionTitle}>My CVs</h3>

        {loading ? (
          <p>Loading...</p>
        ) : cvs.length > 0 ? (
          cvs.map((cv) => (
            <div key={cv.id} className={styles.cvCard}>
              <div className={styles.cvInfo}>
                <span className={styles.fileIcon}>📄</span>

                <div>
                  <p className={styles.fileName} title={getFileNameFromUrl(cv.fileUrl)}>
                    {getFileNameFromUrl(cv.fileUrl)}
                  </p>

                  <p className={styles.fileMeta}>
                    Uploaded on{" "}
                    {new Date(cv.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className={styles.cvActions}>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleViewCV(cv.fileUrl)}
                >
                  View
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(cv.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>No CV uploaded yet.</p>
        )}
      </div>
    </div>
  );
}