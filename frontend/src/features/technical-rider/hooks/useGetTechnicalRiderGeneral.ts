import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../api/technical-rider.api";

export const useGetTechnicalRiderGeneral = (riderId: string) => {
    return useQuery({
        queryKey: ["rider", riderId],
        queryFn: () => technicalRiderApi.getTechnicalRiderGeneral(riderId),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
        enabled: !!riderId,
    });
};
