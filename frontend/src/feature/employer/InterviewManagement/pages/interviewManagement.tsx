import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./InterviewManagement.module.css";

import type { Interview, InterviewStatus } from "../types/types";
import interviewApi from "../../../../service/interviewApi";

import InterviewHeader from "../components/InterviewHeader/InterviewHeader";
import InterviewTable from "../components/InterviewTable/InterviewTable";

import ViewInterviewModal from "../components/ViewInterviewModal/ViewInterviewModal";
import RescheduleModal from "../components/RescheduleModal/RescheduleModal";
import UpdateResultModal from "../components/UpdateResultModal/UpdateResultModal";

import useInterviewModals from "../hooks/useInterviewModals";

import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function InterviewManagement() {
  const [statusFilter, setStatusFilter] =
    useState<InterviewStatus | "ALL">("ALL");

  const [data, setData] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    selected,
    setSelected,
    openView,
    setOpenView,
    openReschedule,
    setOpenReschedule,
    openUpdate,
    setOpenUpdate,
  } = useInterviewModals();

  // ======================
  // LOAD DATA
  // ======================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await interviewApi.getMyInterviews();

      // ⚠️ FIX: backend trả ApiResponse<Interview[]>
      const interviews = res.data?.data ?? [];

      setData(interviews);
    } catch (err) {
      console.error("Failed to load interviews:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ======================
  // FILTER DATA
  // ======================
  const filteredData = useMemo(() => {
    if (statusFilter === "ALL") return data;
    return data.filter((i) => i.status === statusFilter);
  }, [statusFilter, data]);

  // ======================
  // METRICS
  // ======================
  const metrics = useMemo(() => {
    return {
      total: data.length,
      pending: data.filter((i) => i.status === "PENDING").length,
      accepted: data.filter((i) => i.status === "ACCEPTED").length,
      rejected: data.filter((i) => i.status === "REJECTED").length,
    };
  }, [data]);

  // ======================
  // HELPERS (safe update)
  // ======================
  const updateInterview = (updated: Interview) => {
    setData((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );
  };

  // ======================
  // ACTIONS
  // ======================
  const handleAccept = async (id: number) => {
    try {
      const res = await interviewApi.accept(id);
      const updated = res.data?.data;
      if (updated) updateInterview(updated);
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await interviewApi.reject(id);
      const updated = res.data?.data;
      if (updated) updateInterview(updated);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const handleUpdateResult = async (body: {
    id: number;
    result: string;
    note?: string;
  }) => {
    try {
      const res = await interviewApi.updateResult(body.id, {
        result: body.result,
        note: body.note,
      });

      const updated = res.data?.data;
      if (updated) updateInterview(updated);

      setOpenUpdate(false);
    } catch (err) {
      console.error("Update result failed:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.title}>Interview Management</h1>
          <p className={styles.subtitle}>
            Manage interview schedules, status updates, and evaluation results.
          </p>
        </div>

        <div className={styles.activeFilterBadge}>
          <span>
            View Mode:{" "}
            <strong>{statusFilter === "ALL" ? "All" : statusFilter}</strong>
          </span>
        </div>
      </header>

      {/* METRICS */}
      <div className={styles.statsGrid}>
        <div className={styles.statsCard}>
          <FiCalendar />
          <strong>{metrics.total}</strong>
          <span>Total</span>
        </div>

        <div className={styles.statsCard}>
          <FiClock />
          <strong>{metrics.pending}</strong>
          <span>Pending</span>
        </div>

        <div className={styles.statsCard}>
          <FiCheckCircle />
          <strong>{metrics.accepted}</strong>
          <span>Accepted</span>
        </div>

        <div className={styles.statsCard}>
          <FiXCircle />
          <strong>{metrics.rejected}</strong>
          <span>Rejected</span>
        </div>
      </div>

      {/* FILTER */}
      <div className={styles.filterSectionCard}>
        <InterviewHeader
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className={styles.gridSummaryText}>
          Showing <strong>{filteredData.length}</strong> /{" "}
          <strong>{data.length}</strong>
        </div>
      </div>

      {/* TABLE */}
      <main className={styles.tableDataContainer}>
        {loading ? (
          <p>Loading interviews...</p>
        ) : (
          <InterviewTable
            data={filteredData}
            onView={(i) => {
              setSelected(i);
              setOpenView(true);
            }}
            onReschedule={(i) => {
              setSelected(i);
              setOpenReschedule(true);
            }}
            onUpdate={(i) => {
              setSelected(i);
              setOpenUpdate(true);
            }}
            onAccept={(i) => handleAccept(i.id)}
            onReject={(i) => handleReject(i.id)}
          />
        )}
      </main>

      {/* MODALS */}
      <ViewInterviewModal
        open={openView}
        onClose={() => setOpenView(false)}
        data={selected}
      />

      <RescheduleModal
        open={openReschedule}
        onClose={() => setOpenReschedule(false)}
        data={selected}
        onSave={(d) => console.log("reschedule:", d)}
      />

      <UpdateResultModal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        data={selected}
        onSave={handleUpdateResult}
      />
    </div>
  );
}