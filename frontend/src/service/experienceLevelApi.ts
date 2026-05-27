import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface ExperienceLevel {
  id: number;
  name: string;
}

export interface CreateExperienceLevelRequest {
  name: string;
}

export interface UpdateExperienceLevelRequest {
  name: string;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/experience-levels";

export const experienceLevelApi = {
  // GET ALL
  getAll: (): Promise<ExperienceLevel[]> => {
    return request.get<ExperienceLevel[]>(ENDPOINT);
  },

  // GET BY ID
  getById: (id: number): Promise<ExperienceLevel> => {
    return request.get<ExperienceLevel>(
      `${ENDPOINT}/${id}`
    );
  },

  // CREATE
  create: (
    data: CreateExperienceLevelRequest
  ): Promise<ExperienceLevel> => {
    return request.post<ExperienceLevel>(
      ENDPOINT,
      data
    );
  },

  // UPDATE
  update: (
    id: number,
    data: UpdateExperienceLevelRequest
  ): Promise<ExperienceLevel> => {
    return request.put<ExperienceLevel>(
      `${ENDPOINT}/${id}`,
      data
    );
  },

  // DELETE
  delete: (id: number): Promise<void> => {
    return request.delete<void>(
      `${ENDPOINT}/${id}`
    );
  },
};

export default experienceLevelApi;