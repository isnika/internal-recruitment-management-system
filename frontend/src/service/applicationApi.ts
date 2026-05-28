import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface ApplicationUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role?: string;
  status?: string;
}

export interface ApplicationCompany {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
}

export interface ApplicationCategory {
  id: number;
  name: string;
}

export interface ApplicationExperienceLevel {
  id: number;
  name: string;
}

export interface ApplicationSkill {
  id: number;
  name: string;
}

export interface ApplicationJob {
  id: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  type: string;
  status: string;
  deadline: string;

  company: ApplicationCompany;
  category: ApplicationCategory;
  experienceLevel: ApplicationExperienceLevel;
  skills: ApplicationSkill[];
}

export interface ApplicationCV {
  id: number;
  fileUrl: string;
  createdAt: string;
}

export interface Application {
  id: number;
  status: string;
  appliedAt: string;

  user: ApplicationUser;
  job: ApplicationJob;
  cv: ApplicationCV;
}

// =========================
// REQUEST TYPE
// =========================

export interface CreateApplicationRequest {
  jobId: number;
  cvId: number;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/applications";

export const applicationApi = {
  /**
   * Apply job
   */
  create: (body: CreateApplicationRequest) => {
    return request.post<Application>(ENDPOINT, body);
  },

  /**
   * Get all applications (optional use)
   */
  getAll: () => {
    return request.get<Application[]>(ENDPOINT);
  },

  /**
   * Get application by id (optional use)
   */
  getById: (id: number) => {
    return request.get<Application>(`${ENDPOINT}/${id}`);
  },
};

export default applicationApi;