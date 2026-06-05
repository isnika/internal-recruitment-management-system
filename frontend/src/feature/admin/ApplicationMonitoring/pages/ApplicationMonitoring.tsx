import React, { useState, useMemo, useEffect } from "react";
import styles from "./ApplicationMonitoring.module.css";
import ApplicationFilters from "../components/ApplicationFilters";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationDetailModal from "../components/ApplicationDetailModal";
import applicationApi from "../../../../service/applicationApi";

// We define a local interface to match the Table's expected props based on real data
export interface AdminApplicationRecord {
  id: number;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  date: string;
  cvFileName: string;
  status: string;
}

const ApplicationMonitoring: React.FC = () => {
  const [applications, setApplications] = useState<AdminApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [auditingApp, setAuditingApp] = useState<AdminApplicationRecord | null>(null);
  const [auditNotes, setAuditNotes] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationApi.getAllForAdmin();
      const mapped: AdminApplicationRecord[] = data.map((app: any) => {
        let dateStr = "";
        if (app.appliedAt) {
          if (Array.isArray(app.appliedAt)) {
            const [y, m, d] = app.appliedAt;
            dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          } else {
            dateStr = String(app.appliedAt).substring(0, 10);
          }
        }
        return {
          id: app.id,
          candidateName: app.user ? `${app.user.firstName} ${app.user.lastName}` : "Unknown",
          jobTitle: app.job?.title || "Unknown Job",
          companyName: app.job?.company?.name || "Unknown Company",
          date: dateStr,
          cvFileName: app.cv?.fileUrl ? app.cv.fileUrl.split("/").pop() || "CV.pdf" : "CV.pdf",
          status: app.status
        };
      });
      setApplications(mapped);
    } catch (err) {
      console.error("Error fetching admin applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const onAudit = (appId: number, notes: string) => {
    alert(`Audit logged for App #${appId}. Notes: ${notes}`);
  };

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const handleOpenAudit = (app: AdminApplicationRecord) => {
    setAuditingApp(app);
    setAuditNotes("");
  };

  const handleConfirmAudit = () => {
    if (auditingApp && auditNotes.trim()) {
      onAudit(auditingApp.id, auditNotes);
      setAuditingApp(null);
      setAuditNotes("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Application Monitoring</h1>
        <p className={styles.subtitle}>
          Monitor candidate job applications, track conversion steps, and audit candidates profile for compliance checks.
        </p>
      </div>

      {/* Filters */}
      <ApplicationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}
      <ApplicationTable
        filteredApps={filteredApps}
        onAudit={handleOpenAudit}
      />

      {/* Audit Modal */}
      {auditingApp && (
        <ApplicationDetailModal
          auditingApp={auditingApp}
          onClose={() => setAuditingApp(null)}
          auditNotes={auditNotes}
          setAuditNotes={setAuditNotes}
          onConfirm={handleConfirmAudit}
        />
      )}
    </div>
  );
};

export default ApplicationMonitoring;
