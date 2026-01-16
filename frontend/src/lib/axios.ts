import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

apiClient.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        // await refreshToken();
        // return apiClient(error.config);
        console.log("Error !!!");
    }

    throw error;
});
