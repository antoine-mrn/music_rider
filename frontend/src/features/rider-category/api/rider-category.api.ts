import { apiClient } from "../../../lib/axios";

export const riderCategoryApi = {
    getAllRiderCategories: async (): Promise<
        { id: number; label: string }[]
    > => {
        const { data } = await apiClient.get("rider-category");
        return data;
    },
};
