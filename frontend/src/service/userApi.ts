import { request } from "./axiosClient";
import { IS_MOCK } from "../config";
import { users } from "../dataMock/User";
import type { User } from "../types/user";


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ================= GET PROFILE =================
export const getMyProfile = async (): Promise<User> => {
  if (IS_MOCK) {
    await delay(300);

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("Not authenticated");

    return user;
  }

  return request.get<User>("/users/me");
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  if (IS_MOCK) {
    await delay(300);

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("User not found");

    // 🔥 FIX: merge sâu recruitment
    const updated: User = {
      ...user,
      ...data,
      recruitment: {
        ...user.recruitment,
        ...data.recruitment,
      },
    };

    // lưu localStorage
    localStorage.setItem("user", JSON.stringify(updated));

    // sync với dataMock (optional)
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = updated;
    }

    return updated;
  }

  return request.put<User>("/users/me", data);
};

// ================= GET USER BY ID =================
export const getUserById = async (id: number): Promise<User> => {
  if (IS_MOCK) {
    await delay(200);

    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");

    return user;
  }

  return request.get<User>(`/users/${id}`);
};