import { request } from "./axiosClient";
import { IS_MOCK } from "../config";
import { users } from "../dataMock/User";
import type { User } from "../types/user";
import type { AuthResponse } from "../types/auth";


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ================= LOGIN =================
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  if (IS_MOCK) {
    await delay(500);

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Sai tài khoản hoặc mật khẩu");

    // đảm bảo user luôn có recruitment
    const user: User = {
      ...found,
      recruitment: found.recruitment || {
        taxId: "",
        citizenId: "",
        bank: "",
        social: "",
      },
    };

    const res: AuthResponse = {
      accessToken: "mock_token_" + user.id,
      refreshToken: "mock_refresh_" + user.id,
      user,
    };

    // lưu localStorage (QUAN TRỌNG)
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return res;
  }

  const res = await request.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  localStorage.setItem("user", JSON.stringify(res.user));

  return res;
};

// ================= REGISTER =================
export const register = async (data: {
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthResponse> => {
  if (IS_MOCK) {
    await delay(500);

    const existed = users.find((u) => u.email === data.email);
    if (existed) throw new Error("Email đã tồn tại");

    const newUser: User = {
      id: Date.now(),
      username: data.email,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      role: "candidate",
      phone: "",
      address: "",
      dob: "",
      gender: "",

      recruitment: {
        taxId: "",
        citizenId: "",
        bank: "",
        social: "",
      },
    };

    users.push(newUser);

    const res: AuthResponse = {
      accessToken: "mock_token_" + newUser.id,
      refreshToken: "mock_refresh_" + newUser.id,
      user: newUser,
    };

    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    return res;
  }

  return request.post<AuthResponse>("/auth/register", data);
};

// ================= LOGOUT =================
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

// ================= GET CURRENT USER =================
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};