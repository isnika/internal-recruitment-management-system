import React, { useState, useMemo } from "react";
import styles from "./CompanyManagement.module.css";
import type { CompanyMock } from "../../../../dataMock/adminMock";
import CompanyFilters from "../components/CompanyFilters";
import CompanyTable from "../components/CompanyTable";

import { initialCompanies } from "../../../../dataMock/adminMock";

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState(initialCompanies);

  const onApprove = (id: number) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: "ACTIVE" } : c));
  };

  const onBlock = (id: number) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "BLOCKED" ? "ACTIVE" : "BLOCKED" } : c));
  };

  const onVerify = (id: number) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, verified: !c.verified } : c));
  };
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
