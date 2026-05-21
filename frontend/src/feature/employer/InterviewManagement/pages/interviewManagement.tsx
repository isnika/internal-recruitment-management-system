import { useMemo, useState } from "react";
import styles from "./InterviewManagement.module.css";

import { mockData } from "../mockData/mockData";
import type { InterviewStatus } from "../types/types";

import InterviewHeader from "../components/InterviewHeader/InterviewHeader";
import InterviewTable from "../components/InterviewTable/InterviewTable";

import ViewInterviewModal from "../components/ViewInterviewModal/ViewInterviewModal";
import RescheduleModal from "../components/RescheduleModal/RescheduleModal";
import UpdateResultModal from "../components/UpdateResultModal/UpdateResultModal";

import useInterviewModals from "../hooks/useInterviewModals";

export default function InterviewManagement() {
  const [statusFilter, setStatusFilter] =
    useState<InterviewStatus | "ALL">("ALL");

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

  const filteredData = useMemo(() => {
    if (statusFilter === "ALL") return mockData;
    return mockData.filter((i) => i.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className={styles.wrapper}>
      <InterviewHeader
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

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
      />

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
        onSave={(d) => console.log("update:", d)}
      />
    </div>
  );
}