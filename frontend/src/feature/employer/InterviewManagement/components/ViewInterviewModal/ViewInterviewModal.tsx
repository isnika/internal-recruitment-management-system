import styles from "./ViewInterviewModal.module.css";
import Modal from "../BaseModal/Modal";

import type { Interview } from "../../types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Interview | null;
};

export default function ViewInterviewModal({
  open,
  onClose,
  data,
}: Props) {
  if (!data) return null;

  const candidateName =
    `${data.application.user.firstName} ${data.application.user.lastName}`;

  const formatDate = new Date(data.scheduleTime).toLocaleDateString();
  const formatTime = new Date(data.scheduleTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal open={open} onClose={onClose} title="Interview Details">
      <div className={styles.container}>
        {/* BASIC INFO */}
        <div className={styles.sectionTitle}>Basic Information</div>
        <div className={styles.grid}>
          <InfoItem label="Candidate Name" value={candidateName} />
          <InfoItem label="Email" value={data.application.user.email} />
          <InfoItem label="Job Title" value={data.application.job.title} />
        </div>

        {/* SCHEDULE */}
        <div className={styles.sectionTitle}>Schedule</div>
        <div className={styles.grid}>
          <InfoItem label="Date" value={formatDate} />
          <InfoItem label="Time" value={formatTime} />
          <InfoItem label="Location" value={data.location} />
        </div>

        {/* STATUS */}
        <div className={styles.sectionTitle}>Status</div>
        <div className={styles.grid}>
          <InfoItem label="Status" value={data.status} />
          <InfoItem label="Result" value={data.result || "-"} />
        </div>

        {/* NOTE */}
        <div className={styles.sectionTitle}>Note</div>
        <div className={styles.grid}>
          <InfoItem label="Note" value={data.note || "-"} />
        </div>
      </div>
    </Modal>
  );
}

// reuse helper
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className={styles.item}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value || "-"}</div>
  </div>
);