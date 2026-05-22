import React, { useState } from "react";
import styles from "./dashboardPage.module.css";

// ── TYPES DEFINITIONS ──
interface StatItem {
  id: number;
  label: string;
  value: string;
  change: string;
  trend: "up" | "neutral" | "none" | "email";
  subDetails?: { label: string; value: string }[]; // Serves Email detail view breakdown
}

interface JobItem {
  id: string;
  title: string;
  department: string;
  applicants: number;
  status: "Urgent" | "Active" | "Closed";
  deadline: string;
  recruiter: string;
}

interface ApplicantItem {
  id: string;
  name: string;
  currentRole: string;
  targetJob: string;
  date: string;
  status: "Review" | "Interview" | "Offered";
}

// ── MOCK DATA ──
const STATS_DATA: StatItem[] = [
  { id: 1, label: "Total Open Positions", value: "24", change: "+4 this week", trend: "up" },
  { id: 2, label: "New Internal Applicants", value: "142", change: "+12 today", trend: "up" },
  { id: 3, label: "Interviews In Progress", value: "18", change: "6 scheduled today", trend: "neutral" },
  {
    id: 4,
    label: "Notification Emails Sent",
    value: "1,240",
    change: "Total this month",
    trend: "email",
    subDetails: [
      { label: "Today", value: "45" },
      { label: "This week", value: "320" }
    ]
  },
];

const INITIAL_JOBS: JobItem[] = [
  { id: "J01", title: "Senior Fullstack Engineer (React/NodeJS)", department: "Tech Center", applicants: 12, status: "Urgent", deadline: "30/05/2026", recruiter: "Alex Tran" },
  { id: "J02", title: "AI/ML Research Scientist", department: "Data Innovation", applicants: 8, status: "Active", deadline: "15/06/2026", recruiter: "Leo Minh" },
  { id: "J03", title: "Cloud DevOps Architect", department: "Infrastructure", applicants: 5, status: "Active", deadline: "20/06/2026", recruiter: "Alex Tran" },
  { id: "J04", title: "Product Manager - Internal Tool", department: "Product Team", applicants: 14, status: "Closed", deadline: "10/05/2026", recruiter: "Sarah Pham" },
  { id: "J05", title: "QA Automation Lead", department: "Tech Center", applicants: 9, status: "Active", deadline: "05/06/2026", recruiter: "Leo Minh" },
];

const RECENT_APPLICANTS: ApplicantItem[] = [
  { id: "A01", name: "Kevin Nguyen", currentRole: "Software Engineer (Lv2)", targetJob: "Senior Fullstack Engineer", date: "Today", status: "Review" },
  { id: "A02", name: "Chloe Tran", currentRole: "Data Analyst", targetJob: "AI/ML Research Scientist", date: "Yesterday", status: "Interview" },
  { id: "A03", name: "Marcus Le", currentRole: "DevOps Engineer", targetJob: "Cloud DevOps Architect", date: "2 days ago", status: "Offered" },
];

const DashboardPage = () => {
  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Search and filter logic execution for job monitoring
  const handleSearchAndFilter = (text: string, status: string) => {
    let filtered = INITIAL_JOBS;
    if (status !== "All") {
      filtered = filtered.filter(job => job.status === status);
    }
    if (text.trim() !== "") {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(text.toLowerCase()) ||
        job.department.toLowerCase().includes(text.toLowerCase())
      );
    }
    setJobs(filtered);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* ── HEADER SECTION ── */}
      <header className={styles.headerSection}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.pageTitle}>Internal Recruitment Portal</h1>
          <p className={styles.pageSubtitle}>Administrative workspace to coordinate career opportunities and automated notification streams.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryBtn} type="button">Export Report</button>
          <button className={styles.primaryBtn} type="button">+ Create Position</button>
        </div>
      </header>

      {/* ── STATISTICS CARDS (WITH EMAIL INTEGRATION) ── */}
      <section className={styles.statsGrid} aria-label="Overview Statistics">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className={`${styles.statCard} ${stat.trend === "email" ? styles.emailCard : ""}`}>
            <span className={styles.statLabel}>{stat.label}</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>{stat.value}</span>
              {stat.trend === "up" && <span className={`${styles.badge} ${styles.badgeSuccess}`}>{stat.change}</span>}
              {stat.trend === "neutral" && <span className={`${styles.badge} ${styles.badgeInfo}`}>{stat.change}</span>}
              {stat.trend === "email" && <span className={styles.emailTotalBadge}>{stat.change}</span>}
            </div>

            {/* Email metric details display container */}
            {stat.subDetails && (
              <div className={styles.emailBreakdown}>
                {stat.subDetails.map((detail, idx) => (
                  <div key={idx} className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>{detail.label}</span>
                    <span className={styles.breakdownValue}>{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.cardGlowEffect}></div>
          </div>
        ))}
      </section>

      {/* ── MAIN LAYOUT MANAGEMENT WORKSPACE ── */}
      <div className={styles.mainLayout}>

        {/* LEFT COLUMN: ADVANCED JOB MANAGEMENT WORKSPACE */}
        <section className={styles.contentCard}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleBlock}>
              <h2 className={styles.cardTitle}>Job Openings Desk</h2>
              <span className={styles.jobsCount}>({jobs.length} active positions)</span>
            </div>

            {/* Quick search and control layout bar */}
            <div className={styles.filterBar}>
              <input
                type="text"
                placeholder="Search titles, departments..."
                className={styles.searchFilterInput}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearchAndFilter(e.target.value, statusFilter);
                }}
              />
              <select
                className={styles.statusSelect}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  handleSearchAndFilter(searchTerm, e.target.value);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Urgent">Urgent</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Position Title</th>
                  <th>Department</th>
                  <th>Applicants</th>
                  <th>Deadline</th>
                  <th>Recruiter</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job.id} className={styles.tableRowInteract}>
                      <td className={styles.techIdCell}>{job.id}</td>
                      <td className={styles.jobTitleCell}>{job.title}</td>
                      <td>{job.department}</td>
                      <td>
                        <span className={styles.applicantsHighlight}>{job.applicants}</span> profiles
                      </td>
                      <td className={styles.dateCell}>{job.deadline}</td>
                      <td className={styles.recruiterCell}>{job.recruiter}</td>
                      <td>
                        <span className={`${styles.statusDot} ${
                          job.status === "Urgent" ? styles.dotUrgent : job.status === "Active" ? styles.dotActive : styles.dotClosed
                        }`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className={styles.emptyTableNotify}>
                      No matching job opening data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* RIGHT COLUMN: RECENT DAILY APPLICANT TELEMETRY */}
        <section className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>New Internal Applicants</h2>
            <button className={styles.textLink} type="button">Review All</button>
          </div>
          <div className={styles.applicantList}>
            {RECENT_APPLICANTS.map((applicant) => (
              <div key={applicant.id} className={styles.applicantItem}>
                <div className={styles.applicantInfo}>
                  <p className={styles.applicantName}>{applicant.name}</p>
                  <p className={styles.applicantMeta}>
                    {applicant.currentRole} ➔ <span className={styles.targetJobText}>{applicant.targetJob}</span>
                  </p>
                </div>
                <div className={styles.applicantStatusBlock}>
                  <span className={styles.applicantTime}>{applicant.date}</span>
                  <span className={`${styles.miniBadge} ${
                    applicant.status === "Review" ? styles.badgeReview : applicant.status === "Interview" ? styles.badgeInterview : styles.badgeOffered
                  }`}>
                    {applicant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;