import { apiClient } from "../../../lib/axios";
import type { AuthUserInterface, SigninDto } from "../types";

export const authApi = {
    signin: async (signinData: SigninDto): Promise<AuthUserInterface> => {
        const { data } = await apiClient.post<AuthUserInterface>(
            "auth/signin",
            signinData
        );
        return data;
    },
    refresh: async (): Promise<void> => {
        const { data } = await apiClient.post<void>("auth/refresh");
        return data;
    },
    me: async () => {
        const { data } = await apiClient.get<AuthUserInterface>("auth/me");
        return data;
    },
};
