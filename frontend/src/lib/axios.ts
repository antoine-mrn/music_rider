import axios from "axios";
import { authApi } from "../features/auth/api/auth.api";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await authApi.refresh();
                return apiClient(originalRequest);
            } catch (refreshError) {
                // TODO: Prévoir logout
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
