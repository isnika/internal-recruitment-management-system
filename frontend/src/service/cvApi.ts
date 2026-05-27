import { request } from "./axiosClient";

// ======================
// TYPES
// ======================

export interface CV {
  id: number;
  fileUrl: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  status?: number;
  message?: string;
  data?: T;
}

// ======================
// API
// ======================

const ENDPOINT = "/api/cvs";

export const cvApi = {
  // UPLOAD CV (multipart/form-data)
  upload: (file: File): Promise<CV> => {
    const formData = new FormData();
    formData.append("file", file);

    return request.post<CV>(
      `${ENDPOINT}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  // GET MY CVS
  getMyCvs: (): Promise<CV[]> => {
    return request.get<CV[]>(`${ENDPOINT}/myCvs`);
  },

  // DELETE CV
  delete: (cvId: number): Promise<void> => {
    return request.delete<void>(`${ENDPOINT}/${cvId}`);
  },
};

export default cvApi;