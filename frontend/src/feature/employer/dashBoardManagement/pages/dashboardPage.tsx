import React, { useEffect, useMemo, useState } from "react";
import styles from "./dashboardPage.module.css";

import reportApi, {
  type OverviewReport,
  type PipelineReport,
  type RecruiterReport,
  type JobReport
} from "../../../../service/reportApi";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] =
    useState<OverviewReport | null>(null);

  const [pipeline, setPipeline] =
    useState<PipelineReport | null>(null);

  const [jobs, setJobs] = useState<JobReport[]>([]);

  const [recruiters, setRecruiters] = useState<
    RecruiterReport[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          overviewData,
          pipelineData,
          jobsData,
          recruiterData,
        ] = await Promise.all([
          reportApi.getOverview(),
          reportApi.getPipeline(),
          reportApi.getJobs(),
          reportApi.getRecruiters(),
        ]);

        setOverview(overviewData);
        setPipeline(pipelineData);
        setJobs(jobsData);
        setRecruiters(recruiterData);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    if (!overview) return [];

    return [
      {
        id: 1,
        label: "Open Jobs",
        value: overview.totalOpenJobs,
      },
      {
        id: 2,
        label: "Applications",
        value: overview.totalApplications,
      },
      {
        id: 3,
        label: "Candidates",
        value: overview.totalCandidates,
      },
      {
        id: 4,
        label: "Successful Hires",
        value: overview.totalSuccessfulHires,
      },
    ];
  }, [overview]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.jobTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}> {/* Fixed: Changed from self-closing to standard opening tag */}
      <header className={styles.headerSection}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.pageTitle}>
            Recruitment Dashboard
          </h1>

          <p className={styles.pageSubtitle}>
            Recruitment analytics and hiring performance overview.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryBtn}
            type="button"
          >
            Export Report
          </button>
        </div>
      </header>

      {/* KPI CARDS */}
      <section
        className={styles.statsGrid}
        aria-label="Overview Statistics"
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={styles.statCard}
          >
            <span className={styles.statLabel}>
              {stat.label}
            </span>

            <div className={styles.statValueRow}>
              <span className={styles.statValue}>
                {stat.value}
              </span>
            </div>

            <div className={styles.cardGlowEffect}></div>
          </div>
        ))}
      </section>

      <div className={styles.mainLayout}>
        {/* JOB REPORT TABLE */}
        <section className={styles.contentCard}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleBlock}>
              <h2 className={styles.cardTitle}>
                Job Performance
              </h2>

              <span className={styles.jobsCount}>
                ({filteredJobs.length} jobs)
              </span>
            </div>

            <div className={styles.filterBar}>
              <input
                type="text"
                placeholder="Search job title..."
                className={styles.searchFilterInput}
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Job Title</th>
                  <th>Applied</th>
                  <th>CV Passed</th>
                  <th>Interviewed</th>
                  <th>Offered</th>
                  <th>Hired</th>
                  <th>Avg Days</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr
                      key={job.jobId}
                      className={
                        styles.tableRowInteract
                      }
                    >
                      <td>{job.jobId}</td>

                      <td
                        className={
                          styles.jobTitleCell
                        }
                      >
                        {job.jobTitle}
                      </td>

                      <td>{job.totalApplied}</td>

                      <td>{job.totalCvPassed}</td>

                      <td>{job.totalInterviewed}</td>

                      <td>{job.totalOffered}</td>

                      <td>{job.totalHired}</td>

                      <td>
                        {job.avgTimeToHireDays}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className={
                        styles.emptyTableNotify
                      }
                    >
                      No matching jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <section className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              Recruitment Pipeline
            </h2>
          </div>

          <div className={styles.applicantList}>
            <div className={styles.applicantItem}>
              <span>Applied</span>
              <strong>
                {pipeline?.applied ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Screening</span>
              <strong>
                {pipeline?.screening ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Interview</span>
              <strong>
                {pipeline?.interview ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Test</span>
              <strong>
                {pipeline?.test ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Offer</span>
              <strong>
                {pipeline?.offer ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Hired</span>
              <strong>
                {pipeline?.hired ?? 0}
              </strong>
            </div>

            <div className={styles.applicantItem}>
              <span>Rejected</span>
              <strong>
                {pipeline?.rejected ?? 0}
              </strong>
            </div>
          </div>

          <div
            className={styles.cardHeader}
            style={{ marginTop: 24 }}
          >
            <h2 className={styles.cardTitle}>
              Recruiter Performance
            </h2>
          </div>

          <div className={styles.applicantList}>
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.recruiterId}
                className={styles.applicantItem}
              >
                <div>
                  <p className={styles.applicantName}>
                    {recruiter.recruiterName}
                  </p>

                  <p className={styles.applicantMeta}>
                    Jobs Managed:{" "}
                    {recruiter.totalJobsManaged}
                  </p>

                  <p className={styles.applicantMeta}>
                    Candidates:{" "}
                    {
                      recruiter.totalCandidatesHandled
                    }
                  </p>
                </div>

                <div
                  className={
                    styles.applicantStatusBlock
                  }
                >
                  <strong>
                    {recruiter.totalHired} Hires
                  </strong>

                  <span
                    className={styles.miniBadge}
                  >
                    {recruiter.successRate.toFixed(
                      1
                    )}
                    %
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