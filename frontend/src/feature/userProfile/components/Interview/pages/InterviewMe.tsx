import React, { useEffect, useState } from "react";
import styles from "./InterviewMe.module.css";

import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";

import interviewApi, { type
  Interview,
} from "../../../../../service/interviewApi";

export default function InterviewMe() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] =
    useState<string>("ALL");

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setLoading(true);

      const res = await interviewApi.getMyInterviews();

      setInterviews(res.data.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await interviewApi.accept(id);

      await loadInterviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await interviewApi.reject(id);

      await loadInterviews();
    } catch (error) {
      console.error(error);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span
            className={`${styles.badge} ${styles.badgeAccepted}`}
          >
            <FiCheckCircle />
            Accepted
          </span>
        );

      case "REJECTED":
        return (
          <span
            className={`${styles.badge} ${styles.badgeRejected}`}
          >
            <FiXCircle />
            Rejected
          </span>
        );

      default:
        return (
          <span
            className={`${styles.badge} ${styles.badgePending}`}
          >
            <FiAlertCircle />
            Pending
          </span>
        );
    }
  };

  const filteredInterviews = interviews.filter(
    (item) => {
      if (filterStatus === "ALL") return true;

      return item.status === filterStatus;
    }
  );

  if (loading) {
    return (
      <div className={styles.container}>
        Loading interviews...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>
        My Interviews
      </h2>

      <p className={styles.subtitle}>
        Manage and track your interviews.
      </p>

      <div className={styles.tabsContainer}>
        {[
          "ALL",
          "PENDING",
          "ACCEPTED",
          "REJECTED",
        ].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${
              filterStatus === tab
                ? styles.activeTab
                : ""
            }`}
            onClick={() => setFilterStatus(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.interviewList}>
        {filteredInterviews.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No interviews found.</p>
          </div>
        ) : (
          filteredInterviews.map((interview) => {
            const date = new Date(
              interview.scheduleTime
            );

            const isOnline =
              interview.location.startsWith(
                "http"
              ) ||
              interview.location.includes(
                "meet.google"
              ) ||
              interview.location.includes(
                "zoom"
              );

            return (
              <div
                key={interview.id}
                className={styles.interviewCard}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>
                      {interview.jobTitle}
                    </h3>

                    <p
                      className={
                        styles.companyName
                      }
                    >
                      {interview.companyName}
                    </p>
                  </div>

                  {renderStatusBadge(
                    interview.status
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div
                    className={styles.metaGrid}
                  >
                    <div
                      className={styles.metaItem}
                    >
                      <FiCalendar
                        className={
                          styles.icon
                        }
                      />

                      <span>
                        Date:
                        <strong>
                          {" "}
                          {date.toLocaleDateString(
                            "vi-VN"
                          )}
                        </strong>
                      </span>
                    </div>

                    <div
                      className={styles.metaItem}
                    >
                      <FiClock
                        className={
                          styles.icon
                        }
                      />

                      <span>
                        Time:
                        <strong>
                          {" "}
                          {date.toLocaleTimeString(
                            "vi-VN",
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit",
                            }
                          )}
                        </strong>
                      </span>
                    </div>

                    <div
                      className={styles.metaItem}
                    >
                      {isOnline ? (
                        <FiVideo
                          className={
                            styles.iconOnline
                          }
                        />
                      ) : (
                        <FiMapPin
                          className={
                            styles.iconOffline
                          }
                        />
                      )}

                      <span>
                        Type:
                        <strong>
                          {" "}
                          {isOnline
                            ? "ONLINE"
                            : "OFFLINE"}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      styles.locationBlock
                    }
                  >
                    <span
                      className={
                        styles.locationLabel
                      }
                    >
                      Location / Link:
                    </span>

                    {isOnline &&
                    interview.status ===
                      "ACCEPTED" ? (
                      <a
                        href={
                          interview.location
                        }
                        target="_blank"
                        rel="noreferrer"
                        className={
                          styles.meetLink
                        }
                      >
                        Join Interview
                      </a>
                    ) : (
                      <span
                        className={
                          styles.locationText
                        }
                      >
                        {interview.location}
                      </span>
                    )}
                  </div>

                  {interview.note && (
                    <div
                      className={
                        styles.noteBox
                      }
                    >
                      <strong>
                        Note:
                      </strong>{" "}
                      {interview.note}
                    </div>
                  )}
                </div>

                {interview.status ===
                  "PENDING" && (
                  <div
                    className={
                      styles.cardActions
                    }
                  >
                    <button
                      className={
                        styles.rejectBtn
                      }
                      onClick={() =>
                        handleReject(
                          interview.id
                        )
                      }
                    >
                      <FiXCircle />
                      Reject
                    </button>

                    <button
                      className={
                        styles.acceptBtn
                      }
                      onClick={() =>
                        handleAccept(
                          interview.id
                        )
                      }
                    >
                      <FiCheckCircle />
                      Accept
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}