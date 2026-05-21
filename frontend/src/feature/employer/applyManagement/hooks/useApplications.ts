import { useMemo, useState } from "react";
import type {
  Application,
  ApplicationStatus,
  RecruitmentInfo,
} from "../types/application.types";

export const useApplications = (initialData: Application[]) => {
  const [data, setData] = useState<Application[]>(initialData);

  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] =
    useState<ApplicationStatus | "all">("all");

  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] =
    useState<RecruitmentInfo | null>(null);

  const jobs = useMemo(() => {
    return Array.from(new Set(data.map((d) => d.jobTitle)));
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const jobOk = jobFilter === "all" || item.jobTitle === jobFilter;
      const statusOk =
        statusFilter === "all" || item.status === statusFilter;
      return jobOk && statusOk;
    });
  }, [data, jobFilter, statusFilter]);

  const updateStatus = (id: number, status: ApplicationStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return {
    jobs,
    jobFilter,
    setJobFilter,
    statusFilter,
    setStatusFilter,
    filteredData,
    updateStatus,
    selectedCV,
    setSelectedCV,
    selectedProfile,
    setSelectedProfile,
  };
};