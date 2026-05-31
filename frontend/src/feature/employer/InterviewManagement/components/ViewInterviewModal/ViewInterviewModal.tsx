import styles from "./ViewInterviewModal.module.css";
import Modal from "../BaseModal/Modal";

import type { Interview } from "../../types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Interview | null;
};

// ======================
// SAFE FORMATTERS
// ======================
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};

const formatTime = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ViewInterviewModal({
  open,
  onClose,
  data,
}: Props) {
  // ======================
  // SAFE ACCESS (AVOID CRASH)
  // ======================
  const firstName = data?.application?.user?.firstName ?? "";
  const lastName = data?.application?.user?.lastName ?? "";

  const candidateName = `${firstName} ${lastName}`.trim() || "-";

  const email = data?.application?.user?.email ?? "-";
  const jobTitle = data?.application?.job?.title ?? "-";

  const location = data?.location ?? "-";
  const status = data?.status ?? "-";
  const result = data?.result ?? "-";
  const note = data?.note ?? "-";

  return (
    <Modal open={open} onClose={onClose} title="Interview Details">
      {/* NO return null → keep modal stable */}

      <div className={styles.container}>
        {/* BASIC INFO */}
        <div className={styles.sectionTitle}>Basic Information</div>
        <div className={styles.grid}>
          <InfoItem label="Candidate Name" value={candidateName} />
          <InfoItem label="Email" value={email} />
          <InfoItem label="Job Title" value={jobTitle} />
        </div>

        {/* SCHEDULE */}
        <div className={styles.sectionTitle}>Schedule</div>
        <div className={styles.grid}>
          <InfoItem
            label="Date"
            value={formatDate(data?.scheduleTime)}
          />
          <InfoItem
            label="Time"
            value={formatTime(data?.scheduleTime)}
          />
          <InfoItem label="Location" value={location} />
        </div>

        {/* STATUS */}
        <div className={styles.sectionTitle}>Status</div>
        <div className={styles.grid}>
          <InfoItem label="Status" value={status} />
          <InfoItem label="Result" value={result} />
        </div>

        {/* NOTE */}
        <div className={styles.sectionTitle}>Note</div>
        <div className={styles.grid}>
          <InfoItem label="Note" value={note} />
        </div>
      </div>
    </Modal>
  );
}

// ======================
// REUSABLE COMPONENT
// ======================
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {value ?? "-"}
      </div>
    </div>
  );
};