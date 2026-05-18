import { apiClient } from "../../../lib/axios";
import type { CreateTechncialRiderSchemaType } from "../schemas/create-technical-rider.schema";
import type {
    CreateTechnicalRider,
    SummaryTechnicalRider,
    SyncTechnicalRiderStaffType,
    TechnicalRiderGeneralInfo,
    TechnicalRiderGeneralRaw,
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
    ): Promise<TechnicalRiderGeneralRaw> => {
        const { data } = await apiClient.get(
            `/technical-rider/${riderId}/general`,
        );
        return data;
    },
    updateTechnicalRiderGeneral: async (
        riderId: string,
        body: TechnicalRiderGeneralInfo,
    ): Promise<TechnicalRiderGeneralInfo> => {
        const { data } = await apiClient.patch(
            `/technical-rider/${riderId}/general`,
            body,
        );

        return data;
    },
    syncTechnicalRiderStaff: async (
        riderId: string,
        body: SyncTechnicalRiderStaffType,
    ): Promise<any> => {
        const { data } = await apiClient.put(
            `/technical-rider/${riderId}/staff`,
            body,
        );
        return data;
    },
};
