import { apiClient } from "../../../lib/axios";
import type { AuthUserInterface } from "../../auth/types";
import type { DashboardInterface } from "../types";

export const userApi = {
    me: async (): Promise<AuthUserInterface | null> => {
        try {
            const { data } = await apiClient.get<AuthUserInterface>("/user/me");
            return data;
        } catch (error) {
            return null;
        }
    },
    dashboard: async (): Promise<DashboardInterface> => {
        const { data } =
            await apiClient.get<DashboardInterface>("user/dashboard");
        return data;
    },
};
