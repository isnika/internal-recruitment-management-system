import axios, { AxiosError, AxiosResponse } from "axios";

const IS_MOCK = true; // 👉 đổi false khi dùng backend thật

//
const axiosClient = axios.create({
  baseURL: IS_MOCK ? "" : "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

//
axiosClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsed = JSON.parse(user);

        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (err) {
        console.error("Invalid user in localStorage");
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

//
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Server error";

    console.error("API ERROR:", message);

    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);

//
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