import { apiClient } from "../../../lib/axios";
import type { SummaryTechnicalRider } from "../types";

export const technicalRiderApi = {
    getAllTechnicalRider: async (): Promise<SummaryTechnicalRider[]> => {
        const { data } =
            await apiClient.get<SummaryTechnicalRider[]>("/technical-rider");
        return data;
    },
};
