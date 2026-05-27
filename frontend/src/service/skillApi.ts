import { request } from "./axiosClient";
import type { Skill } from "../types/skill";

export interface CreateSkillRequest {
  name: string;
}

export interface UpdateSkillRequest {
  name: string;
}

const ENDPOINT = "/api/skills";

export const skillApi = {
  getAll: (keyword?: string): Promise<Skill[]> => {
    return request.get(ENDPOINT, {
      params: keyword ? { keyword } : undefined,
    });
  },

  getById: (id: number): Promise<Skill> => {
    return request.get(`${ENDPOINT}/${id}`);
  },

  create: (data: CreateSkillRequest): Promise<Skill> => {
    return request.post(ENDPOINT, data);
  },

  update: (id: number, data: UpdateSkillRequest): Promise<Skill> => {
    return request.put(`${ENDPOINT}/${id}`, data);
  },

  delete: (id: number): Promise<void> => {
    return request.delete(`${ENDPOINT}/${id}`);
  },
};