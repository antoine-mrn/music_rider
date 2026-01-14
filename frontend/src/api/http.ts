import axios from "axios";

export const instance = axios.create({ baseURL: "http://localhost:3000" });

instance.interceptors.response.use(undefined, async (error) => {
    if (error.response?.status === 401) {
        // await refreshToken();
        // return instance(error.config);
        console.log("Error !!!");
    }

    throw error;
});
