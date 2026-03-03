import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const publicPaths = [
        "/auth/sign-in",
        "/auth/sign-up",
        "/auth/username-duplicate-check",
        "/auth/verify-email",
        "/auth/electron/login",
      ];
      const isPublicPath = publicPaths.some(path => error.config?.url?.includes(path));

      switch (error.response.status) {
        case 401:
          if (!isPublicPath) {
            window.location.href = "#/sign-in";
          }
          break;
        case 403:
          console.error("접근 권한이 없습니다.");
          break;
        case 404:
          console.error("요청한 리소스를 찾을 수 없습니다.");
          break;
        case 500:
          console.error("서버 에러가 발생했습니다.");
          break;
      }
    } else if (error.request) {
      console.error("서버로부터 응답이 없습니다.");
    } else {
      console.error("요청 설정 중 에러 발생:", error.message);
    }
    return Promise.reject(error);
  }
);
