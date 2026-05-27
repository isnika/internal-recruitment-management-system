import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface Skill {
  id: number;
  name: string;
}

export interface CreateSkillRequest {
  name: string;
}

export interface UpdateSkillRequest {
  name: string;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/skills";

export const skillApi = {
  // GET ALL (with optional keyword filter)
  getAll: (keyword?: string): Promise<Skill[]> => {
    return request.get<Skill[]>(ENDPOINT, {
      params: keyword ? { keyword } : undefined,
    });
  },

  // GET BY ID
  getById: (id: number): Promise<Skill> => {
    return request.get<Skill>(`${ENDPOINT}/${id}`);
  },

  // CREATE
  create: (data: CreateSkillRequest): Promise<Skill> => {
    return request.post<Skill>(ENDPOINT, data);
  },

  // UPDATE
  update: (id: number, data: UpdateSkillRequest): Promise<Skill> => {
    return request.put<Skill>(`${ENDPOINT}/${id}`, data);
  },

  // DELETE
  delete: (id: number): Promise<void> => {
    return request.delete<void>(`${ENDPOINT}/${id}`);
  },
};

export default skillApi;