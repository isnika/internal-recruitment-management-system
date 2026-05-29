// src/service/savedJobApi.ts

import { request } from "./axiosClient";

import type { Job } from "../types/job";

// =========================
// TYPES
// =========================

export interface SavedJobStatus {
  jobId: number;
  saved: boolean;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/saved-jobs";

export const savedJobApi = {
  // SAVE JOB
  save: (
    jobId: number
  ): Promise<SavedJobStatus> => {
    return request.post(
      `${ENDPOINT}/${jobId}`
    );
  },

  // REMOVE SAVED JOB
  remove: (
    jobId: number
  ): Promise<SavedJobStatus> => {
    return request.delete(
      `${ENDPOINT}/${jobId}`
    );
  },

  // GET ALL SAVED JOBS
  getAll: (): Promise<Job[]> => {
    return request.get(ENDPOINT);
  },

  // CHECK SAVED STATUS
  getStatus: (
    jobId: number
  ): Promise<SavedJobStatus> => {
    return request.get(
      `${ENDPOINT}/${jobId}/status`
    );
  },
};

export default savedJobApi;