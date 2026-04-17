import { request } from "./axiosClient";
import { IS_MOCK } from "../config/index";
import { users } from "../dataMock/User";
import type { User } from "./authApi";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

//  GET PROFILE
export const getMyProfile = async (): Promise<User> => {
  if (IS_MOCK) {
    await delay(300);

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) throw new Error("User not found");

    return user;
  }

  return request.get<User>("/users/me");
};

// UPDATE PROFILE
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  if (IS_MOCK) {
    await delay(300);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) throw new Error("User not found");

    const updated = { ...user, ...data };

    localStorage.setItem("user", JSON.stringify(updated));

    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
    }

    return updated;
  }

  return request.put<User>("/users/me", data);
};

// GET USER BY ID
export const getUserById = async (id: number): Promise<User> => {
  if (IS_MOCK) {
    await delay(200);

    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");

    return user;
  }

  return request.get<User>(`/users/${id}`);
};