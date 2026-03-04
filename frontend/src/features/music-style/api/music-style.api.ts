import { apiClient } from "../../../lib/axios";

export const musicStyleApi = {
    getAllMusicStyles: async (): Promise<{ id: number; label: string }[]> => {
        const { data } = await apiClient.get("style");
        return data;
    },
};
