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

// إنشاء instance من axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8055",
  withCredentials: true, // دعم إرسال واستقبال الـ cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor للردود
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>, navigate?: NavigateFunction) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // التعامل مع خطأ 401 (انتهاء صلاحية التوكن)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // طلب تحديث التوكن
        const res = await axiosInstance.post<AuthResponse>("/auth/refresh");
        const { access_token } = res.data.data;

        // تحديث الـ headers للطلب الأصلي
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // إعادة محاولة الطلب الأصلي
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // إذا فشل تحديث التوكن، إعادة التوجيه إلى صفحة تسجيل الدخول
        if (navigate) {
          navigate("/login");
        }
        return Promise.reject(refreshError);
      }
    }

    // معالجة أخطاء أخرى
    if (error.response?.status === 500) {
      return Promise.reject(new Error("خطأ في الخادم، حاول لاحقًا"));
    }
    if (!error.response) {
      return Promise.reject(new Error("فشل الاتصال بالخادم، تحقق من الشبكة"));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
