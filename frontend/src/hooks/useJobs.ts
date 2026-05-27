import { useEffect, useMemo, useState } from "react";
import jobApi from "../service/jobApi";
import type { Job, JobFilterRequest } from "../types/job";

const JOBS_PER_PAGE = 5;

const emptyFilters: JobFilterRequest = {
  keywords: "",
  minSalary: undefined,
  maxSalary: undefined,
  skillIds: [],
  location: "",
  categoryId: undefined,
  jobType: "",
  status: "",
};

export const useJobs = (
  activeCategory?: number,
  metadataReady?: boolean
) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<JobFilterRequest>({
    ...emptyFilters,
  });

  // =========================
  // ACTIVE FILTER COUNT
  // =========================
  const activeCount = useMemo(() => {
    let count = 0;

    if (filters.keywords?.trim()) count++;
    if (filters.minSalary !== undefined) count++;
    if (filters.maxSalary !== undefined) count++;
    if (filters.location?.trim()) count++;
    if (filters.categoryId !== undefined) count++;
    if (filters.jobType) count++;
    if (filters.status) count++;

    count += filters.skillIds?.length || 0;

    return count;
  }, [filters]);

  // =========================
  // FETCH JOBS
  // =========================
  useEffect(() => {
    if (metadataReady === false) return;

    const fetchJobs = async () => {
      setIsLoading(true);

      try {
        const cleanFilters: JobFilterRequest = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => {
            if (value === "" || value === undefined || value === null) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
          })
        );

        // category tab override
        if (activeCategory !== undefined) {
          cleanFilters.categoryId = activeCategory;
        }

        const data =
          activeCount > 0 || activeCategory !== undefined
            ? await jobApi.filter(cleanFilters)
            : await jobApi.getAll();

        // FRONTEND PAGINATION
        const start = (currentPage - 1) * JOBS_PER_PAGE;
        const end = start + JOBS_PER_PAGE;

        const paginatedJobs = data.slice(start, end);

        setJobs(paginatedJobs);
        setTotalJobs(data.length);
        setTotalPages(Math.ceil(data.length / JOBS_PER_PAGE));
      } catch (err) {
        console.error("Lỗi jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [activeCategory, currentPage, activeCount, metadataReady]);

  // =========================
  // TOGGLE SKILL
  // =========================
  const handleToggleSkill = (skillId: number) => {
    setFilters((prev) => {
      const list = prev.skillIds || [];

      const newList = list.includes(skillId)
        ? list.filter((id) => id !== skillId)
        : [...list, skillId];

      return {
        ...prev,
        skillIds: newList,
      };
    });

    setCurrentPage(1);
  };

  // =========================
  // JOB TYPE
  // =========================
  const handleSetJobType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType === type ? "" : type,
    }));

    setCurrentPage(1);
  };

  // =========================
  // STATUS
  // =========================
  const handleSetStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? "" : status,
    }));

    setCurrentPage(1);
  };

  // =========================
  // CLEAR FILTERS
  // =========================
  const handleClearAll = () => {
    setFilters({ ...emptyFilters });
    setCurrentPage(1);
  };

  return {
    jobs,
    totalJobs,
    totalPages,
    currentPage,
    setCurrentPage,

    isLoading,

    filters,
    setFilters,

    activeCount,

    handleToggleSkill,
    handleSetJobType,
    handleSetStatus,
    handleClearAll,

    JOBS_PER_PAGE,
  };
};