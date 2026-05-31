import React, { useState, useEffect, useMemo } from "react";
import applicationApi from "../../../../service/applicationApi";
import styles from "./ApplicationsPage.module.css";

// ==========================================
// TYPE ĐỊNH NGHĨA CHUẨN THEO SWAGGER
// ==========================================
interface LocalApplication {
  id: number;
  status: string;
  appliedAt: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    role: string;
  };
  job: {
    id: number;
    title: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
  };
  cv: {
    id: number;
    fileUrl: string;
  };
}

// ==========================================
// 1. COMPONENT PHỤ: STATUS BADGE
// ==========================================
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStyleAndLabel = (st: string) => {
    switch (st?.toUpperCase()) {
      case "PENDING": return { label: "Chờ duyệt", color: "#d97706", bg: "#fef3c7" };
      case "REVIEWING": return { label: "Đang xem xét", color: "#0284c7", bg: "#e0f2fe" };
      case "INTERVIEW": return { label: "Phỏng vấn", color: "#7c3aed", bg: "#f3e8ff" };
      case "ACCEPTED": return { label: "Trúng tuyển", color: "#16a34a", bg: "#dcfce7" };
      case "REJECTED": return { label: "Từ chối", color: "#dc2626", bg: "#fee2e2" };
      default: return { label: st || "Không rõ", color: "#4b5563", bg: "#f3f4f6" };
    }
  };
  const config = getStyleAndLabel(status);
  return (
    <span style={{
      padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
      color: config.color, backgroundColor: config.bg, display: "inline-block"
    }}>
      {config.label}
    </span>
  );
};

// ==========================================
// 2. COMPONENT PHỤ: DETAIL MODAL
// ==========================================
interface ModalProps {
  application: LocalApplication;
  onClose: () => void;
}
const ApplicationDetailModal: React.FC<ModalProps> = ({ application, onClose }) => {
  const { user, job, cv, status, appliedAt } = application;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px"
    }} onClick={onClose}>
      <div style={{
        background: "white", width: "100%", maxWidth: "650px", borderRadius: "8px",
        maxHeight: "90vh", overflowY: "auto", padding: "24px", position: "relative"
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Chi tiết Hồ sơ Ứng viên</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "28px", cursor: "pointer", color: "#9ca3af" }}>&times;</button>
        </div>

        <div style={{ marginBottom: "20px", borderBottom: "1px solid #edf2f7", paddingBottom: "15px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#2563eb", fontSize: "15px" }}>Thông tin cá nhân</h4>
          <p style={{ margin: "6px 0" }}><strong>Họ tên:</strong> {user.firstName} {user.lastName}</p>
          <p style={{ margin: "6px 0" }}><strong>Email:</strong> {user.email}</p>
          <p style={{ margin: "6px 0" }}><strong>Giới tính:</strong> {user.gender === "MALE" ? "Nam" : user.gender === "FEMALE" ? "Nữ" : user.gender}</p>
          <p style={{ margin: "6px 0" }}><strong>Ngày sinh:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN") : "N/A"}</p>
        </div>

        <div style={{ marginBottom: "20px", borderBottom: "1px solid #edf2f7", paddingBottom: "15px" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#2563eb", fontSize: "15px" }}>Vị trí ứng tuyển</h4>
          <p style={{ margin: "6px 0" }}><strong>Công việc:</strong> {job.title}</p>
          <p style={{ margin: "6px 0" }}><strong>Ngày nộp đơn:</strong> {new Date(appliedAt).toLocaleDateString("vi-VN")}</p>
          <p style={{ margin: "6px 0" }}><strong>Trạng thái:</strong> <StatusBadge status={status} /></p>
        </div>

        <div>
          <h4 style={{ margin: "0 0 10px 0", color: "#2563eb", fontSize: "15px" }}>Hồ sơ đính kèm (CV)</h4>
          <a href={cv.fileUrl} target="_blank" rel="noreferrer" style={{ color: "#2563eb", display: "inline-block", marginBottom: "12px", textDecoration: "underline", fontSize: "14px" }}>
            Mở xem CV trong tab mới ↗
          </a>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
            <iframe src={cv.fileUrl} title="CV Viewer" width="100%" height="380px" style={{ border: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. COMPONENT CHÍNH: APPLICATIONS PAGE
// ==========================================
interface PageProps {
  jobId?: number;
}

const ApplicationsPage: React.FC<PageProps> = ({ jobId: propJobId }) => {
  // Giả lập hoặc cho phép nhập jobId ngay trên UI để tiện việc kiểm thử API /job/{id}
  const [currentJobId, setCurrentJobId] = useState<number>(propJobId || 1);
  const [apiMode, setApiMode] = useState<"JOB" | "ME">("JOB"); // Mặc định chuyển sang JOB để tránh lỗi 500

  const [applications, setApplications] = useState<LocalApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState<LocalApplication | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = apiMode === "JOB"
        ? await applicationApi.getApplicationsByJob(currentJobId)
        : await applicationApi.getMyApplications();

      setApplications(response.data as unknown as LocalApplication[]);
    } catch (err: any) {
      setError(err?.response?.status === 500
        ? `Lỗi Server (500 Internal Error) khi gọi API ${apiMode === "ME" ? "/me" : `/job/${currentJobId}`}. Hãy kiểm tra xem ID này có dữ liệu trong DB chưa.`
        : "Không thể kết nối tới máy chủ. Vui lòng thử lại!"
      );
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentJobId, apiMode]);

  // Xử lý PATCH /api/applications/{id}/status cập nhật trạng thái
  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      await applicationApi.updateApplicationStatus(id, { status: newStatus });
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (err) {
      alert("Cập nhật trạng thái lên Server thất bại!");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (!app || !app.user || !app.job) return false;
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
      const fullName = `${app.user.firstName || ""} ${app.user.lastName || ""}`.toLowerCase();
      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (app.user.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (app.job.title || "").toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, search, statusFilter]);

  return (
    <div className={styles.container} style={{ padding: "24px", maxWidth: "1250px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>

      {/* THANH ĐIỀU KHIỂN ĐỂ TEST API DÀNH CHO BẠN */}
      <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "24px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>🛠 Chế độ Test API:</span>
        <label style={{ fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <input type="radio" checked={apiMode === "JOB"} onChange={() => setApiMode("JOB")} />
          Xem ứng viên theo Job ID
        </label>
        <label style={{ fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <input type="radio" checked={apiMode === "ME"} onChange={() => setApiMode("ME")} />
          Xem qua API /me (Đang lỗi 500)
        </label>

        {apiMode === "JOB" && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>Nhập Job ID trong DB:</span>
            <input
              type="number"
              value={currentJobId}
              onChange={(e) => setCurrentJobId(Number(e.target.value))}
              style={{ width: "70px", padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
            />
          </div>
        )}
        <button onClick={loadData} style={{ marginLeft: "auto", padding: "6px 14px", backgroundColor: "#0f172a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
          Tải lại dữ liệu ↻
        </button>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 6px 0", fontSize: "26px", color: "#0f172a", fontWeight: 700 }}>Quản lý Đơn Ứng tuyển</h1>
        <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
          {apiMode === "JOB" ? `Đang hiển thị hồ sơ nộp cho Công việc mang mã ID: ${currentJobId}` : "Đang hiển thị hồ sơ qua API cá nhân /me"}
        </p>
      </div>

      {/* THANH BỘ LỌC TÌM KIẾM */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm nhanh theo tên, email ứng viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "white", fontSize: "14px", cursor: "pointer" }}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="REVIEWING">Đang xem xét</option>
          <option value="INTERVIEW">Phỏng vấn</option>
          <option value="ACCEPTED">Trúng tuyển</option>
          <option value="REJECTED">Từ chối</option>
        </select>
      </div>

      {/* HIỂN THỊ TRẠNG THÁI LOADING / ERROR */}
      {loading && <div style={{ textAlign: "center", padding: "60px", color: "#64748b", fontSize: "15px" }}>Đang kết nối API và lấy dữ liệu...</div>}

      {error && !loading && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      {/* BẢNG DỮ LIỆU CHÍNH */}
      {!loading && (
        <div style={{ overflowX: "auto", background: "white", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Ứng viên</th>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Vị trí ứng tuyển</th>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Ngày nộp</th>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Trạng thái</th>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Hành động nhanh</th>
                <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>Không tìm thấy hồ sơ ứng viên nào.</td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }} className={styles.tableRow} onClick={() => setSelectedApp(app)}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 600, color: "#1e293b" }}>{app.user?.firstName} {app.user?.lastName}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{app.user?.email}</div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#334155" }}>{app.job?.title}</td>
                    <td style={{ padding: "14px 16px", color: "#64748b" }}>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("vi-VN") : "N/A"}</td>
                    <td style={{ padding: "14px 16px" }}><StatusBadge status={app.status} /></td>
                    <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                      <select
                        value={app.status}
                        disabled={updatingId === app.id}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", backgroundColor: "#fff", cursor: "pointer" }}
                      >
                        <option value="PENDING">Chờ duyệt</option>
                        <option value="REVIEWING">Đang xem xét</option>
                        <option value="INTERVIEW">Phỏng vấn</option>
                        <option value="ACCEPTED">Trúng tuyển</option>
                        <option value="REJECTED">Từ chối</option>
                      </select>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedApp(app); }}
                        style={{ padding: "6px 14px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 500 }}
                      >
                        Xem CV
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* POPUP MODAL CHI TIẾT */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;