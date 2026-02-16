import { apiClient } from "../../../lib/axios";
import type { Pagination } from "../../../shared/types/pagination.interface";
import type { SummaryBand } from "../types";

export const bandApi = {
    summaryBands: async (page: number): Promise<Pagination<SummaryBand>> => {
        const { data } = await apiClient.get<Pagination<SummaryBand>>(
            "band/bands-summary",
            { params: { page } },
        );
        return data;
    },
    bandDetails: async (bandId: number): Promise<any> => {
        const { data } = await apiClient.get(`band/${bandId}`);
        return data;
    },
};
