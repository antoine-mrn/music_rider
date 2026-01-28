import { apiClient } from "../../../lib/axios";
import type { AuthUserInterface, SigninDto, SignupDto } from "../types";

export const authApi = {
    signin: async (signinDto: SigninDto): Promise<AuthUserInterface> => {
        const { data } = await apiClient.post<AuthUserInterface>(
            "auth/signin",
            signinDto,
        );
        return data;
    },
    signup: async (signupDto: SignupDto): Promise<AuthUserInterface> => {
        const { data } = await apiClient.post<AuthUserInterface>(
            "auth/signup",
            signupDto,
        );
        return data;
    },
    refresh: async (): Promise<void> => {
        const { data } = await apiClient.post<void>("auth/refresh");
        return data;
    },

    logout: async (): Promise<void> => {
        const { data } = await apiClient.post<void>("auth/logout");
        return data;
    },
};
