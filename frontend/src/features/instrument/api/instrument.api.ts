import { apiClient } from "../../../lib/axios";

export const instrumentApi = {
    findAllInstrument: async (): Promise<{ id: number; label: string }[]> => {
        const { data } = await apiClient.get("instrument");
        return data;
    },
};
