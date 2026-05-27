import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: string;
}

export interface UpdateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: string;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/companies";

export const companyApi = {
  // GET ALL (with filters)
  getAll: (params?: {
    keyword?: string;
    status?: string;
  }): Promise<Company[]> => {
    return request.get<Company[]>(ENDPOINT, {
      params,
    });
  },

  // GET BY ID
  getById: (id: number): Promise<Company> => {
    return request.get<Company>(
      `${ENDPOINT}/${id}`
    );
  },

  // CREATE
  create: (
    data: CreateCompanyRequest
  ): Promise<Company> => {
    return request.post<Company>(
      ENDPOINT,
      data
    );
  },

  // UPDATE
  update: (
    id: number,
    data: UpdateCompanyRequest
  ): Promise<Company> => {
    return request.put<Company>(
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

  // UPLOAD LOGO (multipart/form-data)
  uploadLogo: (
    id: number,
    file: File
  ): Promise<Company> => {
    const formData = new FormData();
    formData.append("file", file);

    return request.post<Company>(
      `${ENDPOINT}/${id}/logo`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  },
};

export default companyApi;