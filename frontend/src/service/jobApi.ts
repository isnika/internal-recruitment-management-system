import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExperienceLevel {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;

  salaryMin: number;
  salaryMax: number;

  location: string;
  type: string;

  status: "DRAFT" | "OPEN" | "CLOSED";

  deadline: string;

  company: Company;
  category: Category;
  experienceLevel: ExperienceLevel;
  skills: Skill[];
}

// =========================
// REQUEST TYPES
// =========================

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements: string;
  benefits: string;

  salaryMin: number;
  salaryMax: number;

  location: string;
  type: string;

  deadline: string;
  status: "DRAFT" | "OPEN" | "CLOSED";

  companyId: number;
  categoryId: number;
  experienceLevelId: number;
  skillIds: number[];
}

export interface UpdateJobRequest extends CreateJobRequest {}

export interface JobFilterRequest {
  keywords?: string;
  minSalary?: number;
  maxSalary?: number;
  skillIds?: number[];
  location?: string;
  categoryId?: number;
  jobType?: string;
  status?: string;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/jobs";

export const jobApi = {
  // GET ALL JOBS
  getAll: (): Promise<Job[]> => {
    return request.get<Job[]>(ENDPOINT);
  },

  // GET JOB BY ID
  getById: (jobId: number): Promise<Job> => {
    return request.get<Job>(`${ENDPOINT}/${jobId}`);
  },

  // CREATE JOB
  create: (data: CreateJobRequest): Promise<Job> => {
    return request.post<Job>(ENDPOINT, data);
  },

  // UPDATE JOB
  update: (jobId: number, data: UpdateJobRequest): Promise<Job> => {
    return request.put<Job>(`${ENDPOINT}/${jobId}`, data);
  },

  // DELETE JOB
  delete: (jobId: number): Promise<void> => {
    return request.delete<void>(`${ENDPOINT}/${jobId}`);
  },

  // FILTER JOBS
  filter: (params: JobFilterRequest): Promise<Job[]> => {
    return request.get<Job[]>(`${ENDPOINT}/filter`, {
      params,
    });
  },
};

export default jobApi;