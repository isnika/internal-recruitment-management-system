import styles from "./ApplyManagement.module.css";

import Filters from "../components/Filters/Filters";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import CVModal from "../components/CVModal/CVModal";
import ProfileModal from "../components/ProfileModal/ProfileModal";

import { useApplications } from "../hooks/useApplications";
import { mockData } from "../mockData/mockData";

export default function ApplyManagement() {
  const {
    jobs,
    jobFilter,
    setJobFilter,
    statusFilter,
    setStatusFilter,
    filteredData,
    updateStatus,
    selectedCV,
    setSelectedCV,
    selectedProfile,
    setSelectedProfile,
  } = useApplications(mockData);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Applications / Candidates
      </h2>

      {/* STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <span className={styles.statsLabel}>
            Total Applications
          </span>

          <h3 className={styles.statsValue}>
            {filteredData.length}
          </h3>
        </div>
      </div>

      <Filters
        jobFilter={jobFilter}
        setJobFilter={setJobFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        jobs={jobs}
      />

      <ApplicationTable
        data={filteredData}
        onViewCV={setSelectedCV}
        onViewProfile={setSelectedProfile}
        onUpdateStatus={updateStatus}
      />

      <CVModal
        url={selectedCV}
        onClose={() => setSelectedCV(null)}
      />

      <ProfileModal
        data={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}