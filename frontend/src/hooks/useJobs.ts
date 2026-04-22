import { useEffect, useState } from "react";
import {
  fetchJobsApi,
  toggleBookmarkApi,
  type Job,
  type JobFilters,
} from "../service/jobApi";

const JOBS_PER_PAGE = 5;

const emptyFilters: JobFilters = {
  jobTypes: [],
  experienceLevels: [],
  departments: [],
  salaryRanges: [],
  skillTags: [],
};

export const useJobs = (
  activeCategory: string,
  metadataReady: boolean
) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<JobFilters>({ ...emptyFilters });
  const [isLoading, setIsLoading] = useState(false);

  const activeCount = Object.values(filters).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  useEffect(() => {
    if (!metadataReady) return;

    const getJobs = async () => {
      setIsLoading(true);

      try {
        const res = await fetchJobsApi(
          activeCategory,
          currentPage,
          JOBS_PER_PAGE,
          activeCount > 0 ? filters : undefined
        );

        setJobs(res.jobs);
        setTotalJobs(res.total);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage);
      } catch (err) {
        console.error("Lỗi jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, [activeCategory, currentPage, filters, metadataReady]);

  const handleBookmark = async (id: string) => {
    try {
      await toggleBookmarkApi(id);

      setJobs(prev =>
        prev.map(job =>
          job.id === id
            ? { ...job, isBookmarked: !job.isBookmarked }
            : job
        )
      );
    } catch (err) {
      console.error("Bookmark lỗi:", err);
    }
  };

  const handleToggleFilter = (group: keyof JobFilters, value: string) => {
    setFilters(prev => {
      const list = prev[group];
      const newList = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];

      return { ...prev, [group]: newList };
    });

    setCurrentPage(1);
  };

  const handleClearGroup = (group: keyof JobFilters) => {
    setFilters(prev => ({ ...prev, [group]: [] }));
    setCurrentPage(1);
  };

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
    handleBookmark,
    handleToggleFilter,
    handleClearGroup,
    handleClearAll,
    activeCount,
    JOBS_PER_PAGE,
  };
};