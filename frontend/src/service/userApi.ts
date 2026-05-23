import { request } from "./axiosClient";

export const getAllUsers = () => request.get("/api/users");
export const getUserById = (id: number) => request.get(`/api/users/${id}`);
export const createUser = (data: any) => request.post("/api/users", data);
export const updateUser = (id: number, data: any) => request.put(`/api/users/${id}`, data);
export const deleteUser = (id: number) => request.delete(`/api/users/${id}`);

// Stubs for future integrations
export const getAllCompanies = () => request.get("/api/companies");
export const updateCompany = (id: number, data: any) => request.put(`/api/companies/${id}`, data);

export const getAllJobs = () => request.get("/api/jobs");
export const updateJob = (id: number, data: any) => request.put(`/api/jobs/${id}`, data);
