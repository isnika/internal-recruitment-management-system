import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ApplyJobWizard from "./components/wizard/ApplyJobWizard";

import styles from "./ApplyJobPage.module.css";

import { jobApi } from "../../service/jobApi";
import cvApi from "../../service/cvApi";

import type { Job } from "../../types/job";

// ==========================================================================
// HÀM BÓC TÁCH VÀ LÀM SẠCH TÊN FILE TỪ CLOUDINARY URL (GIỐNG MANAGEMENT)
// ==========================================================================
const getFileNameFromUrl = (url: string) => {
  if (!url) return "Không có tên file";

  try {
    // 1. Giải mã URL thành Tiếng Việt có dấu chuẩn chỉnh
    const decodeUrl = decodeURIComponent(url);
    const baseName = decodeUrl.substring(decodeUrl.lastIndexOf("/") + 1);

    // 2. Loại bỏ đuôi định dạng file (.pdf, .docx...)
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, "");

    // 3. Cắt bỏ mã id ngẫu nhiên ngắt đuôi của Cloudinary (_vk2z6s, _ioxruj...)
    const cleanName = nameWithoutExt.replace(/_[a-zA-Z0-9]+$/, "");

    // Trả về tên file sạch kèm extension ban đầu
    const extension = baseName.split('.').pop();
    return `${cleanName}.${extension}`;
  } catch (error) {
    return "CV_Attachment.pdf";
  }
};

export default function ApplyJobPage() {
  const { jobId } = useParams<{ jobId: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(
    location.state?.job || null
  );

  const [cvs, setCvs] = useState<any[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  const [loadingJob, setLoadingJob] = useState(!job);
  const [loadingCv, setLoadingCv] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      if (job) {
        setLoadingJob(false);
        return;
      }

      if (!jobId) {
        setLoadingJob(false);
        return;
      }

      try {
        const data = await jobApi.getById(Number(jobId));
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
        setJob(null);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId, job]);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const data = await cvApi.getMyCvs();

        setCvs(data || []);

        if (data?.length > 0) {
          setSelectedCvId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to load CV:", error);
      } finally {
        setLoadingCv(false);
      }
    };

    fetchCv();
  }, []);

  const selectedCv =
    cvs.find((cv) => cv.id === selectedCvId) || null;

  if (loadingJob || loadingCv) {
    return (
      <div style={{ padding: 20 }}>
        Loading apply form...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Job not found</h3>

        <button onClick={() => navigate("/jobs")}>
          Back to jobs
        </button>
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h3>You don't have any CV yet.</h3>

        <button
          onClick={() => navigate("/profile/cv")}
        >
          Upload CV
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Khung chọn CV hiện đại */}
      <div className={styles.cvSelectContainer}>
        <label className={styles.cvSelectLabel}>Select CV:</label>

        <div className={styles.selectWrapper}>
          <select
            className={styles.cvSelect}
            value={selectedCvId ?? ""}
            onChange={(e) =>
              setSelectedCvId(Number(e.target.value))
            }
          >
            {cvs.map((cv) => (
              <option
                key={cv.id}
                value={cv.id}
              >
                {/* Gọi hàm bóc tách tên file từ cv.fileUrl ở đây */}
                {getFileNameFromUrl(cv.fileUrl)}
              </option>
            ))}
          </select>
          {/* Mũi tên custom thay thế cho mũi tên mặc định của trình duyệt */}
          <span className={styles.customArrow}></span>
        </div>
      </div>

      <ApplyJobWizard
        job={job}
        cv={selectedCv}
        onSubmitSuccess={() => {
          navigate("/profile/applied");
        }}
      />
    </>
  );
}