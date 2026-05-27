import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface SavedJobStatus {
  jobId: number;
  saved: boolean;
}

// Job response (reuse từ jobApi nếu bạn đã có)
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

  company: {
    id: number;
    name: string;
    description: string;
    address: string;
    website: string;
    logoUrl: string;
    status: string;
  };

  category: {
    id: number;
    name: string;
  };

  experienceLevel: {
    id: number;
    name: string;
  };

  skills: {
    id: number;
    name: string;
  }[];
}

// =========================
// API
// =========================

const ENDPOINT = "/api/saved-jobs";

export const savedJobApi = {
  // SAVE JOB (toggle save)
  save: (jobId: number): Promise<SavedJobStatus> => {
    return request.post<SavedJobStatus>(
      `${ENDPOINT}/${jobId}`
    );
  },

  // REMOVE SAVED JOB
  remove: (jobId: number): Promise<SavedJobStatus> => {
    return request.delete<SavedJobStatus>(
      `${ENDPOINT}/${jobId}`
    );
  },

  // GET ALL SAVED JOBS
  getAll: (): Promise<Job[]> => {
    return request.get<Job[]>(ENDPOINT);
  },

  // CHECK SAVED STATUS
  getStatus: (jobId: number): Promise<SavedJobStatus> => {
    return request.get<SavedJobStatus>(
      `${ENDPOINT}/${jobId}/status`
    );
  },
};

export default savedJobApi;