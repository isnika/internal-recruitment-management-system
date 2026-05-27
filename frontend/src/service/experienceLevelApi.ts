import { request } from "./axiosClient";
import type { ExperienceLevel } from "./types/experienceLevel.types";

export interface CreateExperienceLevelRequest {
  name: string;
  monthsMin: number;
  monthsMax: number;
}

export interface UpdateExperienceLevelRequest {
  name: string;
  monthsMin: number;
  monthsMax: number;
}

const ENDPOINT = "/api/experience-levels";

export const experienceLevelApi = {
  getAll: (): Promise<ExperienceLevel[]> => {
    return request.get(ENDPOINT);
  },

  getById: (id: number): Promise<ExperienceLevel> => {
    return request.get(`${ENDPOINT}/${id}`);
  },

  create: (data: CreateExperienceLevelRequest): Promise<ExperienceLevel> => {
    return request.post(ENDPOINT, data);
  },

  update: (id: number, data: UpdateExperienceLevelRequest): Promise<ExperienceLevel> => {
    return request.put(`${ENDPOINT}/${id}`, data);
  },

  delete: (id: number): Promise<void> => {
    return request.delete(`${ENDPOINT}/${id}`);
  },
};