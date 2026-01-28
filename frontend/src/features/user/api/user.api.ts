import { apiClient } from "../../../lib/axios";
import type { AuthUserInterface } from "../../auth/types";

export const userApi = {
    me: async (): Promise<AuthUserInterface | null> => {
        try {
            const { data } = await apiClient.get<AuthUserInterface>("/user/me");
            return data;
        } catch (error) {
            return null;
        }
    },
};
