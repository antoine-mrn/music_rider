import { apiClient } from "../../../lib/axios";
import type { CreateTechncialRiderSchemaType } from "../../../schemas/create-technical-rider.schema";
import type {
    CreateTechnicalRider,
    SummaryTechnicalRider,
    TechnicalRiderGeneral,
} from "../types";

export const technicalRiderApi = {
    getAllTechnicalRider: async (): Promise<SummaryTechnicalRider[]> => {
        const { data } =
            await apiClient.get<SummaryTechnicalRider[]>("/technical-rider");
        return data;
    },
    createTechnicalRider: async (
        riderData: CreateTechncialRiderSchemaType,
    ): Promise<CreateTechnicalRider> => {
        const { data } = await apiClient.post("/technical-rider", riderData);
        return data;
    },
    getTechnicalRiderGeneral: async (
        riderId: string,
    ): Promise<TechnicalRiderGeneral> => {
        const { data } = await apiClient.get(
            `/technical-rider/${riderId}/general`,
        );
        return data;
    },
};
