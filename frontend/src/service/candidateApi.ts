import { request } from "./axiosClient";

/** GET current candidate profile */
export const getMyProfile = async () => {
  return request.get("/api/candidates/profile");
};

/** GET candidate by id */
export const getCandidateProfileById = async (userId: number) => {
  return request.get(`/api/candidates/profiles/${userId}`);
};

/** UPDATE profile */
export const updateProfile = async (payload: any) => {
  return request.put("/api/candidates/profile", payload);
};

/** UPLOAD avatar */
export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return request.put("/api/candidates/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/** GET ALL */
export const getAllProfiles = async () => {
  return request.get("/api/candidates/profiles");
};