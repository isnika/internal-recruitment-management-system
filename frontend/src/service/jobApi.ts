import { request } from "./axiosClient";
import { IS_MOCK } from "../config/index";
import { jobs } from "../dataMock/Job";
import { metadataMock } from "../dataMock/metadata";
import type { Job, HomeMetadata, JobFilters, FetchJobsResponse } from "../types/job";

// ================= METADATA =================
export const fetchMetadataApi = async (): Promise<HomeMetadata> => {
  if (IS_MOCK) {
    return Promise.resolve(metadataMock);
  }

  return request.get<HomeMetadata>("/metadata");
};

// ================= SALARY =================
const checkSalaryInRange = (
  range: string,
  salary: { min: number }
): boolean => {
  const value = salary.min / 1000000;

  if (range === "Under 10M VND") return value < 10;
  if (range === "10M - 20M VND") return value >= 10 && value < 20;
  if (range === "20M - 30M VND") return value >= 20 && value < 30;
  if (range === "> 30M VND") return value >= 30;

  return true;
};

// FETCH JOB
export const fetchJobsApi = async (
  category: string,
  page: number,
  limit: number,
  filters?: JobFilters
): Promise<FetchJobsResponse> => {

  let result: Job[] = IS_MOCK
    ? [...jobs]
    : await request.get<Job[]>("/jobs");

  // CATEGORY
  if (category !== "View All") {
    result = result.filter(job => job.category === category);
  }

  // FILTER
  if (filters) {
    if (filters.jobTypes.length > 0) {
      result = result.filter(job =>
        filters.jobTypes.includes(job.jobType)
      );
    }

    if (filters.experienceLevels.length > 0) {
      result = result.filter(job =>
        filters.experienceLevels.includes(job.experienceLevel)
      );
    }

    if (filters.departments.length > 0) {
      result = result.filter(job =>
        filters.departments.includes(job.category) // ✅
      );
    }

    if (filters.salaryRanges.length > 0) {
      result = result.filter(job =>
        filters.salaryRanges.some((range: string) =>
          checkSalaryInRange(range, job.salary)
        )
      );
    }

    //  FIX SKILL
    if (filters.skillTags.length > 0) {
      result = result.filter(job =>
        job.skills.some(skill =>
          filters.skillTags.includes(skill)
        )
      );
    }
  }

  // PAGINATION
  const total = result.length;
  const totalPages = Math.ceil(total / limit);

  const safePage =
    page > totalPages && totalPages > 0 ? totalPages : page;

  const start = (safePage - 1) * limit;

  return {
    jobs: result.slice(start, start + limit),
    total,
    totalPages,
    currentPage: safePage,
  };
};

// BOOKMARK
export const toggleBookmarkApi = async (jobId: string) => {
  if (IS_MOCK) {
    const job = jobs.find(j => j.id === jobId);
    if (job) job.isBookmarked = !job.isBookmarked;
    return Promise.resolve(job);
  }

  return request.post(`/jobs/${jobId}/bookmark`);
};

// GET JOB BY ID
export const fetchJobByIdApi = async (jobId: string): Promise<Job> => {
  if (IS_MOCK) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) throw new Error("Job not found");
    return Promise.resolve(job);
  }

  return request.get<Job>(`/jobs/${jobId}`);
};

//  FORMAT SALARY
export const formatSalary = (salary: Job["salary"]) => {
  const min = salary.min / 1000000;
  const max = salary.max / 1000000;

  return `${min}M - ${max}M ${salary.currency}`;
};