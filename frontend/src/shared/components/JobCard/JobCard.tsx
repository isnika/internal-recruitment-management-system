import React from "react";
import styles from "./JobCard.module.css";
import type { Job } from "../../../service/jobApi";
import { FiMapPin, FiBookmark } from "react-icons/fi";
import { BsCash } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";

/**
 * Interface định nghĩa các Props mà JobCard cần nhận vào
 */
interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  onBookmark: (id: string) => void;
  // Bạn có thể thêm onViewDetails hoặc onApply nếu muốn xử lý riêng sau này
}

/**
 * Component JobCard dùng chung cho toàn bộ hệ thống
 */
const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onBookmark }) => {
  return (
    <div className={styles.jobCard}>
      {/* Cột trái: Logo công ty */}
      <div className={styles.jobLogoCol}>
        <img src={job.logo} alt={`${job.title} logo`} className={styles.logoImage} />
      </div>

      {/* Cột giữa: Thông tin chi tiết công việc */}
      <div className={styles.jobInfoCol}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.jobCategory}>{job.category}</p>

        {/* Danh sách kỹ năng */}
        <div className={styles.jobSkills}>
          <span className={styles.skillLabel}>Skills:</span>
          {job.skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>

        {/* Thông tin bổ trợ: Lương, Địa điểm */}
        <div className={styles.jobMetaList}>
          <div className={styles.metaItem}>
            <BsCash className={styles.metaIconYellow} />
            <span className={styles.metaBold}>{job.salary}</span>
          </div>
          <div className={styles.metaItem}>
            <FiMapPin className={styles.metaIconRed} />
            <span className={styles.metaText}>{job.location}</span>
          </div>
        </div>
      </div>

      {/* Cột phải: Các nút hành động và thông tin thời gian */}
      <div className={styles.jobActionCol}>
        <div className={styles.jobTopRight}>
          <span className={styles.jobPostedAt}>{job.postedAt}</span>
          {/* Nút lưu công việc */}
          <button 
            className={styles.bookmarkBtn} 
            onClick={() => onBookmark(job.id)}
            title={isBookmarked ? "Bỏ lưu" : "Lưu công việc"}
          >
            {isBookmarked ? (
              <FaBookmark className={`${styles.bookmarkIcon} ${styles.bookmarkIconActive}`} />
            ) : (
              <FiBookmark className={styles.bookmarkIcon} />
            )}
          </button>
        </div>

        {/* Các nút Điều hướng */}
        <div className={styles.actionButtons}>
          <button className={styles.viewDetailsBtn}>View Details</button>
          <button className={styles.applyBtn}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
