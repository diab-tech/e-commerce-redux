import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";

// تعريف الأنواع
interface AuthResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

interface ErrorResponse {
  message: string;
}

// axiosPublic.ts
export const axiosPublic = axios.create({
  baseURL: "http://localhost:8055",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Add response interceptor to axiosPublic for better error handling
axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle request cancellation gracefully
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message);
      return Promise.reject(error);
    }
    
    // Network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error: Please check your connection'));
    }
    
    // HTTP error responses
    return Promise.reject(error);
  }
);

// axiosPrivate.ts
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8055",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// 👉 لتخزين navigate واستخدامه لاحقًا
let navigateFn: NavigateFunction | null = null;
let sessionExpired = false;

export const wasSessionExpired = () => sessionExpired;

export const setNavigate = (navigate: NavigateFunction) => {
  navigateFn = navigate;
};

// Interceptor
axiosPrivate.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axiosPrivate.post<AuthResponse>("/auth/refresh");
        const { access_token } = res.data.data;

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        sessionExpired = true;
        if (navigateFn) {
          navigateFn("/login");
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 500) {
      return Promise.reject(new Error("خطأ في الخادم، حاول لاحقًا"));
    }
    if (!error.response) {
      return Promise.reject(new Error("فشل الاتصال بالخادم، تحقق من الشبكة"));
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
