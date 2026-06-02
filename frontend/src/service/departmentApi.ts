import axiosClient from "./axiosClient";

export interface Department {
  id: number;
  name: string;
}

export interface CreateDepartmentRequest {
  name: string;
}

export interface UpdateDepartmentRequest {
  name: string;
}

export const departmentApi = {
  // GET /api/categories
  getAll: async (): Promise<Department[]> => {
    return await axiosClient.get("/api/categories");
  },

  // GET /api/categories/{id}
  getById: async (id: number): Promise<Department> => {
    return await axiosClient.get(`/api/categories/${id}`);
  },

  // POST /api/categories
  create: async (
    data: CreateDepartmentRequest
  ): Promise<Department> => {
    return await axiosClient.post("/api/categories", data);
  },

  // PUT /api/categories/{id}
  update: async (
    id: number,
    data: UpdateDepartmentRequest
  ): Promise<Department> => {
    return await axiosClient.put(
      `/api/categories/${id}`,
      data
    );
  },

  // DELETE /api/categories/{id}
  delete: async (id: number): Promise<void> => {
    return await axiosClient.delete(`/api/categories/${id}`);
  },
};