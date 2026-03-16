import { useQuery } from "@tanstack/react-query";
import type { SummaryTechnicalRider } from "../types";
import { technicalRiderApi } from "../api/technical-rider.api";

export const useGetTechnicalRider = () => {
    return useQuery<SummaryTechnicalRider[], Error>({
        queryKey: ["rider-list"],
        queryFn: technicalRiderApi.getAllTechnicalRider,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });
};
