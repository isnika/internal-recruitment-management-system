import { request } from "./axiosClient";
import { IS_MOCK } from "../config/index";
import { users } from "../dataMock/User";

export interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// LOGIN
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  if (IS_MOCK) {
    await delay(500);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Sai tài khoản hoặc mật khẩu");

    const res: AuthResponse = {
      accessToken: "mock_token_" + user.id,
      refreshToken: "mock_refresh_" + user.id,
      user,
    };

    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));

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

//  REGISTER
export const register = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse> => {
  if (IS_MOCK) {
    await delay(500);

    const existed = users.find((u) => u.email === data.email);
    if (existed) throw new Error("Email đã tồn tại");

    const newUser: User = {
      id: Date.now(),
      email: data.email,
      password: data.password,
      name: data.name,
    };

    users.push(newUser);

    const res: AuthResponse = {
      accessToken: "mock_token_" + newUser.id,
      refreshToken: "mock_refresh_" + newUser.id,
      user: newUser,
    };

    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  }

  return request.post<AuthResponse>("/auth/register", data);
};

//  LOGOUT
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

//  GET CURRENT USER
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};