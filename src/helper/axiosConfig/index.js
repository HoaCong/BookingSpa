import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API || "https://systemsapa.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Thêm interceptor để gán token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token") || null; // Lấy token từ reducer hoặc trạng thái
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Xử lý lỗi 401 ở đây (nếu cần)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
