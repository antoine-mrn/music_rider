import { apiClient } from "../../../lib/axios";
import type { CreateBandSchemaType } from "../../../schemas/create-band.schema";
import type { Pagination } from "../../../shared/types/pagination.interface";
import type { BandDetails, CreatedBand, SummaryBand } from "../types";

export const bandApi = {
    summaryBands: async (page: number): Promise<Pagination<SummaryBand>> => {
        const { data } = await apiClient.get<Pagination<SummaryBand>>(
            "band/bands-summary",
            { params: { page } },
        );
        return data;
    },
    bandDetails: async (bandId: number): Promise<BandDetails> => {
        const { data } = await apiClient.get<BandDetails>(`band/${bandId}`);
        return data;
    },
    bandsList: async (): Promise<{ id: number; label: string }[]> => {
        const { data } = await apiClient.get("band/bands-list");
        return data;
    },
    createBand: async (
        bandData: CreateBandSchemaType,
    ): Promise<CreatedBand> => {
        const { data } = await apiClient.post<CreatedBand>("band", bandData);
        return data;
    },
};
