import { request } from "./axiosClient";
import type { CV } from "../types/cv";

export interface ApiMessageResponse {
  message: string;
}

const ENDPOINT = "/api/cvs";

const cvApi = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return request.post("/api/cvs/upload", formData);
  },

  getMyCvs: (): Promise<CV[]> => {
    return request.get<CV[]>(`${ENDPOINT}/myCvs`);
  },

  getById: (cvId: number): Promise<CV> => {
      return request.get<CV>(`${ENDPOINT}/${cvId}`);
    },

  delete: (cvId: number): Promise<ApiMessageResponse> => {
    return request.delete(`${ENDPOINT}/${cvId}`);
  },
};

export default cvApi;