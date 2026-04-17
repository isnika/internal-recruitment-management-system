import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { IS_MOCK } from "../config/index";

const BASE_URL = import.meta.env.VITE_API_URL;

//  AXIOS CLIENT
const axiosClient = axios.create({
  baseURL: IS_MOCK ? "" : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const axiosNoAuth = axios.create({
  baseURL: BASE_URL,
});

//  REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// REFRESH QUEUE
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

//  RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    const message =
      error.response?.data?.message || error.message || "Server error";

    // MOCK MODE
    if (IS_MOCK) {
      return Promise.reject({ message });
    }

    // HANDLE 401 + REFRESH TOKEN
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axiosNoAuth.post("/auth/refresh", {
          refreshToken,
        });

        const newToken = data?.accessToken;
        const newRefresh = data?.refreshToken;

        if (!newToken) throw new Error("No access token");

        localStorage.setItem("token", newToken);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);

//  WRAPPER
export const request = {
  get: <T>(url: string, params?: any): Promise<T> =>
    axiosClient.get(url, { params }),

  post: <T>(url: string, data?: any): Promise<T> =>
    axiosClient.post(url, data),

  put: <T>(url: string, data?: any): Promise<T> =>
    axiosClient.put(url, data),

  delete: <T>(url: string): Promise<T> =>
    axiosClient.delete(url),
};

export default axiosClient;