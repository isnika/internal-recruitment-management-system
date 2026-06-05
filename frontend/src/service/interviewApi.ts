import { request } from "./axiosClient";

 
// TYPES
export type InterviewStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export type InterviewResult = "passed" | "failed";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// INTERVIEW TYPES

export interface Interview {
  id: number;
  scheduleTime: string;
  location: string;

  status: InterviewStatus;

  result?: InterviewResult;
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
  result: InterviewResult;
  note?: string;
}

export interface InterviewStatusRequest {
  status: InterviewStatus;
}

 
// BASE ENDPOINT
const ENDPOINT = "/api/interviews";

 
// API

export const interviewApi = {
  // CREATE INTERVIEW
  create: (body: InterviewCreateRequest) => {
    return request.post<ApiResponse<Interview>>(ENDPOINT, body);
  },

  // GET MY INTERVIEWS
  getMyInterviews: () => {
    return request.get<ApiResponse<Interview[]>>(`${ENDPOINT}/me`);
  },

  // GET ALL INTERVIEWS (Admin)
  getAll: () => {
    return request.get<ApiResponse<Interview[]>>(ENDPOINT);
  },

  // GET BY ID
  getById: (id: number) => {
    return request.get<ApiResponse<Interview>>(`${ENDPOINT}/${id}`);
  },

  // ACCEPT INTERVIEW
  accept: (id: number) => {
    return request.post<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/accept`
    );
  },

  // REJECT INTERVIEW
  reject: (id: number) => {
    return request.post<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/reject`
    );
  },

  //  UPDATE STATUS
  updateStatus: (id: number, status: InterviewStatus) => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/status`,
      { status }
    );
  },

  //  UPDATE RESULT
  updateResult: (id: number, body: InterviewResultRequest) => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/result`,
      body
    );
  },

  // RESCHEDULE
  reschedule: (id: number, scheduleTime: string, location: string, note?: string) => {
    return request.patch<ApiResponse<Interview>>(
      `${ENDPOINT}/${id}/schedule`,
      { scheduleTime, location, note }
    );
  },
};

export default interviewApi;