import React, { useState, useEffect, useRef } from "react";
import type {
  Application,
  ApplicationStatus,
  RecruitmentInfo,
} from "../../types/application.types";

import CreateInterviewModal from "../CreateInterviewModal/CreateInterviewModal";
import SendInviteEmailModal from "../SendInviteEmailModal/SendInviteEmailModal";
import styles from "./ApplicationRow.module.css";
import { FiMoreHorizontal, FiFileText, FiUser, FiCalendar, FiMail } from "react-icons/fi"; // Added modern telemetry icons

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
  const [openInterviewModal, setOpenInterviewModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenCV = () => {
    if (item.cvUrl) {
      window.open(item.cvUrl, "_blank");
    }
  };

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleAction = (cb: () => void) => {
    cb();
    setOpenMenu(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date helper fallback if needed
  const displayDate = item.appliedDate || "May 22, 2026";

  return (
    <>
      <tr className={styles.rowInteract}>
        {/* App ID */}
        <td className={styles.techIdCell}>#{item.id}</td>

        {/* Candidate Stacked Info Block */}
        <td className={styles.candidateCell}>
          <div className={styles.primaryText}>{item.candidateName}</div>
          <div className={styles.secondaryText}>{item.recruitment?.email}</div>
        </td>

        {/* Target Position */}
        <td className={styles.jobCell}>
          <div className={styles.jobTitleText}>{item.jobTitle}</div>
        </td>

        {/* Applied Date */}
        <td className={styles.dateCell}>{displayDate}</td>

        {/* Pipeline Status Badge */}
        <td>
          <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}>
            {item.status}
          </span>
        </td>

        {/* Status Native Stage Editor */}
        <td>
          <select
            className={styles.stageSelect}
            value={item.status}
            onChange={(e) => onUpdateStatus(item.id, e.target.value as ApplicationStatus)}
          >
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
          </select>
        </td>

        {/* Operational Context Actions Dropdown Menu */}
        <td className={styles.actionCell}>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              className={styles.moreActionBtn}
              onClick={handleToggleMenu}
              aria-label="Toggle action menu"
              type="button"
            >
              <FiMoreHorizontal />
            </button>

            {openMenu && (
              <div className={styles.dropdownMenu}>
                <button type="button" onClick={() => handleAction(handleOpenCV)}>
                  <FiFileText className={styles.menuIcon} /> View CV
                </button>

                <button type="button" onClick={() => handleAction(() => onViewProfile(item.recruitment))}>
                  <FiUser className={styles.menuIcon} /> View Profile
                </button>

                <button type="button" onClick={() => handleAction(() => setOpenInterviewModal(true))}>
                  <FiCalendar className={styles.menuIcon} /> Schedule Interview
                </button>

                <button type="button" onClick={() => handleAction(() => setOpenEmailModal(true))}>
                  <FiMail className={styles.menuIcon} /> Send Invite Email
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>

      {/* INTERVIEW SYSTEM MODAL ENGINE */}
      <CreateInterviewModal
        open={openInterviewModal}
        data={item}
        onClose={() => setOpenInterviewModal(false)}
        onSave={(payload) => {
          onCreateInterview(item);
          console.log("Interview Manifest Registered:", payload);
        }}
      />

      {/* EMAIL TELEMETRY OUTBOUND MODAL */}
      <SendInviteEmailModal
        open={openEmailModal}
        data={item}
        onClose={() => setOpenEmailModal(false)}
        onSend={(payload) => {
          onSendInviteEmail(item);
          console.log("Outbound Email Stream Dispatched:", payload);
        }}
      />
    </>
  );
}