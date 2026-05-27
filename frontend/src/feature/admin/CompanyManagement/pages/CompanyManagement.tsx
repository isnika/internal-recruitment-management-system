import React, { useState, useMemo, useEffect } from "react";
import styles from "./CompanyManagement.module.css";
import CompanyFilters from "../components/CompanyFilters";
import CompanyTable from "../components/CompanyTable";
import { useToast } from "../../../../components/Toast";
import * as userApi from "../../../../service/userApi";
import type { Company } from "../../../../types/company";

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res: any = await userApi.getAllCompanies();
      const data = res?.data || res;
      setCompanies(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch companies");
    }
  };

  const onApprove = async (id: number) => {
    try {
      const companyToUpdate = companies.find((c) => c.id === id);
      if (!companyToUpdate) return;
      await userApi.updateCompany(id, { 
        name: companyToUpdate.name,
        description: companyToUpdate.description,
        address: companyToUpdate.address,
        website: companyToUpdate.website,
        status: "ACTIVE" 
      });
      setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: "ACTIVE" } : c));
      toast.success("Company approved successfully");
    } catch (error) {
      toast.error("Failed to approve company");
    }
  };

  const onBlock = async (id: number) => {
    try {
      const companyToUpdate = companies.find((c) => c.id === id);
      if (!companyToUpdate) return;
      const newStatus = companyToUpdate.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";
      await userApi.updateCompany(id, {
        name: companyToUpdate.name,
        description: companyToUpdate.description,
        address: companyToUpdate.address,
        website: companyToUpdate.website,
        status: newStatus
      });
      setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      toast.success(`Company ${newStatus === "BLOCKED" ? "blocked" : "unblocked"} successfully`);
    } catch (error) {
      toast.error("Failed to update company status");
    }
  };

  const onVerify = (id: number) => {
    // API does not support verifying currently, toggle locally for demo
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, verified: !c.verified } : c));
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.website?.toLowerCase().includes(searchTerm.toLowerCase());
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
