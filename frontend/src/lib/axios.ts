import axios from "axios";
import { authApi } from "../features/auth/api/auth.api";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

let isRefreshing = false;

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/refresh")) {
            isRefreshing = false;
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await authApi.refresh();
                isRefreshing = false;
                return apiClient(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);
