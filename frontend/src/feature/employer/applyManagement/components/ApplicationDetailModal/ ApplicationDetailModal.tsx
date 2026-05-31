import React from "react";
import { Application } from "../../../../../service/applicationApi";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import styles from "./ApplicationDetailModal.module.css";

interface ApplicationDetailModalProps {
  application: Application | null;
  onClose: () => void;
}

// 1. ĐỔI THÀNH: Xóa chữ export ở đây đi, chỉ để const
const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  onClose,
}) => {
  if (!application) return null;

  const { user, job, cv, status, appliedAt } = application;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Chi tiết Hồ sơ Ứng viên</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h3>Thông tin cá nhân</h3>
            <p><strong>Họ tên:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Giới tính:</strong> {user.gender}</p>
            <p><strong>Ngày sinh:</strong> {new Date(user.dateOfBirth).toLocaleDateString('vi-VN')}</p>
          </div>

          <div className={styles.section}>
            <h3>Thông tin ứng tuyển</h3>
            <p><strong>Vị trí:</strong> {job.title}</p>
            <p><strong>Ngày nộp:</strong> {new Date(appliedAt).toLocaleDateString('vi-VN')}</p>
            <p>
              <strong>Trạng thái hiện tại:</strong> <StatusBadge status={status} />
            </p>
          </div>

          <div className={styles.section}>
            <h3>Tệp đính kèm (CV)</h3>
            <a href={cv.fileUrl} target="_blank" rel="noreferrer" className={styles.downloadLink}>
              Mở CV trong tab mới
            </a>
            <div className={styles.cvViewer}>
              <iframe src={cv.fileUrl} title="CV Viewer" width="100%" height="450px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. THÊM DÒNG NÀY VÀO CUỐI FILE:
export default ApplicationDetailModal;