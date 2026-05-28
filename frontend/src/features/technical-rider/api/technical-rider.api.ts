import { apiClient } from "../../../lib/axios";
import type { CreateTechncialRiderSchemaType } from "../schemas/create-technical-rider.schema";
import type { EditSceneDimensionsType } from "../schemas/edit-scene-dimension";
import type {
    CreateTechnicalRider,
    GroupedStaffRaw,
    MappedTechnicalRiderBand,
    SummaryTechnicalRider,
    SyncTechnicalRiderStaffType,
    TechnicalRiderStageDimensions,
    TechnicalRiderTiming,
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
    // General / timing
    getTechnicalRiderTiming: async (
        riderId: string,
    ): Promise<TechnicalRiderTiming | null> => {
        const { data } = await apiClient.get<TechnicalRiderTiming | null>(
            `/technical-rider/${riderId}/general/timing`,
        );
        return data;
    },
    updateTechnicalRiderGeneral: async (
        riderId: string,
        body: TechnicalRiderTiming,
    ): Promise<TechnicalRiderTiming> => {
        const { data } = await apiClient.patch(
            `/technical-rider/${riderId}/general`,
            body,
        );

        return data;
    },
    // Staff
    getTechnicalRiderStaff: async (
        riderId: string,
    ): Promise<GroupedStaffRaw> => {
        const { data } = await apiClient.get<GroupedStaffRaw>(
            `/technical-rider/${riderId}/general/staff`,
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
    // Band
    getTechnicalRiderBand: async (
        riderId: string,
    ): Promise<MappedTechnicalRiderBand> => {
        const { data } = await apiClient.get<MappedTechnicalRiderBand>(
            `/technical-rider/${riderId}/general/band`,
        );
        return data;
    },
    // Stage
    getTechnicalRiderStageDimensions: async (
        riderId: string,
    ): Promise<TechnicalRiderStageDimensions | null> => {
        const { data } =
            await apiClient.get<TechnicalRiderStageDimensions | null>(
                `/technical-rider/${riderId}/stage/dimensions`,
            );
        return data;
    },
    upsertTechnicalRiderStageDimensions: async (
        riderId: string,
        body: EditSceneDimensionsType,
    ): Promise<TechnicalRiderStageDimensions> => {
        const { data } = await apiClient.patch<TechnicalRiderStageDimensions>(
            `/technical-rider/${riderId}/stage/dimensions`,
            body,
        );
        return data;
    },
};
