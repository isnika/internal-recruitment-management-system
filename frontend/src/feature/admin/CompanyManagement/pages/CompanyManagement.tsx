import React, { useState, useMemo } from "react";
import styles from "./CompanyManagement.module.css";
import type { CompanyMock } from "../../../../dataMock/adminMock";
import CompanyFilters from "../components/CompanyFilters";
import CompanyTable from "../components/CompanyTable";

interface CompanyManagementProps {
  companies: CompanyMock[];
  onApprove: (id: number) => void;
  onBlock: (id: number) => void;
  onVerify: (id: number) => void;
}

const CompanyManagement: React.FC<CompanyManagementProps> = ({
  companies,
  onApprove,
  onBlock,
  onVerify,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [companies, searchTerm, statusFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Company Management</h1>
        <p className={styles.subtitle}>
          Verify company credentials, approve pending accounts, and manage system access status.
        </p>
      </div>

      {/* Filters */}
      <CompanyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}
      <CompanyTable
        filteredCompanies={filteredCompanies}
        onApprove={onApprove}
        onBlock={onBlock}
        onVerify={onVerify}
      />
    </div>
  );
};

export default CompanyManagement;
