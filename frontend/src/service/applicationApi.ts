// src/api/applicationApi.ts

import { request } from "./axiosClient";

// ======================
// TYPES
// ======================

export interface ApplicationStatusRequest {
  status: string;
}

export interface ApplyJobRequest {
  jobId: number;
  cvId: number;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExperienceLevel {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
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
  status: string;
  deadline: string;

  company: Company;
  category: Category;
  experienceLevel: ExperienceLevel;
  skills: Skill[];
}

export interface Cv {
  id: number;
  fileUrl: string;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  status: string;
}

export interface Application {
  id: number;
  status: string;
  appliedAt: string;

  user: User;
  job: Job;
  cv: Cv;
}

// ======================
// API
// ======================

const applicationApi = {
  // Apply job
  applyJob: (data: ApplyJobRequest) =>
    request.post<Application>("/api/applications", data),

  // Candidate xem danh sách job đã apply
  getMyApplications: () =>
    request.get<Application[]>("/api/applications/me"),

  // Recruiter xem ứng viên của job
  getApplicationsByJob: (jobId: number) =>
    request.get<Application[]>(
      `/api/applications/job/${jobId}`
    ),

  // Recruiter update trạng thái
  updateApplicationStatus: (
    applicationId: number,
    data: ApplicationStatusRequest
  ) =>
    request.patch<Application>(
      `/api/applications/${applicationId}/status`,
      data
    ),
};

export default applicationApi;