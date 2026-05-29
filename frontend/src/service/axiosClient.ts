import axios from "axios";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { IS_MOCK } from "../config/index";

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: IS_MOCK ? "" : BASE_URL,
  timeout: 10000,
});

const axiosNoAuth = axios.create({ baseURL: BASE_URL });

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ĐỒNG BỘ: Dùng access_token
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR trả thẳng data
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as CustomRequestConfig;

    if (!error.response || error.response.status !== 401 || !originalRequest) {
      return Promise.reject({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }

    if (originalRequest._retry) return Promise.reject(error);
    if (IS_MOCK) return Promise.reject({ message: "Mock error" });

    // REFRESH FLOW
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const res = await axiosNoAuth.post("/auth/refresh", { refreshToken });
      const newToken = res.data?.accessToken;

      if (!newToken) throw new Error("No access token");

      localStorage.setItem("access_token", newToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return axiosClient(originalRequest);
    } catch (err) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(err);
    }
  }
);

export const request = {
  get: <T>(url: string, config?: any): Promise<T> =>
    axiosClient.get(url, config),
  post: <T>(url: string, data?: any): Promise<T> => axiosClient.post(url, data),
  put: <T>(url: string, data?: any, config?: any): Promise<T> => axiosClient.put(url, data, config),
  patch: <T>(url: string, data?: any, config?: any): Promise<T> => axiosClient.patch(url, data, config),
  delete: <T>(url: string, config?: any): Promise<T> => axiosClient.delete(url, config),
};

export default axiosClient;