import { request } from "./axiosClient";
import { IS_MOCK } from "../config";

import { jobs } from "../dataMock/Job";
import { metadataMock } from "../dataMock/metadata";
import type {
  Job,
  FetchJobsResponse,
  JobFilters,
  HomeMetadata,
  CreateJobRequest,
  UpdateJobRequest,
  FilterJobsRequest,
} from "../types/job";

//  
// MAPPER
//  

const mapJobFromApi = (item: any): Job => {
  return {
    id: String(item.id),

    title: item.title || "",

    category:
      item.category?.name || "",

    skills:
      item.skills?.map(
        (skill: any) => skill.name
      ) || [],

    salary: {
      min: item.salaryMin || 0,

      max: item.salaryMax || 0,

      currency: "VND",
    },

    location: item.location || "",

    postedAt:
      item.createdAt ||
      item.postedAt ||
      "",

    isBookmarked: false,

    logo:
      item.company?.logoUrl || "",

    jobType: item.type || "",

    experienceLevel:
      item.experienceLevel?.name ||
      "",

    department:
      item.department?.name ||
      item.category?.name ||
      "",

    description: item.description
      ? [item.description]
      : [],

    requirements: item.requirements
      ? [item.requirements]
      : [],

    benefits: item.benefits
      ? [item.benefits]
      : [],

    company: {
      name:
        item.company?.name || "",

      address:
        item.company?.address || "",

      bio:
        item.company
          ?.description || "",
    },

    deadline: item.deadline || "",

    createdBy:
      item.createdBy || "",

    status:
      item.status?.toUpperCase() ||
      "OPEN",
  };
};

//  
// UPDATE JOB STATUS
//  
export const updateJobStatusApi = async (id: string, newStatus: string): Promise<void> => {
  if (IS_MOCK) return;
  // 1. Fetch raw job from API to get all required IDs for the PUT request
  const rawJob = await request.get<any>(`/api/jobs/${id}`);
  
  // 2. Build the CreateJobRequest payload
  const payload = {
    title: rawJob.title,
    description: rawJob.description,
    requirements: rawJob.requirements,
    benefits: rawJob.benefits,
    salaryMin: rawJob.salaryMin,
    salaryMax: rawJob.salaryMax,
    location: rawJob.location,
    type: rawJob.type,
    deadline: rawJob.deadline,
    status: newStatus,
    companyId: rawJob.company?.id,
    categoryId: rawJob.category?.id,
    experienceLevelId: rawJob.experienceLevel?.id,
    skillIds: rawJob.skills?.map((s: any) => s.id) || []
  };

  // 3. Send PUT request
  await request.put(`/api/jobs/${id}`, payload);
};

//  
// GET ALL JOBS
//  

export const fetchJobsApi = async (
  category: string,
  page: number,
  limit: number,
  filters?: JobFilters
): Promise<FetchJobsResponse> => {
  let result: Job[] = [];

  // MOCK
  if (IS_MOCK) {
    result = [...jobs];
  } else {
    const response = await request.get<
      any[]
    >("/api/jobs");

    result =
      response.map(mapJobFromApi);
  }

  // CATEGORY
  if (category !== "View All") {
    result = result.filter(
      (job) =>
        job.category === category
    );
  }

  // FILTER
  if (filters) {
    // KEYWORD
    if (filters.keyword?.trim()) {
      const keyword =
        filters.keyword.toLowerCase();

      result = result.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(keyword) ||
          job.category
            .toLowerCase()
            .includes(keyword) ||
          job.company?.name
            ?.toLowerCase()
            .includes(keyword)
      );
    }

    // LOCATION
    if (filters.location?.trim()) {
      const location =
        filters.location.toLowerCase();

      result = result.filter(
        (job) =>
          job.location
            .toLowerCase()
            .includes(location)
      );
    }

    // STATUS
    if (filters.status?.trim()) {
      result = result.filter(
        (job) =>
          job.status?.toLowerCase() ===
          filters.status?.toLowerCase()
      );
    }

    // JOB TYPES
    if (filters.jobTypes.length > 0) {
      result = result.filter((job) =>
        filters.jobTypes.includes(
          job.jobType
        )
      );
    }

    // EXPERIENCE
    if (
      filters.experienceLevels
        .length > 0
    ) {
      result = result.filter((job) =>
        filters.experienceLevels.includes(
          job.experienceLevel
        )
      );
    }

    // DEPARTMENTS
    if (
      filters.departments.length > 0
    ) {
      result = result.filter((job) =>
        filters.departments.includes(
          job.department
        )
      );
    }

    // SKILLS
    if (
      filters.skillTags.length > 0
    ) {
      result = result.filter((job) =>
        job.skills.some((skill) =>
          filters.skillTags.includes(
            skill
          )
        )
      );
    }

    // SALARY
    if (
      filters.salaryRanges.length > 0
    ) {
      result = result.filter((job) => {
        const salary =
          job.salary.min / 1000000;

        return filters.salaryRanges.some(
          (range) => {
            if (
              range ===
              "Under 10M VND"
            ) {
              return salary < 10;
            }

            if (
              range ===
              "10M - 20M VND"
            ) {
              return (
                salary >= 10 &&
                salary < 20
              );
            }

            if (
              range ===
              "20M - 30M VND"
            ) {
              return (
                salary >= 20 &&
                salary < 30
              );
            }

            if (
              range === "> 30M VND"
            ) {
              return salary >= 30;
            }

            return false;
          }
        );
      });
    }
  }

  // PAGINATION
  const total = result.length;

  const totalPages = Math.ceil(
    total / limit
  );

  const safePage =
    page > totalPages &&
    totalPages > 0
      ? totalPages
      : page;

  const start =
    (safePage - 1) * limit;

  return {
    jobs: result.slice(
      start,
      start + limit
    ),

    total,

    totalPages,

    currentPage: safePage,
  };
};

//  
// GET JOB BY ID
//  

export const fetchJobByIdApi =
  async (
    jobId: string
  ): Promise<Job> => {
    if (IS_MOCK) {
      const job = jobs.find(
        (j) => j.id === jobId
      );

      if (!job) {
        throw new Error(
          "Job not found"
        );
      }

      return Promise.resolve(job);
    }

    const response =
      await request.get<any>(
        `/api/jobs/${jobId}`
      );

    return mapJobFromApi(
      response
    );
  };

//  
// CREATE JOB
//  

export const createJobApi =
  async (
    payload: CreateJobRequest
  ): Promise<Job> => {
    const response =
      await request.post<any>(
        "/api/jobs",
        payload
      );

    return mapJobFromApi(
      response
    );
  };

//  
// UPDATE JOB
//  

export const updateJobApi =
  async (
    jobId: string,
    payload: UpdateJobRequest
  ): Promise<Job> => {
    const response =
      await request.put<any>(
        `/api/jobs/${jobId}`,
        payload
      );

    return mapJobFromApi(
      response
    );
  };

//  
// DELETE JOB
//  

export const deleteJobApi =
  async (
    jobId: string
  ): Promise<void> => {
    await request.delete(
      `/api/jobs/${jobId}`
    );
  };

//  
// FILTER JOBS
//  

export const filterJobsApi =
  async (
    filters: FilterJobsRequest
  ): Promise<Job[]> => {
    // MOCK
    if (IS_MOCK) {
      let result = [...jobs];

      // KEYWORDS
      if (filters.keywords) {
        const keyword =
          filters.keywords.toLowerCase();

        result = result.filter(
          (job) =>
            job.title
              .toLowerCase()
              .includes(keyword) ||
            job.category
              .toLowerCase()
              .includes(keyword)
        );
      }

      // LOCATION
      if (filters.location) {
        result = result.filter(
          (job) =>
            job.location
              .toLowerCase()
              .includes(
                filters.location!.toLowerCase()
              )
        );
      }

      // JOB TYPE
      if (filters.jobType) {
        result = result.filter(
          (job) =>
            job.jobType ===
            filters.jobType
        );
      }

      // STATUS
      if (filters.status) {
        result = result.filter(
          (job) =>
            job.status ===
            filters.status
        );
      }

      // MIN SALARY
      if (filters.minSalary) {
        result = result.filter(
          (job) =>
            job.salary.min >=
            filters.minSalary!
        );
      }

      // MAX SALARY
      if (filters.maxSalary) {
        result = result.filter(
          (job) =>
            job.salary.max <=
            filters.maxSalary!
        );
      }

      return Promise.resolve(
        result
      );
    }

    // API
    const response =
      await request.get<any>(
        "/api/jobs/filter",
        {
          params: {
            keywords: filters.keywords,
            location: filters.location,
            jobType: filters.jobType,
            status: filters.status,
            minSalary: filters.minSalary,
            maxSalary: filters.maxSalary,
          },
        }
      );

    return response.map(
      mapJobFromApi
    );
  };

//  
// BOOKMARK
//  

export const toggleBookmarkApi =
  async (jobId: string) => {
    if (IS_MOCK) {
      const job = jobs.find(
        (j) => j.id === jobId
      );

      if (job) {
        job.isBookmarked =
          !job.isBookmarked;
      }

      return Promise.resolve(
        job
      );
    }

    return request.post(
      `/api/jobs/${jobId}/bookmark`
    );
  };

//  
// FORMAT SALARY
//  

export const formatSalary = (
  salary: Job["salary"]
) => {
  const min =
    salary.min / 1000000;

  const max =
    salary.max / 1000000;

  return `${min}M - ${max}M ${salary.currency}`;
};

//  
// FETCH METADATA
//  

export const fetchMetadataApi =
  async (): Promise<HomeMetadata> => {
    if (IS_MOCK) {
      return Promise.resolve(
        metadataMock
      );
    }

    const jobsResponse =
      await request.get<any[]>(
        "/api/jobs"
      );

    const mappedJobs =
      jobsResponse.map(
        mapJobFromApi
      );

    return {
      categories: [
        ...new Set(
          mappedJobs.map(
            (job) =>
              job.category
          )
        ),
      ],

      jobTypes: [
        ...new Set(
          mappedJobs.map(
            (job) =>
              job.jobType
          )
        ),
      ],

      experienceLevels: [
        ...new Set(
          mappedJobs.map(
            (job) =>
              job.experienceLevel
          )
        ),
      ],

      departments: [
        ...new Set(
          mappedJobs.map(
            (job) =>
              job.department
          )
        ),
      ],

      salaryRanges: [
        "Under 10M VND",

        "10M - 20M VND",

        "20M - 30M VND",

        "> 30M VND",
      ],

      skillTags: [
        ...new Set(
          mappedJobs.flatMap(
            (job) =>
              job.skills
          )
        ),
      ],
    };
  };