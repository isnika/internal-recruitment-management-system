import styles from "./ViewInterviewModal.module.css";
import Modal from "../BaseModal/Modal";

type InterviewData = {
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;

  jobTitle: string;
  interviewer: string;

  date: string;
  time: string;
  duration?: string;

  locationType?: "ONLINE" | "OFFLINE";
  location?: string;
  meetingLink?: string;

  status: "SCHEDULED" | "DONE" | "CANCELLED" | string;
  result?: "PASSED" | "FAILED" | "PENDING";

  feedback?: string;
  score?: number;

  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  notes?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: InterviewData | null;
};

const ViewInterviewModal = ({ open, onClose, data }: Props) => {
  if (!data) return null;

  const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      SCHEDULED: styles.scheduled,
      DONE: styles.done,
      CANCELLED: styles.cancelled,
    };
    return map[status] || "";
  };

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

  return (
    <Modal open={open} onClose={onClose} title="Interview Details">
      <div className={styles.container}>
        {/* ===== 1. BASIC INFO ===== */}
        <div className={styles.sectionTitle}>Basic Information</div>
        <div className={styles.grid}>
          <InfoItem label="Candidate Name" value={data.candidateName} />
          <InfoItem label="Email" value={data.candidateEmail} />
          <InfoItem label="Phone" value={data.candidatePhone} />
          <InfoItem label="Job Title" value={data.jobTitle} />
          <InfoItem label="Interviewer" value={data.interviewer} />
        </div>

        {/* ===== 2. SCHEDULE ===== */}
        <div className={styles.sectionTitle}>Schedule Information</div>
        <div className={styles.grid}>
          <InfoItem label="Date" value={data.date} />
          <InfoItem label="Time" value={data.time} />
          <InfoItem label="Duration" value={data.duration} />
          <InfoItem label="Type" value={data.locationType} />
          <InfoItem label="Location" value={data.location} />
          <InfoItem label="Meeting Link" value={data.meetingLink} />
        </div>

        {/* ===== 3. STATUS & RESULT ===== */}
        <div className={styles.sectionTitle}>Status & Result</div>
        <div className={styles.grid}>
          <InfoItem
            label="Status"
            value={
              <span
                className={`${styles.status} ${getStatusClass(data.status)}`}
              >
                {data.status}
              </span>
            }
          />
          <InfoItem label="Result" value={data.result} />
          <InfoItem label="Score" value={data.score} />
          <InfoItem label="Feedback" value={data.feedback} />
        </div>

        {/* ===== 4. METADATA ===== */}
        <div className={styles.sectionTitle}>Metadata</div>
        <div className={styles.grid}>
          <InfoItem label="Created At" value={data.createdAt} />
          <InfoItem label="Updated At" value={data.updatedAt} />
          <InfoItem label="Created By" value={data.createdBy} />
          <InfoItem label="Notes" value={data.notes} />
        </div>

        <div className={styles.footer}>
          Interview details are read-only.
        </div>
      </div>
    </Modal>
  );
};

export default ViewInterviewModal;