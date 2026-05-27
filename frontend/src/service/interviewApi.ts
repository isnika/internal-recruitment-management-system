import { request } from "./axiosClient";

// ======================
// TYPES
// ======================

export interface Interview {
  id: number;
  scheduleTime: string;
  location: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | string;
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
// API
// ======================

const ENDPOINT = "/api/interviews";

export const interviewApi = {
  // CREATE INTERVIEW
  create: (
    body: InterviewCreateRequest
  ): Promise<ApiResponse<Interview>> => {
    return request.post<ApiResponse<Interview>>(
      ENDPOINT,
      body
    );
  },

  // GET MY INTERVIEWS
  getMyInterviews: (): Promise<ApiResponse<Interview[]>> => {
    return request.get<ApiResponse<Interview[]>>(
      `${ENDPOINT}/me`
    );
  },

  // GET BY ID
  getById: (id: number): Promise<ApiResponse<Interview>> => {
    return request.get<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}`
    );
  },

  // ACCEPT INTERVIEW
  accept: (id: number): Promise<ApiResponse<Interview>> => {
    return request.post<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/accept`
    );
  },

  // REJECT INTERVIEW
  reject: (id: number): Promise<ApiResponse<Interview>> => {
    return request.post<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/reject`
    );
  },

  // UPDATE RESULT
  updateResult: (
    id: number,
    body: InterviewResultRequest
  ): Promise<ApiResponse<Interview>> => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/result`,
      body
    );
  },
};

export default interviewApi;