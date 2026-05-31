import React, {
  useEffect,
  useState,
} from "react";

import styles from "./AppliedJob.module.css";

import ViewDetailsAppliedJobsModal from "./ViewDetailsAppliedJobsModal/ViewDetailsAppliedJobsModal";

import applicationApi from "../../../../service/applicationApi";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState<any>(null);

  const fetchApplications =
    async () => {
      try {
        setLoading(true);

        const applications =
          await applicationApi.getMyApplications();

        const mappedJobs =
          applications.map(
            (app: any) => ({
              id: app.id,
              title:
                app.job?.title,
              company:
                app.job?.company
                  ?.name,
              appliedDate:
                app.appliedAt,
              status:
                app.status,

              // giữ nguyên object để modal dùng
              application: app,
            })
          );

        setJobs(mappedJobs);
      } catch (error) {
        console.error(
          "Fetch applications failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusClass = (
    status: string
  ) => {
    switch (
      status?.toUpperCase()
    ) {
      case "APPROVED":
        return styles.accepted;

      case "REJECTED":
        return styles.rejected;

      case "INTERVIEW":
        return styles.interview;

      default:
        return styles.pending;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>
          Applied Jobs
        </h2>

        <span
          className={styles.jobCount}
        >
          {jobs.length} applications
        </span>
      </div>

      <p className={styles.subtitle}>
        Track your application
        status and progress.
      </p>

      {loading ? (
        <div>
          Loading applications...
        </div>
      ) : jobs.length > 0 ? (
        <div
          className={
            styles.tableWrapper
          }
        >
          <table
            className={
              styles.jobTable
            }
          >
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>
                  Date Applied
                </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <strong>
                      {job.title}
                    </strong>
                  </td>

                  <td>
                    {job.company}
                  </td>

                  <td>
                    {new Date(
                      job.appliedDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className={
                        styles.viewBtn
                      }
                      onClick={() =>
                        setSelectedJob(
                          job.application
                        )
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          No applications yet
        </div>
      )}

      <ViewDetailsAppliedJobsModal
        isOpen={!!selectedJob}
        onClose={() =>
          setSelectedJob(null)
        }
        job={selectedJob}
      />
    </div>
  );
}