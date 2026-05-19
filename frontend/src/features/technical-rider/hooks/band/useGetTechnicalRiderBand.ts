import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";

export const useGetTechnicalRiderBand = (riderId: string) => {
    return useQuery({
        queryKey: ["rider", riderId, "band"],
        queryFn: () => technicalRiderApi.getTechnicalRiderBand(riderId),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
        enabled: !!riderId,
    });
};
