import { useState, useEffect, useRef } from "react";

import type {
  Application,
  ApplicationStatus,
  RecruitmentInfo,
} from "../../types/application.types";

import CreateInterviewModal from "../CreateInterviewModal/CreateInterviewModal";
import SendInviteEmailModal from "../SendInviteEmailModal/SendInviteEmailModal";

import styles from "./ApplicationRow.module.css";

type Props = {
  item: Application;

  onViewProfile: (data: RecruitmentInfo) => void;

  onUpdateStatus: (id: number, status: ApplicationStatus) => void;

  onCreateInterview: (application: Application) => void;

  onSendInviteEmail: (application: Application) => void;
};

export default function ApplicationRow({
  item,
  onViewProfile,
  onUpdateStatus,
  onCreateInterview,
  onSendInviteEmail,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  // MODAL STATES
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const handleOpenCV = () => {
    window.open(item.cvUrl, "_blank");
  };

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleAction = (cb: () => void) => {
    cb();
    setOpenMenu(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <tr className={styles.row}>
        <td className={styles.id}>{item.id}</td>

        <td className={styles.candidateName}>
          {item.candidateName}
        </td>

        <td className={styles.jobTitle}>
          {item.jobTitle}
        </td>

        <td className={styles.jobTitle}>
           {item.recruitment.email}

        </td>

        <td
          className={`${styles.status} ${
            styles[item.status.toLowerCase()]
          }`}
        >
          {item.status}
        </td>

        {/* STATUS UPDATE */}
        <td>
          <select
            className={styles.statusSelect}
            value={item.status}
            onChange={(e) =>
              onUpdateStatus(
                item.id,
                e.target.value as ApplicationStatus
              )
            }
          >
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="PASSED">Pass</option>
            <option value="FAILED">Fail</option>
          </select>
        </td>

        {/* ACTION DROPDOWN */}
        <td className={styles.actionCell}>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              className={styles.moreBtn}
              onClick={handleToggleMenu}
            >
              ⋯
            </button>

            {openMenu && (
              <div className={styles.dropdownMenu}>
                <button
                  onClick={() => handleAction(handleOpenCV)}
                >
                  View CV
                </button>

                <button
                  onClick={() =>
                    handleAction(() =>
                      onViewProfile(item.recruitment)
                    )
                  }
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    setOpenInterviewModal(true);
                    setOpenMenu(false);
                  }}
                >
                  Create interview schedule
                </button>

                <button
                  onClick={() => {
                    setOpenEmailModal(true);
                    setOpenMenu(false);
                  }}
                >
                  Send email invite
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* INTERVIEW MODAL */}
      <CreateInterviewModal
        open={openInterviewModal}
        data={item}
        onClose={() => setOpenInterviewModal(false)}
        onSave={(payload) => {
          onCreateInterview(item);
          console.log("Interview:", payload);
        }}
      />

      {/* EMAIL MODAL */}
      <SendInviteEmailModal
        open={openEmailModal}
        data={item}
        onClose={() => setOpenEmailModal(false)}
        onSend={(payload) => {
          onSendInviteEmail(item);
          console.log("Email:", payload);
        }}
      />
    </>
  );
}