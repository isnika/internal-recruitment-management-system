import { request } from "./axiosClient";

// USER API

// GET all users
export const getAllUsers = () =>
  request.get("/api/users");

// GET user by id
export const getUserById = (id: number) =>
  request.get(`/api/users/${id}`);

// CREATE user
export const createUser = (data: any) =>
  request.post("/api/users", data);

// UPDATE user
export const updateUser = (id: number, data: any) =>
  request.put(`/api/users/${id}`, data);

// DELETE user
export const deleteUser = (id: number) =>
  request.delete(`/api/users/${id}`);


//
     
// CANDIDATE PROFILE API
     
//

// GET my profile
export const getMyCandidateProfile = () =>
  request.get("/api/candidates/profile");

// CREATE profile
export const createCandidateProfile = (data: any) =>
  request.post("/api/candidates/profile", data);

// UPDATE profile
export const updateCandidateProfile = (data: any) =>
  request.put("/api/candidates/profile", data);

// UPDATE avatar
export const updateCandidateAvatar = (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  return request.patch(
    "/api/candidates/profile/avatar",
    formData
  );
};

// GET all candidate profiles
export const getAllCandidateProfiles = () =>
  request.get("/api/candidates/profiles");

// GET candidate profile by userId
export const getCandidateProfileByUserId = (userId: number) =>
  request.get(`/api/candidates/profiles/${userId}`);


     
// COMPANY API


export const getAllCompanies = () =>
  request.get("/api/companies");

export const updateCompany = (id: number, data: any) =>
  request.put(`/api/companies/${id}`, data);

     
// JOB API


export const getAllJobs = () =>
  request.get("/api/jobs");

export const updateJob = (id: number, data: any) =>
  request.put(`/api/jobs/${id}`, data);