import { request } from "./axiosClient";

// ======================
// TYPES
// ======================

export type InterviewStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "SCHEDULED"
  | "DONE";

export interface Interview {
  id: number;
  scheduleTime: string;
  location: string;
  status: InterviewStatus;
  result?: string;
  note?: string;

  application: {
    id: number;
    status: string;
    appliedAt: string;

    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };

    job: {
      id: number;
      title: string;
      description: string;
    };

    cv?: {
      id: number;
      fileUrl: string;
    };
  };
}

export interface InterviewCreateRequest {
  applicationId: number;
  scheduleTime: string;
  location: string;
  note?: string;
}

export interface InterviewResultRequest {
  result: string;
  note?: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ======================
// CONFIG
// ======================

// 🔥 FIX QUAN TRỌNG NHẤT
const ENDPOINT = "/api/interviews";

// ======================
// API
// ======================

export const interviewApi = {
  create: (body: InterviewCreateRequest) => {
    return request.post<ApiResponse<Interview>>(ENDPOINT, body);
  },

  getMyInterviews: () => {
    return request.get<ApiResponse<Interview[]>>(`${ENDPOINT}/me`);
  },

  getById: (id: number) => {
    return request.get<ApiResponse<Interview>>(`${ENDPOINT}/${id}`);
  },

  accept: (id: number) => {
    return request.post<ApiResponse<Interview>>(`${ENDPOINT}/${id}/accept`);
  },

  reject: (id: number) => {
    return request.post<ApiResponse<Interview>>(`${ENDPOINT}/${id}/reject`);
  },

  updateStatus: (id: number, status: InterviewStatus) => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/status`,
      { status }
    );
  },

  updateResult: (id: number, body: InterviewResultRequest) => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/result`,
      body
    );
  },
};

export default interviewApi;