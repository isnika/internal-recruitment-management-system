import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import applicationApi, {
  type Application,
} from "../../../../service/applicationApi";
import CreateInterviewModal from "../../InterviewManagement/components/CreateInterviewModal/CreateInterviewModal";

import styles from "./ApplicationsPage.module.css";

const STATUS_OPTIONS = [
  "PENDING",
  "REVIEWING",
  "INTERVIEWING",
  "ACCEPTED",
  "REJECTED",
] as const;

type Status = (typeof STATUS_OPTIONS)[number];
type ViewMode = "ALL" | "BY_JOB";

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("ALL");
  const [jobId, setJobId] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | Status>("ALL");
  const [showInterviewModal, setShowInterviewModal] = useState<number | null>(null);

  // ================= FETCH DATA =================
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      let result: Application[] = [];

      switch (viewMode) {
        case "ALL":
          result = await applicationApi.getAll();
          break;
        case "BY_JOB":
          if (!jobId.trim()) {
            setApplications([]);
            return;
          }
          result = await applicationApi.getByJob(Number(jobId));
          break;
      }

      // Theo như BE đã đổi status y hệt FE, ta không cần map nữa
      setApplications(result);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Không thể tải dữ liệu ứng tuyển.");
    } finally {
      setLoading(false);
    }
  }, [viewMode, jobId]);

  useEffect(() => {
    if (viewMode === "ALL") {
      fetchApplications();
    }
  }, [viewMode, fetchApplications]);

  useEffect(() => {
    setSearch("");
    setStatusFilter("ALL");
    if (viewMode === "BY_JOB") {
      setApplications([]);
    }
  }, [viewMode]);

  // ================= FILTER & METRICS =================
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "ALL") {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter((a) => {
        const email = a.user?.email?.toLowerCase() || "";
        const firstName = a.user?.firstName?.toLowerCase() || "";
        const lastName = a.user?.lastName?.toLowerCase() || "";
        const jobTitle = a.job?.title?.toLowerCase() || "";
        const companyName = a.job?.company?.name?.toLowerCase() || "";

        return (
          email.includes(keyword) ||
          firstName.includes(keyword) ||
          lastName.includes(keyword) ||
          jobTitle.includes(keyword) ||
          companyName.includes(keyword)
        );
      });
    }
    return result;
  }, [applications, search, statusFilter]);

  // Đếm nhanh số lượng theo trạng thái cho Metrics Box
  const counts = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter((a) => a.status === "PENDING").length,
      interviewing: applications.filter((a) => a.status === "INTERVIEWING").length,
      accepted: applications.filter((a) => a.status === "ACCEPTED").length,
    };
  }, [applications]);

  // ================= ACTIONS =================
  const handleUpdateStatus = async (id: number, newStatus: Status) => {
    try {
      // 1. Gọi API cập nhật lên Back-end
      await applicationApi.updateStatus(id, {
        status: newStatus as any,
      });

      // 2. Cập nhật trực tiếp State dựa trên status mới (Giao diện sẽ thay đổi ngay lập tức)
      setApplications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      // 3. Nếu chuyển sang INTERVIEWING, mở Modal lên lịch phỏng vấn
      if (newStatus === "INTERVIEWING") {
        setShowInterviewModal(id);
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Cập nhật trạng thái thất bại.");
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Quản lý Ứng tuyển (Applications)</h1>
        <p>Hệ thống phê duyệt và theo dõi hồ sơ ứng viên dành cho Admin</p>
      </div>

      {/* METRICS DASHBOARD */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Tổng hồ sơ</div>
          <div className={styles.metricValue}>{counts.total}</div>
        </div>
        <div className={styles.metricCard} style={{ borderLeft: "4px solid #d97706" }}>
          <div className={styles.metricLabel}>Chờ duyệt (Pending)</div>
          <div className={styles.metricValue}>{counts.pending}</div>
        </div>
        <div className={styles.metricCard} style={{ borderLeft: "4px solid #7c3aed" }}>
          <div className={styles.metricLabel}>Phỏng vấn</div>
          <div className={styles.metricValue}>{counts.interviewing}</div>
        </div>
        <div className={styles.metricCard} style={{ borderLeft: "4px solid #15803d" }}>
          <div className={styles.metricLabel}>Đã nhận (Accepted)</div>
          <div className={styles.metricValue}>{counts.accepted}</div>
        </div>
      </div>

      {/* CONTROL PANEL */}
      <div className={styles.controlPanel}>
        <div className={styles.panelTop}>
          <div className={styles.modeTabs}>
            <button
              className={`${styles.tabBtn} ${viewMode === "ALL" ? styles.activeTab : ""}`}
              onClick={() => setViewMode("ALL")}
            >
              Tất cả ứng tuyển
            </button>
            <button
              className={`${styles.tabBtn} ${viewMode === "BY_JOB" ? styles.activeTab : ""}`}
              onClick={() => setViewMode("BY_JOB")}
            >
              Lọc theo Job ID
            </button>
          </div>

          {viewMode === "BY_JOB" && (
            <div className={styles.jobSearchGroup}>
              <input
                type="number"
                className={styles.inputField}
                placeholder="Nhập ID công việc..."
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                style={{ width: "180px" }}
              />
              <button className={styles.primaryBtn} onClick={fetchApplications}>
                Tìm kiếm
              </button>
            </div>
          )}
        </div>

        <div className={styles.searchFilterGrid}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              placeholder="Tìm kiếm ứng viên, vị trí, công ty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className={styles.selectField}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "ALL" | Status)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
      {error && <div className={styles.errorBox}>{error}</div>}

      <div className={styles.tableContainer}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Ứng viên</th>
              <th>Vị trí ứng tuyển</th>
              <th>Ngày nộp</th>
              <th>Hồ sơ (CV)</th>
              <th>Trạng thái</th>
              <th style={{ width: "160px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.loadingText}>
                  Đang tải dữ liệu hồ sơ...
                </td>
              </tr>
            ) : filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyRow}>
                  Không tìm thấy hồ sơ ứng tuyển nào.
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <span className={styles.secondaryText}>#{app.id}</span>
                  </td>
                  <td>
                    <span className={styles.primaryText}>
                      {`${app.user?.firstName ?? ""} ${app.user?.lastName ?? ""}`.trim() || "Nợ danh"}
                    </span>
                    <span className={styles.secondaryText}>{app.user?.email ?? "-"}</span>
                  </td>
                  <td>
                    <span className={styles.primaryText}>{app.job?.title ?? "-"}</span>
                    <span className={styles.secondaryText}>{app.job?.company?.name ?? "-"}</span>
                  </td>
                  <td>{formatDate(app.appliedAt)}</td>
                  <td>
                    {app.cv?.fileUrl ? (
                      <a
                        href={app.cv.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkBtn}
                      >
                        Xem CV ↗
                      </a>
                    ) : (
                      <span className={styles.secondaryText}>Không có file</span>
                    )}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge_${app.status}`]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className={styles.actionSelect}
                      value={app.status}
                      onChange={(e) => handleUpdateStatus(app.id, e.target.value as Status)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* INTERVIEW SCHEDULE MODAL */}
      {showInterviewModal !== null && (
        <CreateInterviewModal
          applicationId={showInterviewModal}
          onClose={() => setShowInterviewModal(null)}
          onSuccess={() => {
            setShowInterviewModal(null);
            alert("Lên lịch phỏng vấn thành công!");
          }}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;