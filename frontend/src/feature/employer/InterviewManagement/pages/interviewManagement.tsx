import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./InterviewManagement.module.css";

import type {
  Interview,
  InterviewStatus,
  InterviewResult,
} from "../types/types";

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
  // ======================
  // STATE
  // ======================
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
  // FETCH DATA (ADMIN)
  // ======================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await interviewApi.getAll();
      // axiosClient already unwraps response.data, so res IS the ApiResponse
      // We just need res.data to get the array
      const interviews = (res as any).data ?? [];

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
  // FILTER
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
      scheduled: data.filter((i) => i.status === "scheduled").length,
      in_progress: data.filter((i) => i.status === "in_progress").length,
      completed: data.filter((i) => i.status === "completed").length,
      cancelled: data.filter((i) => i.status === "cancelled").length,
      no_show: data.filter((i) => i.status === "no_show").length,
    };
  }, [data]);

  // ======================
  // UPDATE LOCAL STATE
  // ======================
  const updateInterview = (updated: Interview) => {
    setData((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );
  };

  // ======================
  // UPDATE STATUS
  // ======================
  const handleUpdateStatus = async (
    id: number,
    status: InterviewStatus
  ) => {
    try {
      const res = await interviewApi.updateStatus(id, status);
      const updated = (res as any).data;

      if (updated) updateInterview(updated);
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  // ======================
  // UPDATE RESULT
  // ======================
  const handleUpdateResult = async (body: {
    id: number;
    result: InterviewResult;
    note?: string;
  }) => {
    try {
      const res = await interviewApi.updateResult(body.id, {
        result: body.result,
        note: body.note,
      });

      const updated = (res as any).data;

      if (updated) updateInterview(updated);

      setOpenUpdate(false);
    } catch (err) {
      console.error("Update result failed:", err);
    }
  };

  // ======================
  // RESCHEDULE
  // ======================
  const handleReschedule = async (body: {
    id: number;
    scheduleTime: string;
  }) => {
    try {
      if (!selected) return;
      const res = await interviewApi.reschedule(
        body.id,
        body.scheduleTime,
        selected.location,
        selected.note
      );

      const updated = (res as any).data;

      if (updated) updateInterview(updated);

      setOpenReschedule(false);
      alert("Đã đổi lịch phỏng vấn thành công!");
    } catch (err) {
      console.error("Reschedule failed:", err);
      alert("Đổi lịch thất bại.");
    }
  };

  // ======================
  // RENDER
  // ======================
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
          <strong>{metrics.scheduled}</strong>
          <span>Scheduled</span>
        </div>

        <div className={styles.statsCard}>
          <strong>{metrics.in_progress}</strong>
          <span>In Progress</span>
        </div>

        <div className={styles.statsCard}>
          <FiCheckCircle />
          <strong>{metrics.completed}</strong>
          <span>Completed</span>
        </div>

        <div className={styles.statsCard}>
          <FiXCircle />
          <strong>{metrics.cancelled}</strong>
          <span>Cancelled</span>
        </div>

        <div className={styles.statsCard}>
          <strong>{metrics.no_show}</strong>
          <span>No Show</span>
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

            // ======================
            // STATUS FLOW ACTIONS
            // ======================
            onSchedule={(i) =>
              handleUpdateStatus(i.id, "scheduled")
            }
            onStart={(i) =>
              handleUpdateStatus(i.id, "in_progress")
            }
            onComplete={(i) =>
              handleUpdateStatus(i.id, "completed")
            }
            onCancel={(i) =>
              handleUpdateStatus(i.id, "cancelled")
            }
            onNoShow={(i) =>
              handleUpdateStatus(i.id, "no_show")
            }
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
        onSave={handleReschedule}
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