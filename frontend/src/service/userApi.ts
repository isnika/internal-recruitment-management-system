import { request } from "./axiosClient";

//  
// USER APIs
//  
export const getAllUsers = () => request.get("/api/users");

export const getUserById = (id: number) =>
  request.get(`/api/users/${id}`);

export const createUser = (data: any) =>
  request.post("/api/users", data);

export const updateUser = (id: number, data: any) =>
  request.put(`/api/users/${id}`, data);

export const updateUserStatus = (id: number, status: "ACTIVE" | "BLOCKED") =>
  request.patch(`/api/users/${id}/status`, { status });

export const deleteUser = (id: number) =>
  request.delete(`/api/users/${id}`);


//  
// CANDIDATE PROFILE APIs
//  

// GET /api/candidates/profile
export const getMyCandidateProfile = () =>
  request.get("/api/candidates/profile");

// POST /api/candidates/profile
export const createCandidateProfile = (data: any) =>
  request.post("/api/candidates/profile", data);

// PUT /api/candidates/profile
export const updateCandidateProfile = (data: any) =>
  request.put("/api/candidates/profile", data);

// PATCH /api/candidates/profile/avatar
export const updateCandidateAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return request.patch("/api/candidates/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET /api/candidates/profiles
export const getAllCandidateProfiles = () =>
  request.get("/api/candidates/profiles");

// GET /api/candidates/profiles/{userId}
export const getCandidateProfileByUserId = (userId: number) =>
  request.get(`/api/candidates/profiles/${userId}`);


//  
// COMPANY APIs
//  
export const getAllCompanies = () =>
  request.get("/api/companies");

export const updateCompany = (id: number, data: any) =>
  request.put(`/api/companies/${id}`, data);


//  
// JOB APIs
//  
export const getAllJobs = () =>
  request.get("/api/jobs");

export const updateJob = (id: number, data: any) =>
  request.put(`/api/jobs/${id}`, data);