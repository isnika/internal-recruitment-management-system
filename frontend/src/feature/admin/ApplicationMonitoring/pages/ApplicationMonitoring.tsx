import React, { useState, useMemo } from "react";
import styles from "./ApplicationMonitoring.module.css";
import type { ApplicationMock } from "../../../../dataMock/adminMock";
import ApplicationFilters from "../components/ApplicationFilters";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationDetailModal from "../components/ApplicationDetailModal";

import { initialApplications } from "../../../../dataMock/adminMock";

const ApplicationMonitoring: React.FC = () => {
  const [applications, setApplications] = useState(initialApplications);

  const onAudit = (appId: number, notes: string) => {
    alert(`Audit logged for App #${appId}. Notes: ${notes}`);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [auditingApp, setAuditingApp] = useState<ApplicationMock | null>(null);
  const [auditNotes, setAuditNotes] = useState("");

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

  const handleOpenAudit = (app: ApplicationMock) => {
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
