import qs from "qs";
import { request } from "./axiosClient";

// =========================
// TYPES & INTERFACES
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

export type JobStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "CLOSED";

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
  status: JobStatus;
  deadline: string;
  company: Company;
  category: Category;
  experienceLevel: ExperienceLevel;
  skills: Skill[];
}

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
  status: JobStatus;
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
  status?: JobStatus | "";
}

export interface HomeMetadata {
  categories: Category[];
  skills: Skill[];
  experienceLevels: ExperienceLevel[];
}

// =========================
// API SERVICES
// =========================

const ENDPOINT = "/api/jobs";

export const jobApi = {
  // Lấy tất cả công việc
  getAll: (): Promise<Job[]> => 
    request.get<Job[]>(ENDPOINT),

  // Lấy chi tiết công việc theo ID (Đã fix lỗi cú pháp ở đây)
  getById: (jobId: number): Promise<Job> => 
    request.get<Job>(`${ENDPOINT}/${jobId}`),

  // Tạo công việc mới
  create: (data: CreateJobRequest): Promise<Job> => 
    request.post<Job>(ENDPOINT, data),

  // Cập nhật thông tin công việc
  update: (jobId: number, data: UpdateJobRequest): Promise<Job> => 
    request.put<Job>(`${ENDPOINT}/${jobId}`, data),

  // Xóa công việc
  delete: (jobId: number): Promise<void> => 
    request.delete<void>(`${ENDPOINT}/${jobId}`),

  // Lọc và tìm kiếm công việc nâng cao
  filter: (params: JobFilterRequest): Promise<Job[]> => 
    request.get<Job[]>(`${ENDPOINT}/filter`, {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat", // skillIds=1&skillIds=2
        }),
    }),
};

export default jobApi;