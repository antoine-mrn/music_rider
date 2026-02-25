import { apiClient } from "../../../lib/axios";
import type { EditProfileSchemaType } from "../../../schemas/edit-profile.schema";
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
    updateMe: async (
        dataUpdated: Partial<EditProfileSchemaType>,
    ): Promise<AuthUserInterface> => {
        const { data } = await apiClient.patch<AuthUserInterface>(
            "/user/me",
            dataUpdated,
        );

        return data;
    },
    updateAvatar: async (formData: FormData) => {
        const { data } = await apiClient.patch("/user/me/avatar", formData);
        return data;
    },
};
