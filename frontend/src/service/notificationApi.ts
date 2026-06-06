import { request } from "./axiosClient";

// =========================
// TYPES
// =========================

export interface Notification {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderId: number;
  senderName: string;
  redirectUrl: string;
  type: string;
}

export interface SendNotificationRequest {
  userId: number;
  content: string;
  redirectUrl: string;
  type: string;
  sendEmail: boolean;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Spring Page wrapper
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/notifications";

export const notificationApi = {
  // GET ALL (MY NOTIFICATIONS)
  getAll: (page = 0, size = 10): Promise<PageResponse<Notification>> => {
    return request.get(`${ENDPOINT}?page=${page}&size=${size}`);
  },

  // GET UNREAD
  getUnread: (page = 0, size = 10): Promise<PageResponse<Notification>> => {
    return request.get(`${ENDPOINT}/unread?page=${page}&size=${size}`);
  },

  // GET UNREAD COUNT
  getUnreadCount: (): Promise<ApiResponse<number>> => {
    return request.get(`${ENDPOINT}/unread/count`);
  },

  // GET BY ID
  getById: (id: number): Promise<ApiResponse<Notification>> => {
    return request.get(`${ENDPOINT}/${id}`);
  },

  // MARK AS READ
  markAsRead: (id: number): Promise<ApiResponse<string>> => {
    return request.put(`${ENDPOINT}/${id}/read`);
  },

  // MARK ALL AS READ
  markAllAsRead: (): Promise<ApiResponse<string>> => {
    return request.put(`${ENDPOINT}/read-all`);
  },

  // SEND NOTIFICATION
  send: (data: SendNotificationRequest): Promise<ApiResponse<string>> => {
    return request.post(`${ENDPOINT}/send`, data);
  },

  // DELETE
  delete: (id: number): Promise<ApiResponse<string>> => {
    return request.delete(`${ENDPOINT}/${id}`);
  },
};

export default notificationApi;