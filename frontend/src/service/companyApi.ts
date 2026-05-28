import { request } from "./axiosClient";
import type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "../types/company";

const ENDPOINT = "/api/companies";

// =========================
// TYPES
// =========================

type CompanyListParams = {
  keyword?: string;
  status?: string;
};

// =========================
// API
// =========================

const companyApi = {
  /**
   * GET /api/companies
   */
  getAll: (params?: CompanyListParams): Promise<Company[]> => {
    return request.get(ENDPOINT, { params });
  },

  /**
   * GET /api/companies/{id}
   */
  getById: (id: number): Promise<Company> => {
    return request.get(`${ENDPOINT}/${id}`);
  },

  /**
   * POST /api/companies
   */
  create: (data: CreateCompanyRequest): Promise<Company> => {
    return request.post(ENDPOINT, data);
  },

  /**
   * PUT /api/companies/{id}
   */
  update: (id: number, data: UpdateCompanyRequest): Promise<Company> => {
    return request.put(`${ENDPOINT}/${id}`, data);
  },

  /**
   * DELETE /api/companies/{id}
   */
  delete: (id: number): Promise<void> => {
    return request.delete(`${ENDPOINT}/${id}`);
  },

  // =========================
  // LOGO UPLOAD
  // =========================

  /**
   * POST /api/companies/{id}/logo
   * (upload mới)
   */
  uploadLogo: (id: number, file: File): Promise<Company> => {
    const formData = new FormData();
    formData.append("file", file);

    return request.post(`${ENDPOINT}/${id}/logo`, formData);
  },

  /**
   * PATCH /api/companies/{id}/logo
   * (update logo)
   */
  updateLogo: (id: number, file: File): Promise<Company> => {
    const formData = new FormData();
    formData.append("file", file);

    return request.patch(`${ENDPOINT}/${id}/logo`, formData);
  },
};

export default companyApi;