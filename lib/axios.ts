import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          const token = state?.token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch {}
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");

        if (!window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
