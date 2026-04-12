import { loginApi, registerApi } from "./userApi";
import type { User } from "../dataMock/User";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const login = async (account: string, password: string) => {
  const res = await loginApi(account, password);

  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.user));


  window.dispatchEvent(new Event("authChange"));

  return res.user;
};

export const register = async (data: any) => {
  const res = await registerApi(data);

  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.user));


  window.dispatchEvent(new Event("authChange"));

  return res.user;
};


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  window.dispatchEvent(new Event("authChange"));
};

// GET USER
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

// GET TOKEN
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};