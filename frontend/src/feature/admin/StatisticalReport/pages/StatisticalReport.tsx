import { jobs } from "../../../../dataMock/Job";
import { users } from "../../../../dataMock/User";
import { FiUsers, FiBriefcase, FiFileText, FiDownload } from "react-icons/fi";
import styles from "./StatisticalReport.module.css";
import StatCard from "../components/StatCard";
import RoleDistributionChart from "../components/RoleDistributionChart";
import JobCategoriesChart from "../components/JobCategoriesChart";
import GrowthChart from "../components/GrowthChart";

const StatisticalReport = () => {
  const totalJobs = jobs.length;
  const totalUsers = users.length;
  const totalApplications = 324; // Mock standard number of applications

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Statistical Reports</h1>
          <p className={styles.pageSub}>
            Detailed insights into system performance and user growth
          </p>
        </div>
        <button
          className={styles.btnExport}
          onClick={() => alert("Exporting report to Excel/PDF...")}
        >
          <FiDownload /> Export Report
        </button>
      </div>

      {/* SUMMARY GRID */}
      <div className={styles.summaryGrid}>
        <StatCard
          title="Total Jobs"
          value={totalJobs}
          trend="+12% this month"
          icon={<FiBriefcase />}
          bgColor="#e6f4ff"
          iconColor="#1677ff"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          trend="+8% this month"
          icon={<FiUsers />}
          bgColor="#f6ffed"
          iconColor="#52c41a"
        />
        <StatCard
          title="Applications"
          value={totalApplications}
          trend="+24% this month"
          icon={<FiFileText />}
          bgColor="#fff7e6"
          iconColor="#faad14"
        />
      </div>

      {/* CHARTS GRID */}
      <div className={styles.chartsGrid}>
        <RoleDistributionChart totalUsers={totalUsers} />
        <JobCategoriesChart />
        <GrowthChart />
      </div>
    </div>
  );
};

export default StatisticalReport;
