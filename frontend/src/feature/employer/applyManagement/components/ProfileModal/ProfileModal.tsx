import Modal from "../../../shared/BaseModal/Modal";
import type { RecruitmentInfo } from "../../types/application.types";

import styles from "./ProfileModal.module.css";

type Props = {
  data: RecruitmentInfo | null;
  onClose: () => void;
};

export default function ProfileModal({
  data,
  onClose,
}: Props) {
  if (!data) return null;

  return (
    <Modal
      open={!!data}
      title="Recruitment Information"
      onClose={onClose}
    >
      <div className={styles.infoGrid}>
        <Info label="First Name" value={data.firstName} />
        <Info label="Last Name" value={data.lastName} />
        <Info label="Gender" value={data.gender} />
        <Info label="Date of Birth" value={data.dob} />
        <Info label="Email" value={data.email} />
        <Info label="Phone Number" value={data.phone} />

        <Info
          label="Address"
          value={data.address}
          full
        />

        <Info
          label="Citizen ID"
          value={data.citizenId}
        />

        <Info
          label="Tax Number"
          value={data.taxNumber}
        />

        <Info
          label="Release Date"
          value={data.releaseDate}
        />

        <Info
          label="Social Network"
          value={data.socialLink}
          full
        />

        <Info
          label="Bank Account"
          value={data.bankAccount}
          full
        />

        <Info
          label="Self Introduction"
          value={data.selfIntroduction}
          full
        />

        <Info
          label="Job Title"
          value={data.jobTitle}
        />

        <Info
          label="Desired Salary"
          value={data.salary}
        />

        <Info
          label="Start Date"
          value={data.startDate}
        />

        <Info
          label="CV File"
          value={data.cvFile}
          full
        />
      </div>
    </Modal>
  );
}

type InfoProps = {
  label: string;
  value?: string;
  full?: boolean;
};

function Info({
  label,
  value,
  full,
}: InfoProps) {
  return (
    <div
      className={`${styles.infoItem} ${
        full ? styles.fullRow : ""
      }`}
    >
      <span className={styles.label}>
        {label}
      </span>

      <span className={styles.value}>
        {value || "-"}
      </span>
    </div>
  );
}