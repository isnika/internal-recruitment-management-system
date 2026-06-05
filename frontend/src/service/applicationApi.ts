import axiosClient from "./axiosClient";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  role: string;
  status: string;
};

export type Company = {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
};

export type Category = {
  id: number;
  name: string;
};

export type ExperienceLevel = {
  id: number;
  name: string;
};

export type Skill = {
  id: number;
  name: string;
};

export type Job = {
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
};

export type CV = {
  id: number;
  fileUrl: string;
  createdAt: string;
};

export type ApplicationStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEWING"
  | "ACCEPTED"
  | "REJECTED";

export type Application = {
  id: number;
  status: ApplicationStatus;
  appliedAt: string;
  user: User;
  job: Job;
  cv: CV;
};

export type CreateApplicationReq = {
  jobId: number;
  cvId: number;
};

export type UpdateApplicationStatusReq = {
  status: ApplicationStatus;
};

const applicationApi = {
  getAll(): Promise<Application[]> {
    return axiosClient.get("/api/applications");
  },

  getMyApplications(): Promise<Application[]> {
    return axiosClient.get("/api/applications/me");
  },

  getByJob(jobId: number): Promise<Application[]> {
    return axiosClient.get(`/api/applications/job/${jobId}`);
  },

  create(data: CreateApplicationReq): Promise<Application> {
    return axiosClient.post("/api/applications", data);
  },

  updateStatus(
    id: number,
    data: UpdateApplicationStatusReq
  ): Promise<Application> {
    return axiosClient.patch(
      `/api/applications/${id}/status`,
      data
    );
  },

  getAllForAdmin(): Promise<Application[]> {
    return axiosClient.get("/api/applications/admin/all");
  },
};

export default applicationApi;