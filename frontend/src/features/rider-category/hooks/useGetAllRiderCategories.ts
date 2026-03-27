import { useQuery } from "@tanstack/react-query";
import { riderCategoryApi } from "../api/rider-category.api";

export const useGetAllRiderCategories = () => {
    return useQuery<any, Error>({
        queryKey: ["rider-categories"],
        queryFn: () => riderCategoryApi.getAllRiderCategories(),
        staleTime: Infinity,
        gcTime: Infinity,
    });
};
