import React from "react";

import styles from "../CreateJobModal.module.css";

import {
  FiUploadCloud,
  FiPauseCircle,
  FiXCircle,
  FiFileText,
} from "react-icons/fi";

import type { JobStatus } from "../../../../../../types/job";

// =========================
// TYPES
// =========================
interface StatusTabProps {
  formData: {
    status: JobStatus;
  };

  handleChange: (
    field: "status",
    value: JobStatus
  ) => void;
}

interface StatusOption {
  id: JobStatus;

  label: string;

  description: string;

  icon: React.ElementType;

  className: string;

  iconStyle: React.CSSProperties;
}

// =========================
// STATUS OPTIONS
// =========================
const STATUS_OPTIONS: StatusOption[] =
  [
    {
      id: "ACTIVE",

      label: "Active",

      description:
        "Visible publicly and accepting applications.",

      icon: FiUploadCloud,

      className:
        styles.statusActive,

      iconStyle: {
        background:
          "rgba(34,197,94,0.12)",

        color: "#16a34a",
      },
    },

    {
      id: "PAUSED",

      label: "Paused",

      description:
        "Temporarily hidden from candidates.",

      icon: FiPauseCircle,

      className:
        styles.statusPaused,

      iconStyle: {
        background:
          "rgba(245,158,11,0.12)",

        color: "#f59e0b",
      },
    },

    {
      id: "CLOSED",

      label: "Closed",

      description:
        "No longer accepting applications.",

      icon: FiXCircle,

      className:
        styles.statusClosed,

      iconStyle: {
        background:
          "rgba(239,68,68,0.12)",

        color: "#ef4444",
      },
    },

    {
      id: "DRAFT",

      label: "Draft",

      description:
        "Saved privately and not visible publicly.",

      icon: FiFileText,

      className:
        styles.statusDraft,

      iconStyle: {
        background:
          "rgba(148,163,184,0.12)",

        color: "#64748b",
      },
    },
  ];

const StatusTab: React.FC<
  StatusTabProps
> = ({
  formData,
  handleChange,
}) => {
  const currentStatus =
    formData.status || "DRAFT";

  const selectedOption =
    STATUS_OPTIONS.find(
      (option) =>
        option.id === currentStatus
    ) || STATUS_OPTIONS[3];

  return (
    <div className={styles.statusWrapper}>
      {/* CURRENT STATUS */}
      <div
        className={`${styles.currentStatusBadge} ${selectedOption.className}`}
      >
        Current Status:{" "}
        {selectedOption.label}
      </div>

      {/* TITLE */}
      <div className={styles.statusHeader}>
        <h3>Select Job Status</h3>

        <p>
          Choose how this job post
          should behave on the
          platform.
        </p>
      </div>

      {/* STATUS LIST */}
      <div
        className={
          styles.statusContainer
        }
      >
        {STATUS_OPTIONS.map(
          (option) => {
            const isActive =
              currentStatus ===
              option.id;

            const Icon =
              option.icon;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  handleChange(
                    "status",
                    option.id
                  )
                }
                className={`${styles.statusCard} ${
                  isActive
                    ? styles.statusCardActive
                    : ""
                }`}
              >
                {/* LEFT */}
                <div
                  className={
                    styles.statusInfo
                  }
                >
                  {/* ICON */}
                  <div
                    className={
                      styles.statusIcon
                    }
                    style={
                      option.iconStyle
                    }
                  >
                    <Icon />
                  </div>

                  {/* CONTENT */}
                  <div
                    className={
                      styles.statusContent
                    }
                  >
                    <div
                      className={
                        styles.statusTitle
                      }
                    >
                      {option.label}
                    </div>

                    <div
                      className={
                        styles.statusDesc
                      }
                    >
                      {
                        option.description
                      }
                    </div>
                  </div>
                </div>

                {/* RADIO */}
                <div
                  className={`${styles.radioCircle} ${
                    isActive
                      ? styles.radioCircleActive
                      : ""
                  }`}
                >
                  {isActive && (
                    <div
                      className={
                        styles.radioDot
                      }
                    />
                  )}
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default React.memo(
  StatusTab
);