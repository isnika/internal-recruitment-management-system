import React, { useState } from "react";
import styles from "./homeAdmin.module.css";
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiCompass,
  FiLayers,
  FiShield,
  FiPieChart,
  FiSettings,
  FiCheckCircle,
} from "react-icons/fi";

import { users as initialUsers } from "../../../../../dataMock/User";
import { jobs as initialJobs } from "../../../../../dataMock/Job";
import {
  initialCompanies,
  initialApplications,
  initialLogs,
  initialRolePermissions,
} from "../../../../../dataMock/adminMock";
import type {
  CompanyMock,
  ApplicationMock,
  SystemLog,
  RolePermissions,
} from "../../../../../dataMock/adminMock";

import { ToastProvider, useToast } from "../../../../../components/Toast";

// Add some HR mock users as requested
const usersWithHR = [
  ...initialUsers,
  {
    id: 101,
    username: "hr_linh",
    email: "hr_linh@gmail.com",
    password: "123456",
    phone: "0988777666",
    fullName: "Nguyễn Khánh Linh (HR)",
    role: "hr",
    address: "Hà Nội",
    dob: "1996-08-12",
    gender: "female",
    status: "Active",
  },
  {
    id: 102,
    username: "hr_minh",
    email: "hr_minh@gmail.com",
    password: "123456",
    phone: "0977666555",
    fullName: "Trần Thế Minh (HR)",
    role: "hr",
    address: "TP. Hồ Chí Minh",
    dob: "1995-03-24",
    gender: "male",
    status: "Active",
  },
];

// Import modular pages
import Dashboard from "../../../Dashboard/pages/Dashboard";
import UserManagement from "../../../UserAccountManagement/pages/UserManagement";
import JobApproval from "../../../JobApproval/pages/JobApproval";
import CompanyManagement from "../../../CompanyManagement/pages/CompanyManagement";
import ApplicationMonitoring from "../../../ApplicationMonitoring/pages/ApplicationMonitoring";
import RolePermission from "../../../RolePermission/pages/RolePermission";
import StatisticalReport from "../../../StatisticalReport/pages/StatisticalReport";
import SystemSettings from "../../../SystemSettings/pages/SystemSettings";
import CandidateManagement from "../../../CandidateManagement/pages/candidatesManagement";

const HomeAdminContent = () => {
  const toast = useToast();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Shared Admin States
  const [users, setUsers] = useState(() =>
    usersWithHR.map((u) => ({ ...u, status: u.status || "Active" }))
  );
  const [jobs, setJobs] = useState(() => initialJobs);
  const [companies, setCompanies] = useState<CompanyMock[]>(() => initialCompanies);
  const [applications, setApplications] = useState<ApplicationMock[]>(() => initialApplications);
  const [logs, setLogs] = useState<SystemLog[]>(() => initialLogs);
  const [permissions, setPermissions] = useState<RolePermissions[]>(() => initialRolePermissions);

  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "smtp.gmail.com",
    port: "587",
    senderName: "HKKQ Careers System",
    senderEmail: "noreply@hkkq.vn",
  });

  const [notificationConfig, setNotificationConfig] = useState({
    enableEmail: true,
    enablePush: true,
    enableSlack: false,
  });

  // Action helpers to update states and log actions
  const addLog = (action: string, actor: string = "Admin (admin@gmail.com)") => {
    const newLog: SystemLog = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      actor,
      action,
      ip: "192.168.1.10",
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleSaveUserRole = (id: number, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          addLog(`Updated role of '${u.fullName}' to ${newRole}`);
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === "Active" ? "Inactive" : "Active";
          addLog(`${newStatus === "Inactive" ? "Blocked" : "Activated"} user account '${u.fullName}' (Role: ${u.role})`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleResetUserPassword = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      addLog(`Reset password for user '${user.fullName}'`);
      toast.success(`Successfully reset password for ${user.fullName}. A new password has been sent to their email.`);
    }
  };

  const handleDeleteUser = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      if (window.confirm(`Are you sure you want to permanently delete user ${user.fullName}?`)) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        addLog(`Deleted user account '${user.fullName}'`);
        toast.success(`User ${user.fullName} has been deleted successfully.`);
      }
    }
  };

  const handleApproveJob = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          addLog(`Approved job listing '${j.title}'`);
          return { ...j, status: "approved" };
        }
        return j;
      })
    );
  };

  const handleRejectJob = (id: string, reason: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          addLog(`Rejected job listing '${j.title}' - Reason: ${reason}`);
          return { ...j, status: "rejected" };
        }
        return j;
      })
    );
  };

  const handleApproveCompany = (id: number) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          addLog(`Approved company profile '${c.name}'`);
          return { ...c, status: "Approved" };
        }
        return c;
      })
    );
  };

  const handleBlockCompany = (id: number) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === "Blocked" ? "Approved" : "Blocked";
          addLog(`${newStatus === "Blocked" ? "Blocked" : "Unblocked"} company profile '${c.name}'`);
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  const handleVerifyCompany = (id: number) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextVerified = !c.verified;
          addLog(`${nextVerified ? "Verified (Gave green check)" : "Unverified"} company profile '${c.name}'`);
          return { ...c, verified: nextVerified };
        }
        return c;
      })
    );
  };

  const handleAuditCandidate = (appId: number, notes: string) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      addLog(`Audited application #${appId} by ${app.candidateName} for job '${app.jobTitle}' - Notes: ${notes}`);
      toast.success(`Audit logged successfully for ${app.candidateName}.`);
    }
  };

  const handleUpdatePermissions = (role: string, updatedPerms: any) => {
    setPermissions((prev) =>
      prev.map((p) => {
        if (p.role === role) {
          addLog(`Updated security role & permissions for '${role}'`);
          return { ...p, permissions: updatedPerms };
        }
        return p;
      })
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard users={users} jobs={jobs} applications={applications} />;
      case "users":
        return (
          <UserManagement
            usersList={users}
            onToggleStatus={handleToggleUserStatus}
            onResetPassword={handleResetUserPassword}
            onDeleteUser={handleDeleteUser}
            onSaveRole={handleSaveUserRole}
          />
        );
      case "jobApproval":
        return (
          <JobApproval
            jobs={jobs}
            onApprove={handleApproveJob}
            onReject={handleRejectJob}
          />
        );
      case "companies":
        return (
          <CompanyManagement
            companies={companies}
            onApprove={handleApproveCompany}
            onBlock={handleBlockCompany}
            onVerify={handleVerifyCompany}
          />
        );
      case "applications":
        return (
          <ApplicationMonitoring
            applications={applications}
            onAudit={handleAuditCandidate}
          />
        );
      case "roles":
        return (
          <RolePermission
            permissions={permissions}
            onUpdate={handleUpdatePermissions}
          />
        );
      case "reports":
        return <StatisticalReport users={users} jobs={jobs} applications={applications} />;
      case "settings":
        return (
          <SystemSettings
            logs={logs}
            emailConfig={emailConfig}
            setEmailConfig={setEmailConfig}
            notificationConfig={notificationConfig}
            setNotificationConfig={setNotificationConfig}
            onClearLogs={() => {
              setLogs([]);
              addLog("Cleared all activity logs.");
            }}
          />
        );
      case "candidates":
        return <CandidateManagement />;
      default:
        return null;
    }
  };

  const menus = [
    { key: "dashboard", label: "Dashboard", icon: <FiGrid /> },
    { key: "users", label: "User Management", icon: <FiUsers /> },
    { key: "candidates", label: "Candidate Management", icon: <FiUserCheck /> },
    { key: "jobApproval", label: "Job Approval", icon: <FiBriefcase /> },
    { key: "companies", label: "Company Management", icon: <FiCompass /> },
    { key: "applications", label: "Application Monitoring", icon: <FiLayers /> },
    { key: "roles", label: "Role & Permission", icon: <FiShield /> },
    { key: "reports", label: "Statistics & Reports", icon: <FiPieChart /> },
    { key: "settings", label: "System Settings", icon: <FiSettings /> },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <FiShield className={styles.logoIcon} />
          <span>ADMIN HUB</span>
        </div>

        <nav className={styles.menu}>
          {menus.map((item) => (
            <button
              key={item.key}
              className={`${styles.menuItem} ${
                activeMenu === item.key ? styles.active : ""
              }`}
              onClick={() => setActiveMenu(item.key)}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

const HomeAdmin = () => {
  return (
    <ToastProvider>
      <HomeAdminContent />
    </ToastProvider>
  );
};

export default HomeAdmin;