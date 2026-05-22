import { request } from "./axiosClient";
import { mockNotifications } from "../dataMock/mailNotification";
import { IS_MOCK } from "../config/index";

export const getMyNotifications = async (userId?: number) => {
  try {
    if (!IS_MOCK) {
      const data = await request.get("/notifications/me");
      return data;
    }
  } catch (err) {
    console.warn("API lỗi → fallback mock");
  }

  return mockNotifications[userId || 1] || [];
};

// MARK AS READ
export const markAsRead = async (id: number, userId?: number) => {
  try {
    if (!IS_MOCK) {
      await request.put(`/notifications/${id}/read`);
      return;
    }
  } catch (err) {
    console.warn("API lỗi → fallback mock");
  }

  //  update mock
  const list = mockNotifications[userId || 1];
  if (!list) return;

  const item = list.find((m) => m.id === id);
  if (item) item.isRead = true;
};