import { apiClient } from "../../../lib/axios";
import type { AddMemberToBandType } from "../../../schemas/add-member-to-band.schema";
import type { CreateBandSchemaType } from "../../../schemas/create-band.schema";
import type { EditMemberToBandType } from "../../../schemas/edit-member.schema";
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
    bandDetails: async (bandId: string): Promise<BandDetails> => {
        const { data } = await apiClient.get<BandDetails>(`band/${bandId}`);
        return data;
    },
    bandsList: async (): Promise<{ id: string; label: string }[]> => {
        const { data } = await apiClient.get("band/bands-list");
        return data;
    },
    createBand: async (
        bandData: CreateBandSchemaType,
    ): Promise<CreatedBand> => {
        const { data } = await apiClient.post<CreatedBand>("band", bandData);
        return data;
    },
    addMembership: async (
        bandId: string,
        memberData: AddMemberToBandType,
    ): Promise<{ bandId: string }> => {
        const { data } = await apiClient.post(
            `band/${bandId}/membership`,
            memberData,
        );

        return data;
    },
    updateMembership: async (
        bandId: string,
        membershipId: number,
        formData: EditMemberToBandType,
    ): Promise<{ bandId: string }> => {
        const { data } = await apiClient.patch(
            `band/${bandId}/membership/${membershipId}`,
            formData,
        );

        return data;
    },
    deleteMembership: async (bandId: string, membershipId: number) => {
        const { data } = await apiClient.delete(
            `band/${bandId}/membership/${membershipId}`,
        );

        return data;
    },
};
