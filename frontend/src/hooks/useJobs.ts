import { useEffect, useMemo, useState } from "react";
import jobApi from "../service/jobApi";
import type { Job, JobFilterRequest } from "../types/job";

export const JOBS_PER_PAGE = 5;

const initialFilters: JobFilterRequest = {
  keywords: "",
  minSalary: undefined,
  maxSalary: undefined,
  skillIds: [],
  location: "",
  categoryId: undefined,
  jobType: "",
  status: "ACTIVE",
};

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] =
    useState<JobFilterRequest>(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 COUNT FILTERS
  const activeCount = useMemo(() => {
    let count = 0;

    if (filters.keywords?.trim()) count++;
    if (filters.location?.trim()) count++;
    if (filters.categoryId) count++;
    if (filters.jobType) count++;
    if (filters.status) count++;
    if (filters.minSalary) count++;
    if (filters.maxSalary) count++;

    if (filters.skillIds?.length) {
      count += filters.skillIds.length;
    }

    return count;
  }, [filters]);

  // 🔥 FETCH JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);

        const cleanFilters: JobFilterRequest = {
          keywords: filters.keywords || undefined,
          minSalary: filters.minSalary,
          maxSalary: filters.maxSalary,
          location: filters.location || undefined,
          categoryId: filters.categoryId,
          jobType: filters.jobType || undefined,
          status: filters.status || undefined,
          skillIds:
            filters.skillIds && filters.skillIds.length > 0
              ? filters.skillIds
              : undefined,
        };

        const data: Job[] =
          activeCount > 0
            ? await jobApi.filter(cleanFilters)
            : await jobApi.filter({
                status: "ACTIVE",
              });

        setJobs(data);
      } catch (err) {
        console.error("❌ FETCH JOBS ERROR:", err);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, activeCount]);

  // PAGINATION
  const totalJobs = jobs.length;

  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    const end = start + JOBS_PER_PAGE;

    return jobs.slice(start, end);
  }, [jobs, currentPage]);

  // FILTER ACTIONS

  const handleToggleSkill = (skillId: number) => {
    setFilters((prev) => {
      const exists = prev.skillIds?.includes(skillId);

      return {
        ...prev,
        skillIds: exists
          ? prev.skillIds?.filter((id) => id !== skillId)
          : [...(prev.skillIds || []), skillId],
      };
    });

    setCurrentPage(1);
  };

  const handleSetCategory = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      categoryId:
        prev.categoryId === categoryId
          ? undefined
          : categoryId,
    }));

    setCurrentPage(1);
  };

  const handleSetStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? "" : status,
    }));

    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handleBookmark = (jobId: number) => {
    console.log("BOOKMARK:", jobId);
  };

const handleKeywordsChange = (value: string) => {
  setFilters((prev) => ({
    ...prev,
    keywords: value,
  }));

  setCurrentPage(1);
};

const handleLocationChange = (value: string) => {
  setFilters((prev) => ({
    ...prev,
    location: value,
  }));

  setCurrentPage(1);
};

const handleMinSalaryChange = (
  value: number | undefined
) => {
  setFilters((prev) => ({
    ...prev,
    minSalary: value,
  }));

  setCurrentPage(1);
};

const handleMaxSalaryChange = (
  value: number | undefined
) => {
  setFilters((prev) => ({
    ...prev,
    maxSalary: value,
  }));

  setCurrentPage(1);
};

const handleSetJobType = (value: string) => {
  setFilters((prev) => ({
    ...prev,
    jobType:
      prev.jobType === value ? "" : value,
  }));

  setCurrentPage(1);
};

  return {
    jobs: paginatedJobs,
    allJobs: jobs,

    totalJobs,
    totalPages,

    currentPage,
    setCurrentPage,

    isLoading,

    filters,
    setFilters,

    handleToggleSkill,
    handleSetCategory,
    handleSetStatus,
    handleClearAll,
    handleBookmark,
    handleKeywordsChange,
    handleLocationChange,
    handleMinSalaryChange,
    handleMaxSalaryChange,
    handleSetJobType,
  };
};