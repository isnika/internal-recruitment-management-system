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

// Generic API Response wrapper (backend của bạn đang dùng format này)
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// =========================
// API
// =========================

const ENDPOINT = "/api/notifications";

export const notificationApi = {
  // GET ALL NOTIFICATIONS
  getAll: (): Promise<ApiResponse<Notification[]>> => {
    return request.get(ENDPOINT);
  },

  // GET UNREAD NOTIFICATIONS
  getUnread: (): Promise<ApiResponse<Notification[]>> => {
    return request.get(`${ENDPOINT}/unread`);
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
  send: (
    data: SendNotificationRequest
  ): Promise<ApiResponse<string>> => {
    return request.post(`${ENDPOINT}/send`, data);
  },

  // DELETE NOTIFICATION
  delete: (id: number): Promise<ApiResponse<string>> => {
    return request.delete(`${ENDPOINT}/${id}`);
  },
};

export default notificationApi;